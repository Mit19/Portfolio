# Portfolio Redesign — Full Visual Overhaul

## Overview

Redesign Souhardya Biswas's AI & Robotics Engineer portfolio from a basic flat design to a rich, immersive, AI-themed experience. The redesign rebuilds CSS and JS from scratch while preserving HTML content structure and all 8 sections.

## Decisions

- **Approach:** Full visual overhaul (rebuild CSS/JS, restructure HTML markup)
- **Dependencies:** Three.js (r160 CDN) + Google Fonts (Space Grotesk, Fira Code) + EmailJS (CDN)
- **Convention change:** The original CLAUDE.md specified "no CDN dependencies." This redesign deliberately changes that convention. CLAUDE.md must be updated to reflect the new dependency policy when implementation begins.
- **No build tools** — static files, swap 3D script path to change backgrounds
- **All 8 sections retained:** Hero, About, Skills, Experience, Education, Projects, Publications, Contact

---

## Color System

| Role | Value |
|------|-------|
| Background (deep) | `#050510` |
| Background (card surface) | `#0a0a1a` |
| Primary accent (Cyan) | `#00e5ff` |
| Secondary accent (Electric Purple) | `#8b5cf6` |
| Tertiary accent (Neon Pink) | `#ff2d7b` |
| Text primary | `#f0eeff` |
| Text muted | `rgba(240, 238, 255, 0.45)` |
| Glass background | `rgba(255, 255, 255, 0.04)` |
| Glass border | `rgba(255, 255, 255, 0.10)` |

**Gradients:**
- Text gradient: `135deg` cyan → purple → pink
- Button gradient: purple → cyan (pink glow on hover)
- Divider lines: cyan fading to transparent

---

## Typography

| Role | Font | Weights |
|------|------|---------|
| Headings & body | Space Grotesk | 400, 700 |
| Code / mono accents | Fira Code | 400, 500 |

- Section titles: uppercase, letter-spacing 0.1–0.18em
- Fluid sizing: `clamp()` throughout (e.g., hero title `clamp(2.5rem, 6vw, 4.5rem)`)

---

## Visual Layers (bottom to top)

### Layer 1: Three.js 3D Canvas
- Full-viewport fixed canvas behind all content
- 4 swappable scripts in `js/3d/`:
  - `script3D_constellation.js` **(default)** — 200+ particles forming constellations, connecting when near each other like a living network graph
  - `script3D_neural.js` — Floating octahedron nodes with dynamic connection lines and 2 rotating torus rings
  - `script3D_dataflow.js` — Streams of particles with glowing trails flowing through 3D space
  - `script3D_brain.js` — Slowly rotating wireframe geometric brain with orbiting particles
- Mouse parallax on camera (0.03 easing factor)
- Pixel ratio capped at 1.5 for performance
- `requestAnimationFrame` loop

### Layer 2: CSS Gradient Orbs
- 3 large blurred radial gradients (cyan, purple, pink)
- `opacity: 0.25`, `filter: blur(90px)`
- `@keyframes drift` — 20-30s loops, different per orb
- Positioned at different corners, moving independently

### Layer 3: Grid Overlay
- Subtle repeating dot/line grid pattern via `background-image`
- Fades toward edges with radial mask
- Creates "digital workspace" feel

### Layer 4: Floating Particles
- 25-30 tiny CSS elements (1-3px diameter)
- `@keyframes pfloat` — rise from bottom to top over 12-30 seconds
- Random horizontal positions, staggered delays
- Opacity fades in at 5%, out after 95%

### Layer 5: Content
- All sections with glassmorphism cards on top

---

## Components

### Glassmorphism Cards
- `background: rgba(255, 255, 255, 0.04)`
- `backdrop-filter: blur(24px) saturate(160%)`
- `border: 1px solid rgba(255, 255, 255, 0.10)`
- `box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 24px 60px rgba(0, 0, 0, 0.4)`
- `::before` pseudo-element: horizontal light gradient (top shine)
- Hover: border brightens to cyan, glow shadow

### Navigation
- Fixed top bar, transparent by default
- On scroll: glassmorphism blur background
- Brand name in Fira Code
- Nav links: animated underline (scaleX 0→1, cyan)
- CTA button "Hire Me": gradient fill (purple → cyan)
- Mobile: hamburger → X morph, full-screen overlay menu

### Hero Section
- Full viewport height, centered
- Gradient text on name (cyan → purple → pink)
- Typing effect for "AI & Robotics Engineer" (80ms/char)
- Blinking cyan cursor
- Status badge: pulsing green dot + "Available for work"
- Tag pills for key skills
- Social icons (inline SVGs) with hover lift + glow
- Two CTAs: "View Projects" (filled gradient) + "Download CV" (outlined)
- Staggered `heroReveal` animation (translateY 36px → 0)

### Skill Cards
- 6 glass cards, 3-column grid (2-col tablet, 1-col mobile)
- Icon + title + skill list
- Hover: lift 6px, cyan border glow

### Project Cards
- 2-column grid with glass styling
- Project number badge (01, 02, etc.)
- Category badges (color-coded per domain)
- Tech stack tags
- Hover: border glow, subtle lift
- GitHub link icon

### Timeline (Experience & Education)
- Vertical line with colored dots
- Cyan dots for experience, purple for education
- Glass card per entry
- Dot glow shadows

### Contact Section
- 2-column layout: info cards + EmailJS form
- Info cards: email, phone, location with icons
- Form inputs: dark bg, cyan border on focus, Fira Code placeholder
- Submit button: gradient + states (loading/success/error)
- EmailJS integration with placeholder service/template/user IDs (clearly marked with comments)
- Fallback: if EmailJS is not configured or fails to load, form submit opens `mailto:` link with pre-filled subject/body as graceful degradation
- Console warning when placeholder IDs are detected, prompting the user to set up EmailJS

### Footer
- Brand + tagline
- Social icons row
- Copyright text
- Subtle top border gradient

---

## Animations & Interactions

### Page Load
- Hero elements stagger with `heroReveal`:
  - Title (0s), subtitle (0.2s), tags (0.4s), buttons (0.6s), socials (0.8s)
  - Duration: 1.2s ease-out
  - Transform: translateY(36px) → 0, opacity 0 → 1

### Scroll Animations
- `.fade-in` class on section elements
- Intersection Observer, threshold 0.1
- Stagger: `.delay-1` (0.1s), `.delay-2` (0.2s), `.delay-3` (0.3s)
- Transform: translateY(30px) → 0, opacity 0 → 1
- Duration: 0.7s cubic-bezier

### Hover Effects
- Cards: lift 6px, border → cyan, glow shadow
- Buttons: scale 1.03, shadow expands
- Nav links: underline scaleX slide-in
- Social icons: lift 3px, color glow
- Skill items: background brightens

### Micro-animations (continuous)
- Cursor blink: 1.1s loop
- Status dot pulse: 2.4s loop
- Gradient orbs drift: 20-30s loops
- Floating particles: 12-30s per particle

### Form Interaction States
- Empty submit → red warning shake
- Sending → disabled, gray, "Sending..."
- Success → green gradient, "Message Sent!"
- Error → red gradient, "Failed"
- Auto-reset after 3.5s

### Accessibility
- `prefers-reduced-motion`: disable all CSS animations, pause Three.js render loop (show static frame), show content immediately
- Semantic HTML5 elements
- Aria-labels on interactive elements
- Focus-visible states on form inputs and links

---

## Performance

- All CSS animations use `transform` and `opacity` only (GPU composited)
- Passive event listeners for scroll and mousemove
- `requestAnimationFrame` for Three.js render loop
- Intersection Observer disconnects after element is revealed
- Three.js pixel ratio capped at 1.5
- Single geometry per 3D effect type (no GC pressure)

---

## File Structure

```
Souhardya-Portfolio/
├── index.html                          # Restructured with glass cards, canvas, particles
├── css/
│   └── style.css                       # Complete rewrite
├── js/
│   ├── script.js                       # Rewrite: nav, typing, scroll, form, particles
│   └── 3d/
│       ├── script3D_constellation.js   # Default — particle constellation
│       ├── script3D_neural.js          # Neural network visualization
│       ├── script3D_dataflow.js        # Data flow / matrix rain
│       └── script3D_brain.js           # Geometric AI brain
├── assets/                             # Images and icons
├── docs/                               # Design specs
└── .gitignore                          # Add .superpowers/ entry
```

**To swap 3D backgrounds:** Change `<script src="js/3d/script3D_constellation.js">` in `index.html` to any other script path.

---

## External Dependencies

| Dependency | Source | Purpose |
|-----------|--------|---------|
| Three.js r160 | CDN (`cdnjs`) | 3D background effects |
| Space Grotesk | Google Fonts | Headings and body text |
| Fira Code | Google Fonts | Monospace accents |
| EmailJS | CDN | Contact form email delivery |

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|----------------|
| > 1024px | Full desktop: 3-col skills, 2-col projects, 2-col contact |
| 768–1024px | Tablet: 2-col skills, 1-col projects, 1-col contact |
| < 768px | Mobile: 1-col everything, hamburger nav, full-screen menu |

Fluid typography via `clamp()` handles sizes between breakpoints.
