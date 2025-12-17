#!/usr/bin/env python3
"""
UAE Legal Data Processor
Processes scraped UAE legal content and stores it in Supabase with embeddings
"""

import os
import json
import hashlib
from datetime import datetime
from typing import List, Dict, Optional
import logging
from openai import OpenAI

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class UAELegalDataProcessor:
    """
    Processes UAE legal content and stores it in Supabase
    """
    
    def __init__(self):
        # Use OpenAI's direct API, not the Manus proxy
        self.openai_client = OpenAI(
            api_key=os.getenv('OPENAI_API_KEY'),
            base_url='https://api.openai.com/v1'
        )
        self.db_url = os.getenv('DATABASE_URL')
        
        if not self.db_url:
            raise ValueError("DATABASE_URL environment variable not set")
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding using OpenAI API
        
        Args:
            text: Text to generate embedding for
            
        Returns:
            List of floats representing the embedding vector
        """
        try:
            # Truncate text if too long (OpenAI has token limits)
            max_chars = 30000
            if len(text) > max_chars:
                text = text[:max_chars]
            
            response = self.openai_client.embeddings.create(
                model="text-embedding-3-small",  # Use OpenAI embedding model
                input=text,
                dimensions=768  # Match the existing embedding dimensions
            )
            
            embedding = response.data[0].embedding
            logger.info(f"Generated embedding with {len(embedding)} dimensions")
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise
    
    def calculate_content_hash(self, text: str) -> str:
        """Calculate MD5 hash of content for change detection"""
        return hashlib.md5(text.encode('utf-8')).hexdigest()
    
    def process_legislation(self, legislation: Dict) -> Dict:
        """
        Process a single legislation and prepare it for database insertion
        
        Args:
            legislation: Dictionary with legislation data
            
        Returns:
            Processed legislation dictionary with embedding
        """
        try:
            logger.info(f"Processing legislation: {legislation.get('title', 'Unknown')}")
            
            # Generate embedding for the full text
            full_text = legislation.get('full_text', '')
            if not full_text:
                logger.warning("No full text found for legislation")
                return None
            
            embedding = self.generate_embedding(full_text)
            
            # Calculate content hash
            content_hash = self.calculate_content_hash(full_text)
            
            # Prepare processed data
            processed = {
                'title': legislation.get('title', 'Untitled'),
                'content': full_text,
                'category': legislation.get('category', 'UAE Federal Law'),
                'embedding': embedding,
                'source_url': legislation.get('url', ''),
                'content_hash': content_hash,
                'metadata': {
                    'issued_date': legislation.get('metadata', {}).get('issued_date'),
                    'effective_date': legislation.get('metadata', {}).get('effective_date'),
                    'state': legislation.get('metadata', {}).get('state'),
                    'word_count': legislation.get('word_count', 0),
                    'article_count': len(legislation.get('articles', []))
                },
                'scraped_at': legislation.get('scraped_at', datetime.now().isoformat())
            }
            
            return processed
            
        except Exception as e:
            logger.error(f"Error processing legislation: {e}")
            return None
    
    def store_in_supabase(self, processed_legislation: Dict) -> bool:
        """
        Store processed legislation in Supabase using MCP
        
        Args:
            processed_legislation: Processed legislation dictionary
            
        Returns:
            True if successful, False otherwise
        """
        try:
            import subprocess
            
            # Prepare SQL INSERT statement
            sql = f"""
            INSERT INTO legal_articles 
            (title, content, category, embedding, source_url, content_hash, metadata, scraped_at)
            VALUES (
                $${processed_legislation['title']}$$,
                $${processed_legislation['content']}$$,
                '{processed_legislation['category']}',
                '{processed_legislation['embedding']}'::vector,
                '{processed_legislation['source_url']}',
                '{processed_legislation['content_hash']}',
                '{json.dumps(processed_legislation['metadata'])}'::jsonb,
                '{processed_legislation['scraped_at']}'
            )
            ON CONFLICT (content_hash) DO UPDATE SET
                title = EXCLUDED.title,
                content = EXCLUDED.content,
                embedding = EXCLUDED.embedding,
                updated_at = NOW();
            """
            
            # Save SQL to temporary file
            sql_file = f"/tmp/uae_leg_{int(datetime.now().timestamp())}.sql"
            with open(sql_file, 'w', encoding='utf-8') as f:
                f.write(sql)
            
            # Execute via Supabase MCP
            result = subprocess.run(
                ['manus-mcp-cli', 'tool', 'call', 'execute_sql', '--server', 'supabase', '--input', f'{{"query": "{sql}"}}'],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                logger.info(f"Successfully stored legislation: {processed_legislation['title']}")
                return True
            else:
                logger.error(f"Error storing legislation: {result.stderr}")
                return False
                
        except Exception as e:
            logger.error(f"Error storing in Supabase: {e}")
            return False
    
    def process_and_store_batch(self, legislations: List[Dict]) -> Dict:
        """
        Process and store a batch of legislations
        
        Args:
            legislations: List of legislation dictionaries
            
        Returns:
            Summary dictionary with statistics
        """
        summary = {
            'total': len(legislations),
            'processed': 0,
            'stored': 0,
            'failed': 0,
            'errors': []
        }
        
        for legislation in legislations:
            try:
                # Process
                processed = self.process_legislation(legislation)
                if processed:
                    summary['processed'] += 1
                    
                    # Store
                    if self.store_in_supabase(processed):
                        summary['stored'] += 1
                    else:
                        summary['failed'] += 1
                else:
                    summary['failed'] += 1
                    
            except Exception as e:
                summary['failed'] += 1
                summary['errors'].append(str(e))
                logger.error(f"Error processing legislation: {e}")
        
        return summary
    
    def load_from_json(self, json_file: str) -> List[Dict]:
        """Load legislations from a JSON file"""
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                legislations = json.load(f)
            logger.info(f"Loaded {len(legislations)} legislations from {json_file}")
            return legislations
        except Exception as e:
            logger.error(f"Error loading JSON file: {e}")
            return []


def main():
    """Main function"""
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python3 uae_data_processor.py <json_file>")
        print("Example: python3 uae_data_processor.py uae_legislations.json")
        return
    
    json_file = sys.argv[1]
    
    try:
        logger.info("Starting UAE Legal Data Processor...")
        
        processor = UAELegalDataProcessor()
        
        # Load legislations from JSON
        legislations = processor.load_from_json(json_file)
        
        if not legislations:
            logger.error("No legislations to process")
            return
        
        # Process and store
        summary = processor.process_and_store_batch(legislations)
        
        # Print summary
        print("\n" + "="*60)
        print("PROCESSING SUMMARY")
        print("="*60)
        print(f"Total legislations: {summary['total']}")
        print(f"Successfully processed: {summary['processed']}")
        print(f"Successfully stored: {summary['stored']}")
        print(f"Failed: {summary['failed']}")
        if summary['errors']:
            print(f"\nErrors:")
            for error in summary['errors'][:5]:  # Show first 5 errors
                print(f"  - {error}")
        print("="*60)
        
    except Exception as e:
        logger.error(f"Error in main: {e}")


if __name__ == "__main__":
    main()
