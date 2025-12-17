#!/bin/bash
#
# Full Automation Script for UAE Legal Database Integration
# This script runs the complete pipeline from scraping to database ingestion
#

set -e  # Exit on error

echo "=========================================="
echo "UAE LEGAL DATABASE - FULL AUTOMATION"
echo "=========================================="
echo ""

# Change to the scrapers directory
cd "$(dirname "$0")"

# Set environment variables
export DATABASE_URL="postgresql://postgres.qgyswyeipbgnfmzqtcra:Amrsaleh1982%40@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"

# Parse arguments
MAX_LAWS=${1:-20}  # Default to 20 laws if not specified

echo "Configuration:"
echo "  - Maximum laws to scrape: $MAX_LAWS"
echo "  - Output directory: ../data/"
echo ""

# Step 1: Scrape laws from MOJ portal
echo "=========================================="
echo "STEP 1: Scraping Laws from MOJ Portal"
echo "=========================================="
python3 automated_moj_scraper.py "$MAX_LAWS"

if [ $? -ne 0 ]; then
    echo "ERROR: Scraping failed!"
    exit 1
fi

echo ""
echo "✓ Scraping completed successfully"
echo ""

# Step 2: Process and ingest into Supabase
echo "=========================================="
echo "STEP 2: Processing and Ingesting to Supabase"
echo "=========================================="

# Find the most recent JSON file
JSON_FILE=$(ls -t ../data/moj_laws_automated*.json 2>/dev/null | head -1)

if [ -z "$JSON_FILE" ]; then
    echo "ERROR: No JSON file found to process!"
    exit 1
fi

echo "Processing file: $JSON_FILE"
echo ""

python3 uae_data_processor.py "$JSON_FILE"

if [ $? -ne 0 ]; then
    echo "ERROR: Data processing failed!"
    exit 1
fi

echo ""
echo "✓ Data processing completed successfully"
echo ""

# Summary
echo "=========================================="
echo "AUTOMATION COMPLETE!"
echo "=========================================="
echo ""
echo "Your UAE legal database has been updated with the latest laws."
echo "Check your Supabase dashboard to verify the data."
echo ""
echo "To run again with different parameters:"
echo "  ./run_full_automation.sh [max_laws]"
echo ""
echo "Example: ./run_full_automation.sh 50"
echo "=========================================="
