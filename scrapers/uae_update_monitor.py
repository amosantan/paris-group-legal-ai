#!/usr/bin/env python3
"""
UAE Legal Update Monitor
Monitors the UAE Legislation Platform for new or updated laws
"""

import os
import json
import time
from datetime import datetime
from typing import List, Dict
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class UAELegalUpdateMonitor:
    """
    Monitors UAE legislation for updates and triggers data ingestion
    """
    
    def __init__(self, data_dir="/home/ubuntu/paris_group_legal_ai/data"):
        self.data_dir = data_dir
        self.state_file = os.path.join(data_dir, "monitor_state.json")
        self.scheduler = BackgroundScheduler()
        
        # Create data directory if it doesn't exist
        os.makedirs(data_dir, exist_ok=True)
        
        # Load previous state
        self.state = self.load_state()
    
    def load_state(self) -> Dict:
        """Load the monitoring state from file"""
        try:
            if os.path.exists(self.state_file):
                with open(self.state_file, 'r') as f:
                    state = json.load(f)
                logger.info(f"Loaded monitoring state: {len(state.get('known_legislations', []))} known legislations")
                return state
        except Exception as e:
            logger.warning(f"Could not load state file: {e}")
        
        return {
            'known_legislations': [],
            'last_check': None,
            'total_checks': 0
        }
    
    def save_state(self):
        """Save the monitoring state to file"""
        try:
            with open(self.state_file, 'w') as f:
                json.dump(self.state, f, indent=2)
            logger.info("Saved monitoring state")
        except Exception as e:
            logger.error(f"Error saving state: {e}")
    
    def check_for_updates(self):
        """
        Check for new or updated legislations
        This is a placeholder that would integrate with the scraper
        """
        try:
            logger.info(f"Checking for updates at {datetime.now()}")
            
            self.state['total_checks'] += 1
            self.state['last_check'] = datetime.now().isoformat()
            
            # In a real implementation, this would:
            # 1. Scrape the legislation list from the UAE platform
            # 2. Compare with known_legislations
            # 3. Identify new or changed legislations
            # 4. Trigger the data processor for new/changed items
            
            # For now, we'll create a notification system
            updates_found = []
            
            # Placeholder: Check if there are new JSON files to process
            json_files = [f for f in os.listdir(self.data_dir) if f.endswith('.json') and f != 'monitor_state.json']
            
            for json_file in json_files:
                file_path = os.path.join(self.data_dir, json_file)
                file_mtime = os.path.getmtime(file_path)
                
                # Check if file is new (modified after last check)
                last_check_time = datetime.fromisoformat(self.state['last_check']).timestamp() if self.state['last_check'] else 0
                
                if file_mtime > last_check_time:
                    updates_found.append(json_file)
                    logger.info(f"New data file found: {json_file}")
            
            if updates_found:
                logger.info(f"Found {len(updates_found)} files with potential updates")
                self.notify_updates(updates_found)
            else:
                logger.info("No updates found")
            
            # Save state
            self.save_state()
            
        except Exception as e:
            logger.error(f"Error checking for updates: {e}")
    
    def notify_updates(self, updates: List[str]):
        """
        Notify about found updates
        
        Args:
            updates: List of update identifiers
        """
        notification = {
            'timestamp': datetime.now().isoformat(),
            'updates_count': len(updates),
            'updates': updates
        }
        
        # Save notification to file
        notification_file = os.path.join(self.data_dir, f"notification_{int(time.time())}.json")
        try:
            with open(notification_file, 'w') as f:
                json.dump(notification, f, indent=2)
            logger.info(f"Notification saved to {notification_file}")
        except Exception as e:
            logger.error(f"Error saving notification: {e}")
    
    def start_monitoring(self, check_interval_hours=24):
        """
        Start the automated monitoring service
        
        Args:
            check_interval_hours: Hours between checks (default: 24)
        """
        logger.info(f"Starting UAE Legal Update Monitor (checking every {check_interval_hours} hours)")
        
        # Schedule daily checks at 2 AM
        self.scheduler.add_job(
            self.check_for_updates,
            CronTrigger(hour=2, minute=0),
            id='daily_check',
            replace_existing=True
        )
        
        # Also add interval-based checking as backup
        self.scheduler.add_job(
            self.check_for_updates,
            'interval',
            hours=check_interval_hours,
            id='interval_check',
            replace_existing=True
        )
        
        self.scheduler.start()
        logger.info("Monitoring started successfully")
        
        # Run an immediate check
        self.check_for_updates()
    
    def stop_monitoring(self):
        """Stop the monitoring service"""
        if self.scheduler.running:
            self.scheduler.shutdown()
            logger.info("Monitoring stopped")
    
    def get_status(self) -> Dict:
        """Get the current monitoring status"""
        return {
            'is_running': self.scheduler.running if self.scheduler else False,
            'last_check': self.state.get('last_check'),
            'total_checks': self.state.get('total_checks', 0),
            'known_legislations_count': len(self.state.get('known_legislations', []))
        }


def main():
    """Main function"""
    import sys
    import signal
    
    logger.info("Starting UAE Legal Update Monitor...")
    
    monitor = UAELegalUpdateMonitor()
    
    # Handle graceful shutdown
    def signal_handler(sig, frame):
        logger.info("Shutting down monitor...")
        monitor.stop_monitoring()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Start monitoring
    monitor.start_monitoring(check_interval_hours=24)
    
    # Print status
    status = monitor.get_status()
    print("\n" + "="*60)
    print("MONITOR STATUS")
    print("="*60)
    print(f"Running: {status['is_running']}")
    print(f"Last check: {status['last_check']}")
    print(f"Total checks: {status['total_checks']}")
    print(f"Known legislations: {status['known_legislations_count']}")
    print("="*60)
    print("\nMonitor is running. Press Ctrl+C to stop.")
    
    # Keep the script running
    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        monitor.stop_monitoring()


if __name__ == "__main__":
    main()
