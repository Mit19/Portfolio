# Souhardya Biswas Portfolio

## Project Overview
Single-page personal portfolio website for Souhardya Biswas (AI & Robotics Engineer). Static HTML/CSS/JS with zero dependencies.

## Tech Stack
- HTML5, CSS3 (custom properties, grid, flexbox, backdrop-filter), vanilla JavaScript
- Three.js r128 (CDN) for 3D background effects
- Google Fonts: Space Grotesk, Fira Code
- EmailJS (CDN) for contact form
- No frameworks, no build tools

## File Structure
- `index.html` — Single page with all sections
- `css/style.css` — All styling, theming, responsive design
- `js/script.js` — Scroll animations, nav interactions, typing effect, particles, EmailJS form
- `js/3d/` — 4 swappable Three.js 3D backgrounds (constellation, neural, dataflow, brain)
- `assets/` — Images and icons
- `docs/` — Design specs

## Design Decisions
- Dark theme (#050510 bg, #00e5ff cyan accent, #8b5cf6 purple accent, #ff2d7b pink accent)
- Space Grotesk (headings/body) + Fira Code (mono accents) via Google Fonts
- Mobile-first responsive: < 768px mobile, 768-1024px tablet, > 1024px desktop
- CSS `clamp()` for fluid typography
- Intersection Observer for scroll animations
- `prefers-reduced-motion` respected

## Conventions
- CDN dependencies allowed for: Three.js, Google Fonts, EmailJS only
- Inline SVGs for social icons
- Semantic HTML5 elements
- BEM-like CSS class naming
- CSS custom properties for theming
