#!/usr/bin/env python3
"""
UAE Legal Legislation Browser-Based Scraper
Uses the sandbox browser to scrape UAE legislation content
This script coordinates with browser navigation to extract data
"""

import json
import time
from datetime import datetime
from typing import List, Dict
import logging
import os

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class UAEBrowserScraper:
    """
    Browser-based scraper that processes saved markdown files
    from browser navigation
    """
    
    def __init__(self, page_texts_dir="/home/ubuntu/page_texts"):
        self.page_texts_dir = page_texts_dir
        self.legislations = []
    
    def load_legislation_from_markdown(self, md_file_path: str) -> Dict:
        """
        Load and parse legislation content from a markdown file
        
        Args:
            md_file_path: Path to the markdown file
            
        Returns:
            Dictionary with parsed legislation data
        """
        try:
            with open(md_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract title from the first heading
            title = ""
            lines = content.split('\n')
            for line in lines:
                if line.startswith('# ') and 'United Arab Emirates' not in line:
                    title = line.replace('# ', '').strip()
                    break
            
            # Extract articles
            articles = []
            current_article = None
            article_text = []
            
            for line in lines:
                if 'Article' in line and line.startswith('##'):
                    # Save previous article
                    if current_article:
                        articles.append({
                            'article_number': current_article,
                            'text': '\n'.join(article_text).strip()
                        })
                    
                    # Start new article
                    current_article = line.replace('##', '').strip()
                    article_text = []
                elif current_article:
                    article_text.append(line)
            
            # Save last article
            if current_article:
                articles.append({
                    'article_number': current_article,
                    'text': '\n'.join(article_text).strip()
                })
            
            return {
                'title': title,
                'full_text': content,
                'articles': articles,
                'word_count': len(content.split()),
                'source_file': md_file_path,
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error loading markdown file {md_file_path}: {e}")
            return {}
    
    def process_saved_pages(self) -> List[Dict]:
        """
        Process all saved markdown files from the page_texts directory
        
        Returns:
            List of processed legislation dictionaries
        """
        legislations = []
        
        if not os.path.exists(self.page_texts_dir):
            logger.warning(f"Page texts directory not found: {self.page_texts_dir}")
            return legislations
        
        # Find all markdown files
        md_files = [f for f in os.listdir(self.page_texts_dir) if f.endswith('.md')]
        
        logger.info(f"Found {len(md_files)} markdown files to process")
        
        for md_file in md_files:
            md_path = os.path.join(self.page_texts_dir, md_file)
            legislation = self.load_legislation_from_markdown(md_path)
            
            if legislation and legislation.get('title'):
                legislations.append(legislation)
        
        logger.info(f"Processed {len(legislations)} legislations")
        return legislations
    
    def save_to_json(self, legislations: List[Dict], filename: str):
        """Save processed legislations to a JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(legislations, f, ensure_ascii=False, indent=2)
            logger.info(f"Saved {len(legislations)} legislations to {filename}")
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")


def main():
    """Main function"""
    logger.info("Starting UAE Browser Scraper...")
    
    scraper = UAEBrowserScraper()
    legislations = scraper.process_saved_pages()
    
    if legislations:
        scraper.save_to_json(legislations, 'uae_legislations_browser.json')
        
        print("\n" + "="*60)
        print("PROCESSING SUMMARY")
        print("="*60)
        for leg in legislations:
            print(f"\nTitle: {leg.get('title', 'N/A')}")
            print(f"Articles: {len(leg.get('articles', []))}")
            print(f"Word Count: {leg.get('word_count', 0)}")
        print("="*60)
    else:
        print("No legislations found to process")


if __name__ == "__main__":
    main()
