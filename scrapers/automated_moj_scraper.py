#!/usr/bin/env python3
"""
Fully Automated MOJ Portal Scraper
Automatically extracts all UAE federal laws from https://elaws.moj.gov.ae
No manual intervention required!
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
from typing import List, Dict, Optional
import logging
import re
import os
from urllib.parse import urljoin, parse_qs, urlparse

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class AutomatedMOJScraper:
    """Fully automated scraper for MOJ Legal Portal"""
    
    def __init__(self, output_dir="/home/ubuntu/paris_group_legal_ai/data"):
        self.base_url = "https://elaws.moj.gov.ae"
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
        })
        
        self.laws_scraped = []
    
    def get_all_law_links(self) -> List[Dict]:
        """
        Extract all law links from the main federal laws page
        
        Returns:
            List of dictionaries with law metadata and URLs
        """
        try:
            url = f"{self.base_url}/English.aspx?val=UAE-KaitEL1"
            logger.info(f"Fetching law links from: {url}")
            
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all links that contain law references
            law_links = []
            seen_urls = set()
            
            # Look for links with specific patterns
            for link in soup.find_all('a', href=True):
                href = link.get('href', '')
                text = link.get_text(strip=True)
                
                # Check if this looks like a law link
                if ('English.aspx' in href or 'LEGISLATIONS' in href.upper()) and text:
                    # Skip navigation and category links
                    if any(skip in text.upper() for skip in ['HOME', 'ABOUT', 'SERVICES', 'MEDIA', 'LOGIN']):
                        continue
                    
                    full_url = urljoin(self.base_url, href)
                    
                    if full_url not in seen_urls and len(text) > 10:
                        seen_urls.add(full_url)
                        law_links.append({
                            'title': text,
                            'url': full_url
                        })
            
            logger.info(f"Found {len(law_links)} potential law links")
            return law_links
            
        except Exception as e:
            logger.error(f"Error fetching law links: {e}")
            return []
    
    def scrape_law_detail(self, law_url: str, title: str = "") -> Optional[Dict]:
        """
        Scrape the full details of a specific law
        
        Args:
            law_url: URL of the law page
            title: Pre-extracted title (optional)
            
        Returns:
            Dictionary with complete law data
        """
        try:
            logger.info(f"Scraping: {title or law_url}")
            
            response = self.session.get(law_url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract title if not provided
            if not title:
                title_elem = soup.find('h1') or soup.find('h2') or soup.find('title')
                if title_elem:
                    title = title_elem.get_text(strip=True)
            
            # Extract metadata
            metadata = {}
            
            # Look for issue date
            text_content = soup.get_text()
            date_patterns = [
                r'Issued on (\d{1,2}/\d{1,2}/\d{4})',
                r'Issued Date[:\s]+(\d{1,2}/\d{1,2}/\d{4})',
                r'Date[:\s]+(\d{1,2}/\d{1,2}/\d{4})'
            ]
            
            for pattern in date_patterns:
                match = re.search(pattern, text_content, re.IGNORECASE)
                if match:
                    metadata['issue_date'] = match.group(1)
                    break
            
            # Look for Hijri date
            hijri_match = re.search(r'Corresponding to (\d+ \w+ \d+ H\.?)', text_content)
            if hijri_match:
                metadata['hijri_date'] = hijri_match.group(1)
            
            # Look for law number
            law_num_match = re.search(r'(Federal (?:Law|Decree-Law) No\.?\s*\d+)', title or text_content, re.IGNORECASE)
            if law_num_match:
                metadata['law_number'] = law_num_match.group(1)
            
            # Extract full text content
            full_text = ""
            
            # Try to find main content area
            content_selectors = [
                ('div', {'class': re.compile(r'article|content|law-text|main-content', re.I)}),
                ('div', {'id': re.compile(r'MainContent|article|content', re.I)}),
                ('article', {}),
            ]
            
            content_elem = None
            for tag, attrs in content_selectors:
                content_elem = soup.find(tag, attrs)
                if content_elem:
                    break
            
            if content_elem:
                # Remove script and style elements
                for script in content_elem(['script', 'style', 'nav', 'header', 'footer']):
                    script.decompose()
                
                full_text = content_elem.get_text(separator='\n', strip=True)
            else:
                # Fallback: get body text
                body = soup.find('body')
                if body:
                    for script in body(['script', 'style', 'nav', 'header', 'footer']):
                        script.decompose()
                    full_text = body.get_text(separator='\n', strip=True)
            
            # Clean up the text
            full_text = re.sub(r'\n\s*\n', '\n\n', full_text)  # Remove excessive newlines
            full_text = re.sub(r' +', ' ', full_text)  # Remove excessive spaces
            
            # Extract articles
            articles = []
            article_pattern = r'Article\s+(\d+|One|Two|Three|Four|Five|[IVX]+)'
            
            for match in re.finditer(article_pattern, full_text, re.IGNORECASE):
                article_num = match.group(0)
                start_pos = match.end()
                
                # Find the next article or end of text
                next_match = re.search(article_pattern, full_text[start_pos:], re.IGNORECASE)
                end_pos = start_pos + next_match.start() if next_match else len(full_text)
                
                article_text = full_text[start_pos:end_pos].strip()
                
                if article_text and len(article_text) > 10:  # Meaningful content
                    articles.append({
                        'article_number': article_num,
                        'text': article_text[:500]  # First 500 chars
                    })
            
            # Determine category from URL or content
            category = "UAE Federal Law"
            if 'traffic' in full_text.lower()[:500]:
                category = "Traffic and Transportation"
            elif 'personal status' in full_text.lower()[:500] or 'marriage' in full_text.lower()[:500]:
                category = "Family and Personal Status"
            elif 'labor' in full_text.lower()[:500] or 'employment' in full_text.lower()[:500]:
                category = "Labor and Employment"
            elif 'commercial' in full_text.lower()[:500] or 'business' in full_text.lower()[:500]:
                category = "Commercial Law"
            
            return {
                'id': f"moj_{hash(law_url) % 1000000}",
                'title': title,
                'url': law_url,
                'category': category,
                'full_text': full_text,
                'metadata': metadata,
                'articles': articles,
                'word_count': len(full_text.split()),
                'scraped_at': datetime.now().isoformat(),
                'source': 'MOJ Legal Portal'
            }
            
        except Exception as e:
            logger.error(f"Error scraping {law_url}: {e}")
            return None
    
    def scrape_all_laws(self, max_laws: Optional[int] = None) -> List[Dict]:
        """
        Automatically scrape all laws from the portal
        
        Args:
            max_laws: Maximum number of laws to scrape (None for all)
            
        Returns:
            List of scraped law dictionaries
        """
        logger.info("Starting automated scraping of all laws...")
        
        # Get all law links
        law_links = self.get_all_law_links()
        
        if not law_links:
            logger.warning("No law links found")
            return []
        
        if max_laws:
            law_links = law_links[:max_laws]
        
        logger.info(f"Will scrape {len(law_links)} laws")
        
        # Scrape each law
        laws = []
        for idx, law_info in enumerate(law_links, 1):
            logger.info(f"Progress: {idx}/{len(law_links)}")
            
            law_data = self.scrape_law_detail(law_info['url'], law_info['title'])
            
            if law_data and law_data.get('word_count', 0) > 100:  # Meaningful content
                laws.append(law_data)
                self.laws_scraped.append(law_data)
                logger.info(f"✓ Scraped: {law_data['title'][:60]}... ({law_data['word_count']} words)")
            else:
                logger.warning(f"✗ Skipped: {law_info['title'][:60]}... (insufficient content)")
            
            # Be respectful - wait between requests
            time.sleep(2)
        
        logger.info(f"Scraping complete! Successfully scraped {len(laws)} laws")
        return laws
    
    def save_to_json(self, laws: List[Dict], filename: str = "moj_laws_automated.json"):
        """Save scraped laws to JSON file"""
        filepath = os.path.join(self.output_dir, filename)
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(laws, f, ensure_ascii=False, indent=2)
            logger.info(f"✓ Saved {len(laws)} laws to {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")
            return None
    
    def get_summary(self) -> Dict:
        """Get scraping summary statistics"""
        if not self.laws_scraped:
            return {'total': 0}
        
        total_words = sum(law.get('word_count', 0) for law in self.laws_scraped)
        total_articles = sum(len(law.get('articles', [])) for law in self.laws_scraped)
        
        categories = {}
        for law in self.laws_scraped:
            cat = law.get('category', 'Unknown')
            categories[cat] = categories.get(cat, 0) + 1
        
        return {
            'total_laws': len(self.laws_scraped),
            'total_words': total_words,
            'total_articles': total_articles,
            'average_words_per_law': total_words // len(self.laws_scraped) if self.laws_scraped else 0,
            'categories': categories
        }


def main():
    """Main function - fully automated execution"""
    import sys
    
    print("="*70)
    print("AUTOMATED MOJ LEGAL PORTAL SCRAPER")
    print("="*70)
    print()
    
    # Parse command line arguments
    max_laws = None
    if len(sys.argv) > 1:
        try:
            max_laws = int(sys.argv[1])
            print(f"Will scrape maximum {max_laws} laws")
        except:
            print("Usage: python3 automated_moj_scraper.py [max_laws]")
            print("Example: python3 automated_moj_scraper.py 50")
            return
    else:
        print("Will scrape ALL available laws (this may take a while)")
        print("Tip: Run with a number to limit, e.g., 'python3 automated_moj_scraper.py 20'")
    
    print()
    
    # Create scraper
    scraper = AutomatedMOJScraper()
    
    # Scrape all laws
    laws = scraper.scrape_all_laws(max_laws=max_laws)
    
    if laws:
        # Save to JSON
        json_file = scraper.save_to_json(laws)
        
        # Print summary
        summary = scraper.get_summary()
        
        print()
        print("="*70)
        print("SCRAPING SUMMARY")
        print("="*70)
        print(f"Total Laws Scraped: {summary['total_laws']}")
        print(f"Total Words: {summary['total_words']:,}")
        print(f"Total Articles: {summary['total_articles']}")
        print(f"Average Words per Law: {summary['average_words_per_law']:,}")
        print()
        print("Categories:")
        for cat, count in summary['categories'].items():
            print(f"  - {cat}: {count}")
        print()
        print(f"✓ Data saved to: {json_file}")
        print()
        print("Next step: Run the data processor to ingest into Supabase:")
        print(f"  python3 uae_data_processor.py {os.path.basename(json_file)}")
        print("="*70)
    else:
        print("\n✗ No laws were scraped. Please check the logs for errors.")


if __name__ == "__main__":
    main()
