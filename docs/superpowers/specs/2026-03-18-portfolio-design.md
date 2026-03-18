# Portfolio Website Design — Souhardya Biswas

## Overview
Single-page portfolio website for Souhardya Biswas, an AI & Robotics engineer. Built with static HTML/CSS/JS (zero dependencies). Dark techy aesthetic with subtle scroll animations.

## Tech Stack
- HTML5, CSS3 (custom properties, grid, flexbox, clamp), vanilla JavaScript
- No frameworks, no build tools, no external dependencies
- Deployable on GitHub Pages or any static host

## File Structure
```
E:\Souhardya-Portfolio\
├── index.html          # All sections
├── css/style.css       # Theming, layout, animations, responsive
├── js/script.js        # Scroll animations, nav, interactions
├── assets/             # Future images/icons
├── CLAUDE.md           # Project conventions
└── AIandML.pdf         # Source resume
```

## Color Scheme
- Background: #0a0a0f (dark)
- Primary accent: #00d4ff (cyan/electric-blue)
- Secondary accent: #7b2ff7 (purple)
- Text: #e0e0e0 (light gray)
- Text muted: #888

## Typography
- System font stack for body text
- Monospace accents on headings/labels for techy feel
- Fluid font sizes using `clamp()` for responsive scaling

## Sections (in order)

### 1. Navigation
- Fixed top navbar, transparent until scrolled (then dark bg with blur)
- Smooth-scroll links to each section
- Hamburger menu on mobile with slide-in overlay

### 2. Hero
- Full viewport height
- Name in large monospace font
- Animated typing effect for tagline: "AI & Robotics Engineer"
- Subtle grid/dot-pattern background
- CTA buttons: "View Projects" and "Contact Me"
- Social links: GitHub, GitLab, LinkedIn, Kaggle (inline SVG icons)

### 3. About
- Brief summary from resume
- Key stats in accent-colored counters: 3+ years experience, 2 Master's degrees, 14+ projects
- Location: Birmingham, UK

### 4. Skills
- Grouped into 6 categories: ML/DL, Computer Vision, NLP, Robotics, MLOps, Programming
- Each category as a card with skill tags/chips
- Hover glow effect on cards

### 5. Experience
- Vertical timeline layout (left-aligned on all screen sizes)
- Two entries:
  - Dhibar InfoTech — AI Researcher, Web Developer (Jul '23 - Aug '24, Kolkata)
  - TEAMCOGNITO — RnD Intern (Jun '21 - Aug '21, Kolkata)
- Bullet points fade in on scroll

### 6. Education
- Timeline/card layout matching experience section
- Three degrees:
  - M.Sc. Robotics — University of Birmingham (Sep '24 - Present)
  - M.Sc. ML & AI — LJMU / IIIT Bangalore (Oct '23 - Present, CGPA 3.58/4)
  - BCA — MAKAUT (Sep '20 - Jul '23, CGPA 8.5/10)
- Key course highlights per degree

### 7. Featured Projects (6 curated)
- Grid: 2 columns desktop/tablet, 1 column mobile
- Each card: title, tech tags, key metric/achievement, hover lift effect
- Projects:
  1. Human-Centred Robot Communication (Ongoing) — multi-modal HRI research
  2. Vision-Guided Robotic Fruit Sorting — mAP 95%, 12 items/min
  3. 7-DoF Kinematics & Trajectory Planning — < 2mm RMS error
  4. MRI Tissue Segmentation (2D & 3D) — Dice > 0.96
  5. EKF-SLAM Navigation in Webots — ±5cm map accuracy
  6. Gesture Recognition for Smart-TV — 93% Top-1 accuracy

### 8. Contact
- Email, phone, location
- Social links repeated
- Simple clean layout

## Animations & Interactions
- Fade-in on scroll (Intersection Observer API)
- Smooth section transitions
- Hover effects: glow on skill cards, lift on project cards
- Typing effect on hero tagline
- Navbar background transition on scroll
- All animations respect `prefers-reduced-motion`

## Responsive Breakpoints
- **Mobile** (< 768px): Single column, hamburger nav, stacked CTAs, reduced font sizes
- **Tablet** (768px - 1024px): 2-column project grid, visible nav
- **Desktop** (> 1024px): Full layout, 2-column grid, max-width 1200px container

## Key Responsive Behaviors
- Nav collapses to hamburger with slide-in overlay on mobile
- Hero text scales down, CTA buttons stack vertically on mobile
- Skill cards: multi-column grid to single column on mobile
- Project cards: 2 columns tablet+, 1 column mobile
- Timeline left-aligned on all sizes
- Font sizes use `clamp()` for fluid scaling
