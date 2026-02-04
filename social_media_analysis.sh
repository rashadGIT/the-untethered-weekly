#!/bin/bash
# Extract Instagram data summary
FILE="/Users/rashad/.claude/projects/-Users-rashad-StudioProjects-ShannonMuruli-BrandSite/052bac0d-a3f4-49e8-94e7-57b371049f42/tool-results/toolu_013bnVJdqmsG2AGtGBbwoJmp.txt"

echo "=== INSTAGRAM ANALYSIS ==="
echo ""
echo "Total Posts: $(grep -o '"id":' "$FILE" | wc -l | tr -d ' ')"
echo ""
echo "Content Types:"
grep -o '"type": "[^"]*"' "$FILE" | sort | uniq -c | sort -rn
echo ""
echo "Most Used Hashtags (Top 10):"
grep -o '#[a-zA-Z0-9_]*' "$FILE" | sort | uniq -c | sort -rn | head -10
echo ""
echo "Recent Post Captions (First 5):"
grep '"caption":' "$FILE" | head -5 | sed 's/.*"caption": "\(.*\)",/\1/' | sed 's/\\n/ | /g'
