#!/usr/bin/env python3
"""
Ingest DLD documents into Supabase with correct schema
Columns: id, title, content, source_url, category, subcategory, importance_score, concepts, scenarios, embedding, created_at, updated_at
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
    # Escape single quotes and remove null bytes
    return text.replace("'", "''").replace('\x00', '').replace('\\', '\\\\')


def ingest_document(doc, index, total):
    """Ingest a single document via Supabase MCP"""
    try:
        logger.info(f"[{index}/{total}] Ingesting: {doc['title'][:60]}...")
        
        # Prepare data
        title = clean_sql_string(doc.get('title', 'Untitled'))
        content = clean_sql_string(doc.get('full_text', ''))
        category = clean_sql_string(doc.get('category', 'Dubai Real Estate Law'))
        source_url = clean_sql_string(doc.get('url', ''))
        
        # Truncate content if too long (PostgreSQL has limits)
        if len(content) > 40000:
            content = content[:40000] + '... [truncated for database storage]'
            logger.warning(f"Content truncated for: {title[:60]}")
        
        # Simple SQL with only the essential columns
        sql = f"""
INSERT INTO legal_articles (title, content, category, source_url, created_at, updated_at)
VALUES (
    '{title}',
    '{content}',
    '{category}',
    '{source_url}',
    NOW(),
    NOW()
)
ON CONFLICT (title) DO UPDATE SET
    content = EXCLUDED.content,
    source_url = EXCLUDED.source_url,
    updated_at = NOW();
"""
        
        # Execute via MCP
        result = subprocess.run(
            ['manus-mcp-cli', 'tool', 'call', 'execute_sql', '--server', 'supabase',
             '--input', json.dumps({"project_id": "qgyswyeipbgnfmzqtcra", "query": sql})],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0 and 'error' not in result.stdout.lower():
            logger.info(f"✓ Successfully ingested: {doc['title'][:60]}")
            return True
        else:
            logger.error(f"✗ Failed to ingest: {doc['title'][:60]}")
            if result.stderr:
                logger.error(f"Error: {result.stderr[:200]}")
            return False
            
    except Exception as e:
        logger.error(f"Exception ingesting {doc.get('title', 'Unknown')}: {str(e)[:200]}")
        return False


def main():
    """Main execution"""
    print("="*70)
    print("DLD DOCUMENT INGESTION - FIXED VERSION")
    print("="*70)
    print("\nIngesting Dubai Land Department documents into Supabase...")
    print("Using correct schema: title, content, category, source_url\n")
    
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
        
        # Small delay
        time.sleep(0.3)
    
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
        print("  Category: Dubai Real Estate Law")
        print("  Source: Dubai Land Department")
        print("\nNote: Embeddings are NULL - semantic search won't work yet.")
        print("      Documents are searchable by text/category.")
    
    return success_count


if __name__ == "__main__":
    main()
