# Marie Forleo Design Redesign Plan

## Critical Changes Needed

### 1. Color Palette (Complete Change)
**Current:** Dark backgrounds (#161317), dark buttons, B&W aesthetic
**Marie Forleo Style:**
- White/light backgrounds (#ffffff, #f8f9fa)
- Warm orange/gold accent colors (#FF6B35, #F7931E) for CTAs
- Dark navy footer (#1a1a2e)
- Light, bright, clean aesthetic

### 2. Typography (Complete Change)
**Current:** Marcellus (serif) + DM Sans
**Marie Forleo Style:**
- Montserrat (sans-serif) - weights 400-800
- Larger, bolder headings (48-56px for H1)
- Cleaner, more modern typography
- Uppercase letter-spacing for CTAs

### 3. Hero Section (Complete Redesign)
**Current:** Dark full-screen hero with background image overlay
**Marie Forleo Style:**
- Clean white background
- Large heading on left, image/video on right (2-column)
- No dark overlays
- Video embed with play button OR large photo
- Warm orange gradient buttons

### 4. Navigation (Style Update)
**Current:** Black text on white, simple
**Marie Forleo Style:**
- White background, clean minimal
- Thinner, more refined styling
- Dropdown arrows for menus
- "Program Login" style secondary button

### 5. Content Sections (Complete Redesign)
**Current:** Dark/light alternating backgrounds, full-width
**Marie Forleo Style:**
- White + light gray (#f8f9fa) alternating
- Card-based layouts with subtle shadows
- Generous padding and spacing (80-100px between sections)
- 3-column card grids for services

### 6. Buttons (Complete Redesign)
**Current:** Dark rectangular buttons (#161317)
**Marie Forleo Style:**
- Rounded pill buttons (border-radius: 50px)
- Orange/gold gradient background
- Uppercase text with letter-spacing
- Soft shadow and hover lift effect
- "Start Now! 🔥" emoji style

### 7. Cards (New Component)
**Current:** Simple white boxes
**Marie Forleo Style:**
- White cards with subtle shadows (0 2px 10px rgba(0,0,0,0.08))
- Rounded corners (8px)
- Hover effect: lift up and stronger shadow
- Image on top, content below
- Clear CTA button at bottom

### 8. Testimonials (Complete Redesign)
**Current:** Single testimonial, dark background
**Marie Forleo Style:**
- Carousel/slider format
- White/light background
- Multiple testimonials rotating
- Professional headshots (circular)
- Star ratings or quotes styled cleanly

### 9. Footer (Complete Redesign)
**Current:** Dark footer with simple links
**Marie Forleo Style:**
- Dark navy background (#1a1a2e)
- Multi-column link sections
- Newsletter signup ("Become an MF Insider" style)
- Social icons
- Copyright at bottom

### 10. Overall Aesthetic
**Current:** Bold, dark, edgy B&W
**Marie Forleo Style:**
- Light, bright, welcoming
- Professional but warm
- Generous whitespace
- Clean minimal design
- Orange accents for energy

## Files That Need Complete Redesign

1. **app/globals.css** - Replace entire color system and typography
2. **app/components/Button.tsx** - Redesign to pill buttons with gradient
3. **app/components/Navigation.tsx** - Lighter, cleaner styling
4. **app/components/Footer.tsx** - Dark navy with multi-column layout
5. **app/page.tsx** - Completely redesign all 8 sections
6. **app/about/page.tsx** - Redesign with clean white layout
7. **app/work-with-me/page.tsx** - Card-based service layouts
8. **app/client-results/page.tsx** - Testimonial carousel/cards
9. **app/contact/page.tsx** - Clean form design

## Quick Implementation Steps

Since you want the exact Marie Forleo look, I recommend:

1. **Use the Marie Forleo color palette:** Replace all dark colors with white/light gray backgrounds and orange/gold CTAs
2. **Switch to Montserrat font:** Already updated in layout.tsx
3. **Redesign hero:** Remove dark overlay, use 2-column layout (text left, image right)
4. **Update all buttons:** Pill-shaped with orange gradient
5. **Add card components:** For services, testimonials, features
6. **Lighten everything:** Remove all dark sections except footer

Would you like me to:
A) Implement these changes file by file starting with the most critical?
B) Create a complete new design system first, then apply it?
C) Focus on the homepage first to show the new look, then update other pages?

Let me know and I'll execute the redesign to match Marie Forleo's site exactly.
