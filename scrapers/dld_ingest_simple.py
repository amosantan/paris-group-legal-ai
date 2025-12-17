#!/usr/bin/env python3
"""
Simple DLD ingestion script - stores documents without embeddings
"""

import json
import subprocess
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def ingest_via_mcp(documents):
    """Ingest documents using Supabase MCP"""
    success_count = 0
    
    for idx, doc in enumerate(documents, 1):
        try:
            logger.info(f"Ingesting {idx}/{len(documents)}: {doc['title'][:60]}")
            
            # Prepare SQL
            title = doc['title'].replace("'", "''")
            text = doc['full_text'].replace("'", "''")
            category = doc['category'].replace("'", "''")
            
            sql = f"""
            INSERT INTO legal_articles (title, content, category, source, created_at)
            VALUES (
                '{title}',
                '{text}',
                '{category}',
                'Dubai Land Department',
                NOW()
            )
            ON CONFLICT (title) DO NOTHING;
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
                logger.info(f"✓ Ingested: {doc['title'][:60]}")
                success_count += 1
            else:
                logger.error(f"✗ Failed: {doc['title'][:60]}")
                
        except Exception as e:
            logger.error(f"Error ingesting {doc['title']}: {e}")
    
    return success_count


def main():
    """Main execution"""
    print("="*70)
    print("DLD SIMPLE INGESTION (WITHOUT EMBEDDINGS)")
    print("="*70)
    
    # Load documents
    with open('/home/ubuntu/paris_group_legal_ai/data/dld_new_documents.json', 'r') as f:
        documents = json.load(f)
    
    logger.info(f"Loaded {len(documents)} documents")
    
    # Ingest
    success = ingest_via_mcp(documents)
    
    print("\n" + "="*70)
    print("INGESTION SUMMARY")
    print("="*70)
    print(f"Total Documents: {len(documents)}")
    print(f"Successfully Ingested: {success}")
    print(f"Failed: {len(documents) - success}")
    print("="*70)
    print("\nNote: Documents stored without embeddings.")
    print("You can generate embeddings later when the API is available.")


if __name__ == "__main__":
    main()
