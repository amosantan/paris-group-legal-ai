#!/usr/bin/env python3
"""
Direct database ingestion using psycopg2
"""

import json
import psycopg2
from psycopg2.extras import execute_values
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    """Main execution"""
    print("="*70)
    print("DLD DIRECT DATABASE INGESTION")
    print("="*70)
    print("\nConnecting to Supabase and ingesting documents...\n")
    
    # Database connection
    conn_string = "postgresql://postgres.qgyswyeipbgnfmzqtcra:Amrsaleh1982@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"
    
    try:
        # Load documents
        with open('/home/ubuntu/paris_group_legal_ai/data/dld_new_documents.json', 'r', encoding='utf-8') as f:
            documents = json.load(f)
        
        logger.info(f"Loaded {len(documents)} documents")
        
        # Connect to database
        logger.info("Connecting to Supabase...")
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        
        # Insert each document
        success_count = 0
        failed_count = 0
        
        for idx, doc in enumerate(documents, 1):
            try:
                logger.info(f"[{idx}/{len(documents)}] Ingesting: {doc['title'][:60]}...")
                
                title = doc.get('title', 'Untitled')
                content = doc.get('full_text', '')
                category = doc.get('category', 'Dubai Real Estate Law')
                source_url = doc.get('url', '')
                
                # Truncate if needed
                if len(content) > 50000:
                    content = content[:50000] + '... [truncated]'
                
                # Insert
                cur.execute("""
                    INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, NOW(), NOW())
                    ON CONFLICT (title) DO UPDATE SET
                        content = EXCLUDED.content,
                        source_url = EXCLUDED.source_url,
                        updated_at = NOW()
                """, (title, content, category, source_url))
                
                conn.commit()
                logger.info(f"✓ Success: {title[:60]}")
                success_count += 1
                
            except Exception as e:
                logger.error(f"✗ Failed: {doc.get('title', 'Unknown')[:60]}")
                logger.error(f"Error: {str(e)[:200]}")
                conn.rollback()
                failed_count += 1
        
        # Close connection
        cur.close()
        conn.close()
        
        # Summary
        print("\n" + "="*70)
        print("INGESTION COMPLETE")
        print("="*70)
        print(f"Total Documents: {len(documents)}")
        print(f"✓ Successfully Ingested: {success_count}")
        print(f"✗ Failed: {failed_count}")
        print(f"\nSuccess Rate: {(success_count/len(documents)*100):.1f}%")
        print("="*70)
        
        if success_count > 0:
            print("\n✓ Documents successfully added to Supabase!")
            print("  They are now searchable in your knowledge base.")
        
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        print(f"\n✗ Error: {e}")


if __name__ == "__main__":
    main()
