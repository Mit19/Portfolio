# Souhardya Biswas Portfolio

## Project Overview
Single-page personal portfolio website for Souhardya Biswas (AI & Robotics Engineer). Static HTML/CSS/JS with zero dependencies.

## Tech Stack
- HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- No frameworks, no build tools, no CDN dependencies

## File Structure
- `index.html` — Single page with all sections
- `css/style.css` — All styling, theming, responsive design
- `js/script.js` — Scroll animations, nav interactions, typing effect
- `assets/` — Images and icons
- `docs/` — Design specs

## Design Decisions
- Dark theme (#0a0a0f bg, #00d4ff cyan accent, #7b2ff7 purple accent)
- System font stack + monospace accents for headings
- Mobile-first responsive: < 768px mobile, 768-1024px tablet, > 1024px desktop
- CSS `clamp()` for fluid typography
- Intersection Observer for scroll animations
- `prefers-reduced-motion` respected

## Conventions
- No external dependencies or CDNs
- Inline SVGs for social icons
- Semantic HTML5 elements
- BEM-like CSS class naming
- CSS custom properties for theming
