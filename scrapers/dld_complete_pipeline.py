#!/usr/bin/env python3
"""
Complete DLD PDF Pipeline
Downloads PDFs, extracts content, checks duplicates, and ingests to Supabase
"""

import json
import os
import requests
import subprocess
import hashlib
import re
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class DLDCompletePipeline:
    """Complete pipeline for DLD documents"""
    
    def __init__(self):
        self.base_dir = "/home/ubuntu/paris_group_legal_ai/data"
        self.pdf_dir = f"{self.base_dir}/dld_pdfs"
        self.text_dir = f"{self.base_dir}/dld_texts"
        
        os.makedirs(self.pdf_dir, exist_ok=True)
        os.makedirs(self.text_dir, exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def load_pdf_list(self, json_file):
        """Load the list of PDFs to download"""
        with open(json_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def download_pdf(self, pdf_info):
        """Download a single PDF"""
        try:
            # Create safe filename from URL
            filename = os.path.basename(pdf_info['url'])
            if not filename.endswith('.pdf'):
                filename = f"{hashlib.md5(pdf_info['url'].encode()).hexdigest()[:8]}.pdf"
            
            filepath = os.path.join(self.pdf_dir, filename)
            
            # Skip if exists
            if os.path.exists(filepath):
                logger.info(f"Already downloaded: {filename}")
                return filepath
            
            logger.info(f"Downloading: {filename}")
            response = self.session.get(pdf_info['url'], timeout=60)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"✓ Downloaded: {filename} ({len(response.content)/1024:.1f} KB)")
            return filepath
            
        except Exception as e:
            logger.error(f"Error downloading {pdf_info['url']}: {e}")
            return None
    
    def extract_text(self, pdf_path):
        """Extract text from PDF"""
        try:
            text_filename = os.path.basename(pdf_path).replace('.pdf', '.txt')
            text_path = os.path.join(self.text_dir, text_filename)
            
            # Skip if exists
            if os.path.exists(text_path):
                with open(text_path, 'r', encoding='utf-8') as f:
                    return f.read()
            
            # Extract using pdftotext
            result = subprocess.run(
                ['pdftotext', '-enc', 'UTF-8', pdf_path, text_path],
                capture_output=True,
                timeout=30
            )
            
            if result.returncode == 0 and os.path.exists(text_path):
                with open(text_path, 'r', encoding='utf-8') as f:
                    text = f.read()
                logger.info(f"✓ Extracted: {text_filename} ({len(text)} chars)")
                return text
            else:
                logger.warning(f"Failed to extract: {pdf_path}")
                return None
                
        except Exception as e:
            logger.error(f"Error extracting {pdf_path}: {e}")
            return None
    
    def calculate_hash(self, text):
        """Calculate content hash for duplicate detection"""
        normalized = re.sub(r'\s+', ' ', text.lower().strip())
        return hashlib.md5(normalized.encode('utf-8')).hexdigest()
    
    def check_existing_hashes(self):
        """Get hashes of existing documents in knowledge base"""
        try:
            # Try to query Supabase for existing hashes
            import subprocess
            result = subprocess.run(
                ['manus-mcp-cli', 'tool', 'call', 'execute_sql', '--server', 'supabase',
                 '--input', json.dumps({"query": "SELECT title, metadata->>'content_hash' as hash FROM legal_articles WHERE metadata->>'content_hash' IS NOT NULL"})],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                output = json.loads(result.stdout)
                hashes = {item.get('hash'): item.get('title') for item in output if item.get('hash')}
                logger.info(f"Found {len(hashes)} existing document hashes")
                return hashes
            else:
                logger.warning("Could not fetch existing hashes")
                return {}
                
        except Exception as e:
            logger.warning(f"Error checking existing hashes: {e}")
            return {}
    
    def process_all_pdfs(self, pdf_list_file):
        """Download and process all PDFs"""
        logger.info("Starting DLD PDF processing pipeline...")
        
        # Load PDF list
        pdf_list = self.load_pdf_list(pdf_list_file)
        logger.info(f"Found {len(pdf_list)} PDFs to process")
        
        # Get existing hashes
        existing_hashes = self.check_existing_hashes()
        
        # Process each PDF
        documents = []
        duplicates = []
        
        for idx, pdf_info in enumerate(pdf_list, 1):
            logger.info(f"Progress: {idx}/{len(pdf_list)}")
            
            # Download
            pdf_path = self.download_pdf(pdf_info)
            if not pdf_path:
                continue
            
            # Extract text
            text = self.extract_text(pdf_path)
            if not text or len(text) < 100:
                logger.warning(f"Insufficient content: {pdf_info['url']}")
                continue
            
            # Check for duplicates
            content_hash = self.calculate_hash(text)
            if content_hash in existing_hashes:
                logger.info(f"Duplicate found: {pdf_info['title']} (matches: {existing_hashes[content_hash]})")
                duplicates.append(pdf_info)
                continue
            
            # Create document record
            doc = {
                'id': f"dld_{abs(hash(pdf_info['url'])) % 1000000}",
                'title': pdf_info.get('title', os.path.basename(pdf_path)),
                'url': pdf_info['url'],
                'category': 'Dubai Real Estate Law',
                'full_text': text,
                'metadata': {
                    'source': 'Dubai Land Department',
                    'pdf_file': os.path.basename(pdf_path),
                    'content_hash': content_hash,
                    'extracted_at': datetime.now().isoformat()
                },
                'word_count': len(text.split()),
                'scraped_at': datetime.now().isoformat(),
                'source': 'DLD Rules and Regulations'
            }
            
            documents.append(doc)
            existing_hashes[content_hash] = doc['title']  # Add to prevent duplicates in this batch
            
            # Be respectful
            import time
            time.sleep(1)
        
        logger.info(f"Processing complete! {len(documents)} new documents, {len(duplicates)} duplicates")
        
        return documents, duplicates
    
    def save_results(self, documents, duplicates):
        """Save processing results"""
        # Save new documents
        docs_file = f"{self.base_dir}/dld_new_documents.json"
        with open(docs_file, 'w', encoding='utf-8') as f:
            json.dump(documents, f, ensure_ascii=False, indent=2)
        logger.info(f"✓ Saved {len(documents)} new documents to {docs_file}")
        
        # Save duplicates report
        if duplicates:
            dup_file = f"{self.base_dir}/dld_duplicates.json"
            with open(dup_file, 'w', encoding='utf-8') as f:
                json.dump(duplicates, f, ensure_ascii=False, indent=2)
            logger.info(f"✓ Saved {len(duplicates)} duplicates to {dup_file}")
        
        return docs_file


def main():
    """Main execution"""
    print("="*70)
    print("DLD COMPLETE PIPELINE")
    print("="*70)
    print("\nThis will:")
    print("1. Download all DLD PDFs")
    print("2. Extract text content")
    print("3. Check for duplicates")
    print("4. Prepare for Supabase ingestion\n")
    
    pipeline = DLDCompletePipeline()
    
    pdf_list_file = "/home/ubuntu/paris_group_legal_ai/data/dld_pdfs.json"
    
    if not os.path.exists(pdf_list_file):
        print(f"✗ PDF list not found: {pdf_list_file}")
        return
    
    documents, duplicates = pipeline.process_all_pdfs(pdf_list_file)
    
    if documents or duplicates:
        docs_file = pipeline.save_results(documents, duplicates)
        
        print("\n" + "="*70)
        print("PROCESSING SUMMARY")
        print("="*70)
        print(f"New Documents: {len(documents)}")
        print(f"Duplicates Skipped: {len(duplicates)}")
        print(f"Total Words: {sum(d.get('word_count', 0) for d in documents):,}")
        print(f"\n✓ New documents saved to: {docs_file}")
        
        if documents:
            print("\nNext step: Ingest into Supabase:")
            print(f"  python3 uae_data_processor.py {os.path.basename(docs_file)}")
        else:
            print("\n✓ All documents already exist in knowledge base!")
        
        print("="*70)
    else:
        print("\n✗ No documents were processed.")


if __name__ == "__main__":
    main()
