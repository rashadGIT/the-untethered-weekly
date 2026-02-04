# Social Media Data Archive

## Overview
This directory contains scraped data from Shannon Muruli's social media profiles, gathered on 2026-02-01 using Apify CLI.

## Files
- **instagram_raw.json** - Full Instagram scrape (408 posts)
- **facebook_raw.json** - Facebook page data
- **instagram_captions_sample.txt** - Sample of recent Instagram captions for quick reference

## Data Sources
- Instagram: https://www.instagram.com/shannonmuruli/
- Facebook: https://www.facebook.com/shannonmuruli/

## Scraping Method
- Tool: Apify CLI
- Actors Used:
  - apify/instagram-scraper
  - apify/facebook-pages-scraper
- Date: 2026-02-01

## Usage Notes
- Instagram data includes: post captions, timestamps, engagement metrics, hashtags, media URLs
- Facebook data includes: page stats, follower counts, ratings, page information
- Raw JSON files can be parsed for additional content analysis or future website updates
