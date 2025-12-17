#!/usr/bin/env python3
"""
UAE Legal Legislation Scraper
Scrapes federal laws and regulations from the UAE Legislation Platform
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
from typing import List, Dict, Optional
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class UAELegalScraper:
    """Scraper for UAE Legislation Platform"""
    
    def __init__(self):
        self.base_url = "https://uaelegislation.gov.ae"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Legal sectors from the UAE platform
        self.sectors = {
            'education': 14,
            'healthcare': 52,
            'labour': 52,
            'economy': 80,
            'industry': 132,
            'finance': 86,
            'tax': 40,
            'justice': 34,
            'security': 51,
            'telecom': 13,
            'energy': 21,
            'family': 45,
            'environment': 46,
            'culture': 15,
            'sport': 9,
            'religion': 11,
            'government': 951
        }
    
    def scrape_legislation_list(self, sector_name: Optional[str] = None, limit: int = 100) -> List[Dict]:
        """
        Scrape the list of legislations from a specific sector or all sectors
        
        Args:
            sector_name: Name of the sector (e.g., 'justice', 'healthcare')
            limit: Maximum number of legislations to scrape
            
        Returns:
            List of legislation metadata dictionaries
        """
        legislations = []
        
        try:
            if sector_name:
                sector_id = self.sectors.get(sector_name.lower())
                if not sector_id:
                    logger.error(f"Unknown sector: {sector_name}")
                    return []
                
                url = f"{self.base_url}/en/legislations?sector={sector_id}"
                logger.info(f"Scraping sector: {sector_name} (ID: {sector_id})")
            else:
                url = f"{self.base_url}/en/legislations"
                logger.info("Scraping all legislations")
            
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find legislation items (structure may vary, this is a template)
            # The actual selectors need to be adjusted based on the real website structure
            legislation_items = soup.find_all('div', class_='legislation-item', limit=limit)
            
            if not legislation_items:
                # Try alternative selectors
                legislation_items = soup.find_all('article', limit=limit)
            
            logger.info(f"Found {len(legislation_items)} legislation items")
            
            for idx, item in enumerate(legislation_items):
                try:
                    # Extract basic information
                    title_elem = item.find(['h2', 'h3', 'h4', 'a'])
                    link_elem = item.find('a', href=True)
                    
                    if not title_elem or not link_elem:
                        continue
                    
                    legislation = {
                        'id': f"uae_leg_{idx}_{int(time.time())}",
                        'title': title_elem.get_text(strip=True),
                        'url': self._make_absolute_url(link_elem['href']),
                        'category': sector_name or 'general',
                        'scraped_at': datetime.now().isoformat(),
                        'source': 'UAE Legislation Platform'
                    }
                    
                    # Try to extract additional metadata
                    date_elem = item.find(['span', 'time'], class_=['date', 'published'])
                    if date_elem:
                        legislation['date'] = date_elem.get_text(strip=True)
                    
                    legislations.append(legislation)
                    
                except Exception as e:
                    logger.warning(f"Error parsing legislation item {idx}: {e}")
                    continue
            
            logger.info(f"Successfully scraped {len(legislations)} legislations")
            
        except requests.RequestException as e:
            logger.error(f"Network error while scraping legislation list: {e}")
        except Exception as e:
            logger.error(f"Unexpected error while scraping legislation list: {e}")
        
        return legislations
    
    def scrape_legislation_detail(self, legislation_url: str) -> Dict:
        """
        Scrape the full text and details of a specific legislation
        
        Args:
            legislation_url: URL of the legislation detail page
            
        Returns:
            Dictionary with full text and structured content
        """
        try:
            logger.info(f"Scraping detail from: {legislation_url}")
            
            response = self.session.get(legislation_url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract the main content
            content_div = soup.find(['div', 'article'], class_=['content', 'legislation-content', 'main-content'])
            
            if not content_div:
                # Fallback: try to find the largest text block
                content_div = soup.find('main') or soup.find('body')
            
            full_text = content_div.get_text(separator='\n', strip=True) if content_div else ""
            
            # Extract articles/sections
            articles = self.extract_articles(content_div) if content_div else []
            
            return {
                'full_text': full_text,
                'html': str(content_div) if content_div else "",
                'articles': articles,
                'word_count': len(full_text.split()),
                'scraped_at': datetime.now().isoformat()
            }
            
        except requests.RequestException as e:
            logger.error(f"Network error while scraping legislation detail: {e}")
            return {'full_text': '', 'html': '', 'articles': [], 'error': str(e)}
        except Exception as e:
            logger.error(f"Unexpected error while scraping legislation detail: {e}")
            return {'full_text': '', 'html': '', 'articles': [], 'error': str(e)}
    
    def extract_articles(self, content) -> List[Dict]:
        """
        Extract individual articles from the legislation content
        
        Args:
            content: BeautifulSoup element containing the legislation content
            
        Returns:
            List of article dictionaries
        """
        articles = []
        
        try:
            # Look for article headers (common patterns)
            article_headers = content.find_all(['h4', 'h5', 'h6'], string=lambda text: text and 'article' in text.lower())
            
            for header in article_headers:
                article_number = header.get_text(strip=True)
                
                # Get the article text (next sibling paragraphs)
                article_text = []
                for sibling in header.find_next_siblings():
                    if sibling.name in ['h4', 'h5', 'h6']:
                        break
                    if sibling.name in ['p', 'div']:
                        article_text.append(sibling.get_text(strip=True))
                
                if article_text:
                    articles.append({
                        'article_number': article_number,
                        'text': '\n'.join(article_text)
                    })
            
            logger.info(f"Extracted {len(articles)} articles")
            
        except Exception as e:
            logger.warning(f"Error extracting articles: {e}")
        
        return articles
    
    def _make_absolute_url(self, url: str) -> str:
        """Convert relative URL to absolute URL"""
        if url.startswith('http'):
            return url
        elif url.startswith('/'):
            return f"{self.base_url}{url}"
        else:
            return f"{self.base_url}/{url}"
    
    def scrape_all_sectors(self, max_per_sector: int = 50) -> List[Dict]:
        """
        Scrape legislations from all sectors
        
        Args:
            max_per_sector: Maximum number of legislations to scrape per sector
            
        Returns:
            List of all scraped legislations
        """
        all_legislations = []
        
        for sector_name in self.sectors.keys():
            logger.info(f"Scraping sector: {sector_name}")
            legislations = self.scrape_legislation_list(sector_name, limit=max_per_sector)
            all_legislations.extend(legislations)
            
            # Be respectful to the server
            time.sleep(2)
        
        logger.info(f"Total legislations scraped: {len(all_legislations)}")
        return all_legislations
    
    def save_to_json(self, legislations: List[Dict], filename: str):
        """Save scraped legislations to a JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(legislations, f, ensure_ascii=False, indent=2)
            logger.info(f"Saved {len(legislations)} legislations to {filename}")
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")


def main():
    """Main function for testing the scraper"""
    scraper = UAELegalScraper()
    
    # Test: Scrape justice sector
    logger.info("Starting UAE Legal Scraper test...")
    legislations = scraper.scrape_legislation_list('justice', limit=10)
    
    if legislations:
        logger.info(f"Successfully scraped {len(legislations)} legislations")
        
        # Scrape details for the first legislation
        if legislations[0]['url']:
            detail = scraper.scrape_legislation_detail(legislations[0]['url'])
            legislations[0].update(detail)
        
        # Save to file
        scraper.save_to_json(legislations, 'uae_legislations_test.json')
        
        # Print summary
        print("\n" + "="*60)
        print("SCRAPING SUMMARY")
        print("="*60)
        for leg in legislations[:3]:
            print(f"\nTitle: {leg['title']}")
            print(f"URL: {leg['url']}")
            print(f"Category: {leg['category']}")
            if 'word_count' in leg:
                print(f"Word Count: {leg['word_count']}")
        print("="*60)
    else:
        logger.warning("No legislations scraped")


if __name__ == "__main__":
    main()
