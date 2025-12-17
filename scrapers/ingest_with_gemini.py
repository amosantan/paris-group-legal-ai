#!/usr/bin/env python3
"""
Ingest DLD documents with Gemini embeddings using Google's API
"""

import json
import psycopg2
import logging
import requests
import time

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

GEMINI_API_KEY = "AIzaSyCCtHNaZ-IKF922pphOU2NtG32EwfE7mwc"
DB_URL = "postgresql://postgres.qgyswyeipbgnfmzqtcra:Amrsaleh1982%40@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"


def generate_embedding_gemini(text):
    """Generate embedding using Gemini embedding model"""
    try:
        # Use Gemini's text embedding model
        url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={GEMINI_API_KEY}"
        
        # Truncate if too long
        if len(text) > 10000:
            text = text[:10000]
        
        payload = {
            "model": "models/text-embedding-004",
            "content": {
                "parts": [{
                    "text": text
                }]
            }
        }
        
        response = requests.post(url, json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            embedding = data['embedding']['values']
            logger.info(f"Generated embedding with {len(embedding)} dimensions")
            return embedding
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text[:200]}")
            return None
            
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        return None


def ingest_document(conn, doc, index, total):
    """Ingest a single document with embedding"""
    try:
        logger.info(f"[{index}/{total}] Processing: {doc['title'][:60]}...")
        
        title = doc.get('title', 'Untitled')
        content = doc.get('full_text', '')
        category = doc.get('category', 'Dubai Real Estate Law')
        source_url = doc.get('url', '')
        
        # Truncate content if needed
        if len(content) > 50000:
            content = content[:50000] + '... [truncated]'
        
        # Generate embedding
        logger.info("Generating embedding...")
        embedding = generate_embedding_gemini(content)
        
        if embedding is None:
            logger.warning("Skipping document - no embedding generated")
            return False
        
        # Insert into database
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO legal_articles (title, content, category, source_url, embedding, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s::vector, NOW(), NOW())
            ON CONFLICT (title) DO UPDATE SET
                content = EXCLUDED.content,
                source_url = EXCLUDED.source_url,
                embedding = EXCLUDED.embedding,
                updated_at = NOW()
        """, (title, content, category, source_url, embedding))
        
        conn.commit()
        cur.close()
        
        logger.info(f"✓ Successfully ingested: {title[:60]}")
        return True
        
    except Exception as e:
        logger.error(f"✗ Failed: {doc.get('title', 'Unknown')[:60]}")
        logger.error(f"Error: {str(e)[:300]}")
        conn.rollback()
        return False


def main():
    """Main execution"""
    print("="*70)
    print("DLD INGESTION WITH GEMINI EMBEDDINGS")
    print("="*70)
    print("\nUsing Gemini text-embedding-004 model...\n")
    
    try:
        # Load documents
        with open('/home/ubuntu/paris_group_legal_ai/data/dld_new_documents.json', 'r', encoding='utf-8') as f:
            documents = json.load(f)
        
        logger.info(f"Loaded {len(documents)} documents")
        
        # Connect to database
        logger.info("Connecting to Supabase...")
        conn = psycopg2.connect(DB_URL)
        
        # Process each document
        success_count = 0
        failed_count = 0
        
        for idx, doc in enumerate(documents, 1):
            if ingest_document(conn, doc, idx, len(documents)):
                success_count += 1
            else:
                failed_count += 1
            
            # Rate limiting
            time.sleep(1)
        
        # Close connection
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
            print("\n✓ Documents successfully added with Gemini embeddings!")
            print("  Your Legal AI now has semantic search for Dubai real estate laws.")
        
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        print(f"\n✗ Error: {e}")


if __name__ == "__main__":
    main()
