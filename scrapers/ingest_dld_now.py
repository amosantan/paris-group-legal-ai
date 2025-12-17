#!/usr/bin/env python3
"""
Ingest DLD documents into Supabase without embeddings
Uses Supabase MCP for reliable insertion
"""

import json
import subprocess
import logging
import time

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def clean_sql_string(text):
    """Clean string for SQL insertion"""
    if not text:
        return ''
    # Escape single quotes
    return text.replace("'", "''").replace('\x00', '')


def ingest_document(doc, index, total):
    """Ingest a single document via Supabase MCP"""
    try:
        logger.info(f"[{index}/{total}] Ingesting: {doc['title'][:60]}...")
        
        # Prepare SQL with cleaned strings
        title = clean_sql_string(doc.get('title', 'Untitled'))
        content = clean_sql_string(doc.get('full_text', ''))
        category = clean_sql_string(doc.get('category', 'Dubai Real Estate Law'))
        source = clean_sql_string(doc.get('source', 'Dubai Land Department'))
        url = clean_sql_string(doc.get('url', ''))
        
        # Truncate if too long
        if len(content) > 50000:
            content = content[:50000] + '... [truncated]'
        
        sql = f"""
INSERT INTO legal_articles (title, content, category, source, source_url, created_at, updated_at)
VALUES (
    '{title}',
    '{content}',
    '{category}',
    '{source}',
    '{url}',
    NOW(),
    NOW()
)
ON CONFLICT (title) DO UPDATE SET
    content = EXCLUDED.content,
    updated_at = NOW();
"""
        
        # Execute via MCP
        result = subprocess.run(
            ['manus-mcp-cli', 'tool', 'call', 'execute_sql', '--server', 'supabase',
             '--input', json.dumps({"query": sql})],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            logger.info(f"✓ Successfully ingested: {doc['title'][:60]}")
            return True
        else:
            logger.error(f"✗ Failed to ingest: {doc['title'][:60]}")
            logger.error(f"Error: {result.stderr}")
            return False
            
    except Exception as e:
        logger.error(f"Exception ingesting {doc.get('title', 'Unknown')}: {e}")
        return False


def main():
    """Main execution"""
    print("="*70)
    print("DLD DOCUMENT INGESTION (WITHOUT EMBEDDINGS)")
    print("="*70)
    print("\nIngesting 20 Dubai Land Department documents into Supabase...")
    print("Note: Embeddings will be NULL - you can add them later.\n")
    
    # Load documents
    try:
        with open('/home/ubuntu/paris_group_legal_ai/data/dld_new_documents.json', 'r', encoding='utf-8') as f:
            documents = json.load(f)
    except Exception as e:
        print(f"✗ Error loading documents: {e}")
        return
    
    logger.info(f"Loaded {len(documents)} documents")
    
    # Ingest each document
    success_count = 0
    failed_count = 0
    
    for idx, doc in enumerate(documents, 1):
        if ingest_document(doc, idx, len(documents)):
            success_count += 1
        else:
            failed_count += 1
        
        # Small delay to avoid overwhelming the API
        time.sleep(0.5)
    
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
        print("\n✓ Documents are now in your Supabase knowledge base!")
        print("  They are searchable by text (full-text search).")
        print("\nTo add embeddings later:")
        print("  1. Get a valid OpenAI API key")
        print("  2. Run: python3 add_embeddings_to_existing.py")
    
    return success_count


if __name__ == "__main__":
    main()
