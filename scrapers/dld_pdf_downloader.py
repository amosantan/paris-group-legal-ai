#!/usr/bin/env python3
"""
Dubai Land Department PDF Downloader and Processor
Automatically downloads all PDFs from DLD rules and regulations page,
extracts content, checks for duplicates, and ingests into Supabase
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import time
from datetime import datetime
from typing import List, Dict, Optional
import logging
import re
import hashlib
import subprocess

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class DLDPDFDownloader:
    """Downloader for Dubai Land Department PDFs"""
    
    def __init__(self, output_dir="/home/ubuntu/paris_group_legal_ai/data/dld_documents"):
        self.base_url = "https://dubailand.gov.ae"
        self.page_url = f"{self.base_url}/ar/about-dubai-land-department/rules-regulations/#/"
        self.output_dir = output_dir
        self.pdf_dir = os.path.join(output_dir, "pdfs")
        self.text_dir = os.path.join(output_dir, "extracted_text")
        
        os.makedirs(self.pdf_dir, exist_ok=True)
        os.makedirs(self.text_dir, exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/pdf,*/*',
        })
        
        self.downloaded_pdfs = []
    
    def get_pdf_links(self) -> List[Dict]:
        """Extract all PDF download links from the page"""
        try:
            logger.info(f"Fetching PDF links from: {self.page_url}")
            
            response = self.session.get(self.page_url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            pdf_links = []
            seen_urls = set()
            
            # Find all download links
            for link in soup.find_all('a', href=True):
                href = link.get('href', '')
                
                # Look for PDF links or download buttons
                if '.pdf' in href.lower() or 'download' in link.get_text().lower():
                    # Get the full URL
                    if href.startswith('http'):
                        pdf_url = href
                    elif href.startswith('/'):
                        pdf_url = f"{self.base_url}{href}"
                    else:
                        pdf_url = f"{self.base_url}/{href}"
                    
                    if pdf_url not in seen_urls:
                        seen_urls.add(pdf_url)
                        
                        # Try to extract title from nearby text
                        title = ""
                        parent = link.find_parent(['div', 'li', 'td'])
                        if parent:
                            title_text = parent.get_text(strip=True)
                            # Clean up the title
                            title = re.sub(r'\s+', ' ', title_text)
                            title = title.split('/')[0].strip()  # Remove file size info
                        
                        if not title:
                            title = link.get_text(strip=True) or os.path.basename(pdf_url)
                        
                        pdf_links.append({
                            'title': title[:200],  # Limit title length
                            'url': pdf_url
                        })
            
            logger.info(f"Found {len(pdf_links)} PDF links")
            return pdf_links
            
        except Exception as e:
            logger.error(f"Error fetching PDF links: {e}")
            return []
    
    def download_pdf(self, pdf_info: Dict) -> Optional[str]:
        """Download a single PDF file"""
        try:
            # Create safe filename
            safe_title = re.sub(r'[^\w\s-]', '', pdf_info['title'])
            safe_title = re.sub(r'[-\s]+', '_', safe_title)
            filename = f"{safe_title[:100]}.pdf"
            filepath = os.path.join(self.pdf_dir, filename)
            
            # Skip if already downloaded
            if os.path.exists(filepath):
                logger.info(f"Already downloaded: {filename}")
                return filepath
            
            logger.info(f"Downloading: {pdf_info['title'][:60]}...")
            
            response = self.session.get(pdf_info['url'], timeout=60)
            response.raise_for_status()
            
            # Save PDF
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"✓ Downloaded: {filename} ({len(response.content) / 1024:.1f} KB)")
            return filepath
            
        except Exception as e:
            logger.error(f"Error downloading {pdf_info['url']}: {e}")
            return None
    
    def extract_text_from_pdf(self, pdf_path: str) -> Optional[str]:
        """Extract text from PDF using pdftotext"""
        try:
            text_filename = os.path.basename(pdf_path).replace('.pdf', '.txt')
            text_path = os.path.join(self.text_dir, text_filename)
            
            # Skip if already extracted
            if os.path.exists(text_path):
                with open(text_path, 'r', encoding='utf-8') as f:
                    return f.read()
            
            # Extract text using pdftotext
            result = subprocess.run(
                ['pdftotext', '-enc', 'UTF-8', pdf_path, text_path],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0 and os.path.exists(text_path):
                with open(text_path, 'r', encoding='utf-8') as f:
                    text = f.read()
                logger.info(f"✓ Extracted text: {text_filename} ({len(text)} chars)")
                return text
            else:
                logger.warning(f"Failed to extract text from {pdf_path}")
                return None
                
        except Exception as e:
            logger.error(f"Error extracting text from {pdf_path}: {e}")
            return None
    
    def calculate_content_hash(self, text: str) -> str:
        """Calculate hash of content for duplicate detection"""
        # Normalize text: remove extra whitespace, lowercase
        normalized = re.sub(r'\s+', ' ', text.lower().strip())
        return hashlib.md5(normalized.encode('utf-8')).hexdigest()
    
    def download_all_pdfs(self) -> List[Dict]:
        """Download all PDFs and extract their content"""
        logger.info("Starting PDF download and extraction...")
        
        pdf_links = self.get_pdf_links()
        
        if not pdf_links:
            logger.warning("No PDF links found")
            return []
        
        documents = []
        
        for idx, pdf_info in enumerate(pdf_links, 1):
            logger.info(f"Progress: {idx}/{len(pdf_links)}")
            
            # Download PDF
            pdf_path = self.download_pdf(pdf_info)
            
            if not pdf_path:
                continue
            
            # Extract text
            text_content = self.extract_text_from_pdf(pdf_path)
            
            if not text_content or len(text_content) < 100:
                logger.warning(f"Insufficient content extracted from {pdf_info['title']}")
                continue
            
            # Create document record
            doc = {
                'id': f"dld_{abs(hash(pdf_info['url'])) % 1000000}",
                'title': pdf_info['title'],
                'url': pdf_info['url'],
                'category': 'Dubai Real Estate Law',
                'full_text': text_content,
                'metadata': {
                    'source': 'Dubai Land Department',
                    'pdf_file': os.path.basename(pdf_path),
                    'extracted_at': datetime.now().isoformat()
                },
                'word_count': len(text_content.split()),
                'content_hash': self.calculate_content_hash(text_content),
                'scraped_at': datetime.now().isoformat(),
                'source': 'DLD Rules and Regulations'
            }
            
            documents.append(doc)
            self.downloaded_pdfs.append(doc)
            
            # Be respectful
            time.sleep(1)
        
        logger.info(f"Download complete! Processed {len(documents)} documents")
        return documents
    
    def save_to_json(self, documents: List[Dict], filename: str = "dld_documents.json"):
        """Save documents to JSON file"""
        filepath = os.path.join(self.output_dir, filename)
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(documents, f, ensure_ascii=False, indent=2)
            logger.info(f"✓ Saved {len(documents)} documents to {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")
            return None
    
    def get_summary(self, documents: List[Dict]) -> Dict:
        """Get summary statistics"""
        if not documents:
            return {'total': 0}
        
        total_words = sum(doc.get('word_count', 0) for doc in documents)
        
        return {
            'total_documents': len(documents),
            'total_words': total_words,
            'average_words_per_document': total_words // len(documents),
            'pdf_directory': self.pdf_dir,
            'text_directory': self.text_dir
        }


def main():
    """Main execution"""
    print("="*70)
    print("DUBAI LAND DEPARTMENT PDF DOWNLOADER")
    print("="*70)
    print("\nThis will download all PDFs from DLD rules and regulations page")
    print("and extract their content for ingestion into your knowledge base.\n")
    
    downloader = DLDPDFDownloader()
    
    documents = downloader.download_all_pdfs()
    
    if documents:
        json_file = downloader.save_to_json(documents)
        summary = downloader.get_summary(documents)
        
        print("\n" + "="*70)
        print("DOWNLOAD SUMMARY")
        print("="*70)
        print(f"Total Documents: {summary['total_documents']}")
        print(f"Total Words: {summary['total_words']:,}")
        print(f"Average Words per Document: {summary['average_words_per_document']:,}")
        print(f"\nPDFs saved to: {summary['pdf_directory']}")
        print(f"Text files saved to: {summary['text_directory']}")
        print(f"\n✓ Data saved to: {json_file}")
        print("\nNext step: Check for duplicates and ingest into Supabase:")
        print(f"  python3 dld_dedup_and_ingest.py {os.path.basename(json_file)}")
        print("="*70)
    else:
        print("\n✗ No documents were downloaded. Please check the logs.")


if __name__ == "__main__":
    main()
