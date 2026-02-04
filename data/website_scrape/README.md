# Website Scrape Data

## Overview
Complete scrape of theuntetheredweekly.com using Apify CLI website-content-crawler actor on 2026-02-01.

## Pages Scraped
1. **Main Page:** https://www.theuntetheredweekly.com/
2. **Home Page:** https://www.theuntetheredweekly.com/home
3. **Join Newsletter Page:** https://www.theuntetheredweekly.com/join

## Images Downloaded
Located in `assets/website_images/`:
1. **main-page-og-image.png** (7.2MB) - OG image from main page
2. **home-page-og-image.png** (3.9MB) - OG image from home page
3. **join-page-og-image.jpg** (86KB) - OG image from join page

All images are hosted on Mailchimp CDN (mcusercontent.com).

## Technical Details
- **Platform:** Mailchimp landing pages / campaign archive
- **Page Title Pattern:** "[Page Name] - Courage In The City, LLC"
- **Copyright:** © 2023 Courage In The City, LLC
- **Cookie Consent:** Present on all pages
- **Mailchimp ID:** u=556353bd7923ec61e4fecbdde

## Scraping Method
- **Tool:** Apify CLI with website-content-crawler actor
- **Date:** 2026-02-01
- **Crawler Type:** Cheerio (fast HTML parsing)
- **Max Pages:** 10 (actual: 3)
