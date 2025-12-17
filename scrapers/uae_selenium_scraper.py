#!/usr/bin/env python3
"""
UAE Legal Legislation Scraper with Selenium
Uses browser automation to scrape the UAE Legislation Platform
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import json
import time
from datetime import datetime
from typing import List, Dict
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class UAESeleniumScraper:
    """Selenium-based scraper for UAE Legislation Platform"""
    
    def __init__(self, headless=True):
        self.base_url = "https://uaelegislation.gov.ae"
        self.driver = None
        self.headless = headless
        self._init_driver()
    
    def _init_driver(self):
        """Initialize the Selenium WebDriver"""
        try:
            chrome_options = Options()
            if self.headless:
                chrome_options.add_argument('--headless')
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--disable-gpu')
            chrome_options.add_argument('--window-size=1920,1080')
            chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
            
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
            logger.info("Selenium WebDriver initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize WebDriver: {e}")
            raise
    
    def scrape_legislation_list(self, limit=50) -> List[Dict]:
        """
        Scrape the list of legislations from the main page
        
        Args:
            limit: Maximum number of legislations to scrape
            
        Returns:
            List of legislation metadata dictionaries
        """
        legislations = []
        
        try:
            url = f"{self.base_url}/en/legislations"
            logger.info(f"Loading legislations page: {url}")
            
            self.driver.get(url)
            
            # Wait for the page to load
            wait = WebDriverWait(self.driver, 20)
            time.sleep(5)  # Additional wait for dynamic content
            
            # Scroll to load more content
            logger.info("Scrolling to load content...")
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            scroll_attempts = 0
            max_scrolls = 5
            
            while scroll_attempts < max_scrolls:
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)
                new_height = self.driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
                scroll_attempts += 1
            
            # Find legislation links
            legislation_links = self.driver.find_elements(By.CSS_SELECTOR, "a[href*='/legislations/']")
            
            logger.info(f"Found {len(legislation_links)} legislation links")
            
            # Extract unique legislation URLs
            seen_urls = set()
            for link in legislation_links[:limit]:
                try:
                    href = link.get_attribute('href')
                    title = link.text.strip()
                    
                    if href and '/legislations/' in href and href not in seen_urls and title:
                        seen_urls.add(href)
                        
                        legislations.append({
                            'id': href.split('/')[-1],
                            'title': title,
                            'url': href,
                            'scraped_at': datetime.now().isoformat(),
                            'source': 'UAE Legislation Platform'
                        })
                        
                        if len(legislations) >= limit:
                            break
                            
                except Exception as e:
                    logger.warning(f"Error extracting legislation link: {e}")
                    continue
            
            logger.info(f"Successfully extracted {len(legislations)} unique legislations")
            
        except Exception as e:
            logger.error(f"Error scraping legislation list: {e}")
        
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
            
            self.driver.get(legislation_url)
            
            # Wait for content to load
            wait = WebDriverWait(self.driver, 20)
            time.sleep(3)
            
            # Extract metadata
            metadata = {}
            
            try:
                # Extract issued date
                issued_date_elem = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Issued Date')]/following-sibling::*")
                metadata['issued_date'] = issued_date_elem.text.strip()
            except:
                pass
            
            try:
                # Extract effective date
                effective_date_elem = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Effective Date')]/following-sibling::*")
                metadata['effective_date'] = effective_date_elem.text.strip()
            except:
                pass
            
            try:
                # Extract legislation state
                state_elem = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Legislation State')]/following-sibling::*")
                metadata['state'] = state_elem.text.strip()
            except:
                pass
            
            # Extract full text content
            full_text = ""
            articles = []
            
            try:
                # Find the main content area
                content_elements = self.driver.find_elements(By.CSS_SELECTOR, "article, .content, .legislation-content")
                
                if content_elements:
                    full_text = content_elements[0].text
                else:
                    # Fallback: get all text from body
                    full_text = self.driver.find_element(By.TAG_NAME, "body").text
                
                # Extract individual articles
                article_links = self.driver.find_elements(By.CSS_SELECTOR, "a[href*='#article'], a[href*='Article']")
                
                for article_link in article_links:
                    article_title = article_link.text.strip()
                    if article_title and 'Article' in article_title:
                        articles.append({
                            'article_number': article_title,
                            'text': ''  # Would need to extract article content separately
                        })
                
            except Exception as e:
                logger.warning(f"Error extracting content: {e}")
            
            return {
                'full_text': full_text,
                'metadata': metadata,
                'articles': articles,
                'word_count': len(full_text.split()),
                'scraped_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error scraping legislation detail: {e}")
            return {'full_text': '', 'metadata': {}, 'articles': [], 'error': str(e)}
    
    def scrape_all_legislations(self, limit=50, include_details=True) -> List[Dict]:
        """
        Scrape all legislations with their details
        
        Args:
            limit: Maximum number of legislations to scrape
            include_details: Whether to scrape full details for each legislation
            
        Returns:
            List of complete legislation dictionaries
        """
        all_legislations = []
        
        # First, get the list of legislations
        legislations = self.scrape_legislation_list(limit=limit)
        
        if not include_details:
            return legislations
        
        # Then scrape details for each
        for idx, legislation in enumerate(legislations):
            logger.info(f"Scraping details for legislation {idx+1}/{len(legislations)}: {legislation['title']}")
            
            detail = self.scrape_legislation_detail(legislation['url'])
            legislation.update(detail)
            
            all_legislations.append(legislation)
            
            # Be respectful to the server
            time.sleep(2)
        
        return all_legislations
    
    def save_to_json(self, legislations: List[Dict], filename: str):
        """Save scraped legislations to a JSON file"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(legislations, f, ensure_ascii=False, indent=2)
            logger.info(f"Saved {len(legislations)} legislations to {filename}")
        except Exception as e:
            logger.error(f"Error saving to JSON: {e}")
    
    def close(self):
        """Close the WebDriver"""
        if self.driver:
            self.driver.quit()
            logger.info("WebDriver closed")


def main():
    """Main function for testing the scraper"""
    scraper = None
    
    try:
        logger.info("Starting UAE Legal Selenium Scraper...")
        scraper = UAESeleniumScraper(headless=True)
        
        # Scrape a limited number of legislations for testing
        legislations = scraper.scrape_all_legislations(limit=5, include_details=True)
        
        if legislations:
            logger.info(f"Successfully scraped {len(legislations)} legislations")
            
            # Save to file
            scraper.save_to_json(legislations, 'uae_legislations_selenium.json')
            
            # Print summary
            print("\n" + "="*60)
            print("SCRAPING SUMMARY")
            print("="*60)
            for leg in legislations:
                print(f"\nTitle: {leg['title']}")
                print(f"URL: {leg['url']}")
                if 'metadata' in leg:
                    print(f"Metadata: {leg['metadata']}")
                if 'word_count' in leg:
                    print(f"Word Count: {leg['word_count']}")
            print("="*60)
        else:
            logger.warning("No legislations scraped")
    
    except Exception as e:
        logger.error(f"Error in main: {e}")
    
    finally:
        if scraper:
            scraper.close()


if __name__ == "__main__":
    main()
