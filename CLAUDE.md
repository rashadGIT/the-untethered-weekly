# Shannon Muruli Brand Website

## Project Overview
Building a personal brand website for Shannon Muruli, a Courage Coach to Women Who Sell, inspired by marieforleo.com's structure and aesthetic.

## Design Guidelines

### Frontend Design Skill
When building UI pages and components for this website, **ALWAYS** refer to and apply the principles from the `frontend-design` skill located at `~/.claude/skills/frontend-design/SKILL.md`.

Key principles to follow:
- **Bold aesthetic direction**: Choose a distinctive design approach that matches Shannon's brand as a courage coach
- **Typography**: Use beautiful, unique fonts - avoid generic choices like Inter, Roboto, Arial
- **Color & Theme**: Commit to a cohesive aesthetic with dominant colors and sharp accents
- **Motion**: Include animations for high-impact moments (page loads, hover states, scroll-triggered effects)
- **Spatial Composition**: Use unexpected layouts, asymmetry, and generous negative space
- **Visual Details**: Add atmospheric depth with gradients, textures, patterns, and layered transparencies
- **Avoid AI aesthetics**: No generic purple gradients, predictable layouts, or cookie-cutter components

### Brand Context
- **Name**: Shannon Muruli
- **Positioning**: Courage Coach to Women Who Sell
- **Core Philosophy**: "Courage Over Comfort" (COC mindset)
- **Target Audience**: Women in sales seeking to overcome fear-based behaviors
- **Tone**: Professional, empowering, bold, authentic

### Color Scheme (LOCKED — Do Not Change)

Always use these exact colors. Never introduce new colors without explicit client approval.

#### Palette
| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Gold** | `#a08216` | Accent color — buttons, labels, active nav, stat numbers, highlights |
| **Gold Hover** | `#7d6611` | Hover state for gold buttons and gold text links |
| **Gold Gradient End** | `#c4a030` | Gradient pair with Primary Gold (e.g. hero heading gradient) |
| **Near-Black** | `#161317` | Page backgrounds (dark sections), footer bg, body text |
| **White** | `#ffffff` | Page backgrounds (light sections), reversed text on dark bg |

#### Rules
- **Gold** (`#a08216`) is the ONLY accent color. No orange, no purple, no teal.
- **Dark backgrounds** use `#161317`. Never use `#1a1a2e`, `#0a0a0a`, or other near-blacks.
- **Page titles (h1)** on key pages (Work With Me, Results, Resources) are gold (`text-[#a08216]`).
- **Stat/number callouts** (300%, 10+, etc.) are always gold.
- **Logo** — "SHANNON MURULI" is all black (`text-[#161317]`) in the nav; all white in the footer.
- **Buttons** — primary variant uses `bg-[#a08216]` with `hover:bg-[#7d6611]`.
- **Typography** — body uses `font-sans` (DM Sans), headings use `font-heading` (Marcellus). All page h1s use `font-heading`.
- **No new arbitrary colors** — if a new color feels necessary, ask first.

#### Tailwind Arbitrary Value Cheatsheet
```
text-[#a08216]          ← gold text
bg-[#a08216]            ← gold background
hover:text-[#7d6611]    ← gold hover (text)
hover:bg-[#7d6611]      ← gold hover (bg)
from-[#a08216] to-[#c4a030]  ← gold gradient
bg-[#161317]            ← near-black background
text-[#161317]          ← near-black text
```

### Reference Sites
- Primary inspiration: https://www.marieforleo.com/
- Current site: https://www.theuntetheredweekly.com/
- Instagram: https://www.instagram.com/shannonmuruli/
- Facebook: https://www.facebook.com/shannonmuruli/

## Development Notes
- Frontend design decisions should be intentional and distinctive
- Every page should feel memorable and aligned with Shannon's brand
- Prioritize production-grade, functional code with meticulous aesthetic details
