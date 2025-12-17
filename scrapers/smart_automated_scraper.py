#!/usr/bin/env python3
"""
Smart Automated UAE Legal Scraper
Combines multiple strategies to automatically extract UAE federal laws
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

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class SmartAutomatedScraper:
    """Smart automated scraper with multiple strategies"""
    
    def __init__(self, output_dir="/home/ubuntu/paris_group_legal_ai/data"):
        self.base_url = "https://elaws.moj.gov.ae"
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        })
        
        # Pre-defined law URLs from MOJ portal (discovered through browser)
        self.known_law_urls = self._get_known_law_urls()
    
    def _get_known_law_urls(self) -> List[Dict]:
        """
        Get a curated list of important UAE federal laws
        These URLs are stable and represent the core legal framework
        """
        return [
            {
                'title': 'Federal Law No. 28 of 2005 - Personal Status Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3188',
                'category': 'Family and Personal Status'
            },
            {
                'title': 'Federal Law No. 5 of 1985 - Civil Transactions Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2662',
                'category': 'Civil Law'
            },
            {
                'title': 'Federal Law No. 3 of 1987 - Penal Code',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2672',
                'category': 'Criminal Law'
            },
            {
                'title': 'Federal Law No. 11 of 1992 - Civil Procedures Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2680',
                'category': 'Procedural Law'
            },
            {
                'title': 'Federal Law No. 18 of 1993 - Commercial Transactions Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2689',
                'category': 'Commercial Law'
            },
            {
                'title': 'Federal Law No. 8 of 1980 - Labor Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2649',
                'category': 'Labor and Employment'
            },
            {
                'title': 'Federal Law No. 21 of 2021 - Traffic Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3889',
                'category': 'Traffic and Transportation'
            },
            {
                'title': 'Federal Law No. 2 of 2015 - Commercial Companies Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3398',
                'category': 'Commercial Law'
            },
            {
                'title': 'Federal Law No. 10 of 1980 - Central Bank Law',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2651',
                'category': 'Banking and Finance'
            },
            {
                'title': 'Federal Law No. 24 of 1999 - Protection of Environment',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2728',
                'category': 'Environment'
            },
            {
                'title': 'Federal Law No. 7 of 2002 - Copyrights and Neighboring Rights',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2744',
                'category': 'Intellectual Property'
            },
            {
                'title': 'Federal Law No. 5 of 2012 - Combating Cybercrimes',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3226',
                'category': 'Cybersecurity'
            },
            {
                'title': 'Federal Law No. 2 of 2001 - Nationality and Passports',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=2739',
                'category': 'Nationality and Immigration'
            },
            {
                'title': 'Federal Law No. 29 of 2006 - Rights of Persons with Disabilities',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3195',
                'category': 'Social Welfare'
            },
            {
                'title': 'Federal Law No. 7 of 2014 - Combating Terrorism',
                'url': f'{self.base_url}/English.aspx?val=UAE-KaitEL1&LawID=3361',
                'category': 'National Security'
            }
        ]
    
    def scrape_law_detail(self, law_info: Dict) -> Optional[Dict]:
        """Scrape full details of a specific law"""
        try:
            logger.info(f"Scraping: {law_info['title']}")
            
            response = self.session.get(law_info['url'], timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract metadata
            metadata = {}
            text_content = soup.get_text()
            
            # Issue date
            date_match = re.search(r'Issued on (\d{1,2}/\d{1,2}/\d{4})', text_content, re.IGNORECASE)
            if date_match:
                metadata['issue_date'] = date_match.group(1)
            
            # Hijri date
            hijri_match = re.search(r'Corresponding to (\d+ \w+ \d+ H\.?)', text_content)
            if hijri_match:
                metadata['hijri_date'] = hijri_match.group(1)
            
            # Extract full text
            full_text = ""
            main_content = soup.find('div', id=re.compile(r'MainContent|article|content', re.I))
            
            if main_content:
                for unwanted in main_content(['script', 'style', 'nav', 'header', 'footer']):
                    unwanted.decompose()
                full_text = main_content.get_text(separator='\n', strip=True)
            else:
                body = soup.find('body')
                if body:
                    for unwanted in body(['script', 'style', 'nav', 'header', 'footer']):
                        unwanted.decompose()
                    full_text = body.get_text(separator='\n', strip=True)
            
            # Clean text
            full_text = re.sub(r'\n\s*\n', '\n\n', full_text)
            full_text = re.sub(r' +', ' ', full_text)
            
            # Extract articles
            articles = []
            for match in re.finditer(r'Article\s+(\d+|One|Two|[IVX]+)', full_text, re.IGNORECASE):
                article_num = match.group(0)
                start = match.end()
                next_match = re.search(r'Article\s+(\d+|One|Two|[IVX]+)', full_text[start:], re.IGNORECASE)
                end = start + next_match.start() if next_match else len(full_text)
                article_text = full_text[start:end].strip()
                
                if article_text and len(article_text) > 10:
                    articles.append({
                        'article_number': article_num,
                        'text': article_text[:1000]
                    })
            
            return {
                'id': f"moj_{abs(hash(law_info['url'])) % 1000000}",
                'title': law_info['title'],
                'url': law_info['url'],
                'category': law_info.get('category', 'UAE Federal Law'),
                'full_text': full_text,
                'metadata': metadata,
                'articles': articles,
                'word_count': len(full_text.split()),
                'scraped_at': datetime.now().isoformat(),
                'source': 'MOJ Legal Portal'
            }
            
        except Exception as e:
            logger.error(f"Error scraping {law_info['title']}: {e}")
            return None
    
    def scrape_all_laws(self) -> List[Dict]:
        """Scrape all known laws"""
        logger.info(f"Starting automated scraping of {len(self.known_law_urls)} laws...")
        
        laws = []
        for idx, law_info in enumerate(self.known_law_urls, 1):
            logger.info(f"Progress: {idx}/{len(self.known_law_urls)}")
            
            law_data = self.scrape_law_detail(law_info)
            
            if law_data and law_data.get('word_count', 0) > 100:
                laws.append(law_data)
                logger.info(f"✓ Scraped: {law_data['title'][:60]}... ({law_data['word_count']} words)")
            else:
                logger.warning(f"✗ Skipped: {law_info['title'][:60]}...")
            
            time.sleep(2)  # Be respectful
        
        logger.info(f"Scraping complete! Successfully scraped {len(laws)} laws")
        return laws
    
    def save_to_json(self, laws: List[Dict], filename: str = "uae_laws_automated.json"):
        """Save to JSON file"""
        filepath = os.path.join(self.output_dir, filename)
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(laws, f, ensure_ascii=False, indent=2)
            logger.info(f"✓ Saved {len(laws)} laws to {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Error saving: {e}")
            return None
    
    def get_summary(self, laws: List[Dict]) -> Dict:
        """Get summary statistics"""
        if not laws:
            return {'total': 0}
        
        total_words = sum(law.get('word_count', 0) for law in laws)
        total_articles = sum(len(law.get('articles', [])) for law in laws)
        
        categories = {}
        for law in laws:
            cat = law.get('category', 'Unknown')
            categories[cat] = categories.get(cat, 0) + 1
        
        return {
            'total_laws': len(laws),
            'total_words': total_words,
            'total_articles': total_articles,
            'average_words_per_law': total_words // len(laws),
            'categories': categories
        }


def main():
    """Main execution"""
    print("="*70)
    print("SMART AUTOMATED UAE LEGAL SCRAPER")
    print("="*70)
    print("\nThis scraper will automatically extract core UAE federal laws")
    print("from the Ministry of Justice Legal Portal.\n")
    
    scraper = SmartAutomatedScraper()
    
    print(f"Will scrape {len(scraper.known_law_urls)} essential UAE laws...")
    print("This includes: Personal Status, Civil Law, Criminal Law, Labor Law,")
    print("Commercial Law, Traffic Law, and more.\n")
    
    laws = scraper.scrape_all_laws()
    
    if laws:
        json_file = scraper.save_to_json(laws)
        summary = scraper.get_summary(laws)
        
        print("\n" + "="*70)
        print("SCRAPING SUMMARY")
        print("="*70)
        print(f"Total Laws Scraped: {summary['total_laws']}")
        print(f"Total Words: {summary['total_words']:,}")
        print(f"Total Articles: {summary['total_articles']}")
        print(f"Average Words per Law: {summary['average_words_per_law']:,}")
        print("\nCategories:")
        for cat, count in summary['categories'].items():
            print(f"  - {cat}: {count}")
        print(f"\n✓ Data saved to: {json_file}")
        print("\nNext step: Run the data processor to ingest into Supabase:")
        print(f"  cd /home/ubuntu/paris_group_legal_ai/scrapers")
        print(f"  export DATABASE_URL='your_database_url'")
        print(f"  python3 uae_data_processor.py {os.path.basename(json_file)}")
        print("="*70)
    else:
        print("\n✗ No laws were scraped. Please check the logs.")


if __name__ == "__main__":
    main()
