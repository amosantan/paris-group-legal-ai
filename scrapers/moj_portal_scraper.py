#!/usr/bin/env python3
"""
Ministry of Justice Legal Portal Scraper
Scrapes UAE federal laws from https://elaws.moj.gov.ae
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
from typing import List, Dict
import logging
import re

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class MOJPortalScraper:
    """Scraper for Ministry of Justice Legal Portal"""
    
    def __init__(self):
        self.base_url = "https://elaws.moj.gov.ae"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
    
    def get_law_categories(self) -> List[Dict]:
        """
        Get all law categories from the main page
        
        Returns:
            List of category dictionaries with name and URL
        """
        try:
            url = f"{self.base_url}/English.aspx?val=UAE-KaitEL1"
            logger.info(f"Fetching categories from: {url}")
            
            response = self.session.get(url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all category links in the tree view
            categories = []
            tree_links = soup.find_all('a', id=re.compile(r'TreeView1t\d+'))
            
            for link in tree_links:
                category_name = link.get_text(strip=True)
                if category_name and category_name not in ['', ' ']:
                    categories.append({
                        'name': category_name,
                        'id': link.get('id', '')
                    })
            
            logger.info(f"Found {len(categories)} categories")
            return categories
            
        except Exception as e:
            logger.error(f"Error fetching categories: {e}")
            return []
    
    def get_laws_in_category(self, category_id: str) -> List[Dict]:
        """
        Get all laws within a specific category
        
        Args:
            category_id: The tree view ID of the category
            
        Returns:
            List of law dictionaries with title and URL
        """
        try:
            # This would require simulating the tree view expansion
            # For now, return empty list - would need more complex interaction
            logger.warning("Category expansion not yet implemented")
            return []
            
        except Exception as e:
            logger.error(f"Error fetching laws in category: {e}")
            return []
    
    def scrape_law_detail(self, law_url: str) -> Dict:
        """
        Scrape the full details of a specific law
        
        Args:
            law_url: Full URL to the law page
            
        Returns:
            Dictionary with law details
        """
        try:
            logger.info(f"Scraping law from: {law_url}")
            
            response = self.session.get(law_url)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract title
            title = ""
            title_elem = soup.find('h1') or soup.find('h2')
            if title_elem:
                title = title_elem.get_text(strip=True)
            
            # Extract metadata
            metadata = {}
            
            # Try to find issue date
            date_pattern = r'Issued on (\d{2}/\d{2}/\d{4})'
            date_match = re.search(date_pattern, response.text)
            if date_match:
                metadata['issue_date'] = date_match.group(1)
            
            # Extract full text
            full_text = ""
            content_div = soup.find('div', class_=re.compile(r'article|content|law-text'))
            if content_div:
                full_text = content_div.get_text(separator='\n', strip=True)
            else:
                # Fallback: get all text from main content area
                main_content = soup.find('div', id=re.compile(r'MainContent'))
                if main_content:
                    full_text = main_content.get_text(separator='\n', strip=True)
            
            # Extract articles
            articles = []
            article_pattern = r'Article\s+(\d+|One|Two|Three|[A-Z]+)'
            article_matches = re.finditer(article_pattern, full_text, re.IGNORECASE)
            
            for match in article_matches:
                article_num = match.group(0)
                articles.append({
                    'article_number': article_num,
                    'position': match.start()
                })
            
            return {
                'title': title,
                'url': law_url,
                'full_text': full_text,
                'metadata': metadata,
                'articles': articles,
                'word_count': len(full_text.split()),
                'scraped_at': datetime.now().isoformat(),
                'source': 'MOJ Legal Portal'
            }
            
        except Exception as e:
            logger.error(f"Error scraping law detail: {e}")
            return {}
    
    def scrape_sample_laws(self, limit=5) -> List[Dict]:
        """
        Scrape a sample of laws for testing
        
        Args:
            limit: Number of sample laws to scrape
            
        Returns:
            List of law dictionaries
        """
        # Sample law URLs from MOJ portal
        sample_urls = [
            f"{self.base_url}/English.aspx?val=UAE-KaitEL1",  # Federal laws main page
        ]
        
        laws = []
        for url in sample_urls[:limit]:
            law = self.scrape_law_detail(url)
            if law:
                laws.append(law)
            time.sleep(2)  # Be respectful
        
        return laws
    
    def save_to_json(self, laws: List[Dict], filename: str):
        """Save scraped laws to a JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(laws, f, ensure_ascii=False, indent=2)
            logger.info(f"Saved {len(laws)} laws to {filename}")
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")


def main():
    """Main function"""
    logger.info("Starting MOJ Portal Scraper...")
    
    scraper = MOJPortalScraper()
    
    # Get categories
    categories = scraper.get_law_categories()
    
    if categories:
        print("\n" + "="*60)
        print("AVAILABLE CATEGORIES")
        print("="*60)
        for idx, cat in enumerate(categories[:20], 1):  # Show first 20
            print(f"{idx}. {cat['name']}")
        print("="*60)
    
    # For now, just demonstrate the structure
    print("\nNote: Full scraping requires browser automation due to")
    print("the dynamic tree structure. Use the browser-based workflow")
    print("described in the documentation for best results.")


if __name__ == "__main__":
    main()
