# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a basic flat design into an immersive, AI-themed experience with glassmorphism, 3D backgrounds, particle effects, and rich animations.

**Architecture:** Complete CSS/JS rewrite with HTML restructuring. Three.js loaded via CDN for 4 swappable 3D backgrounds. CSS handles glassmorphism, gradient orbs, grid overlay, floating particles, and all animations. Main JS handles nav, typing effect, scroll animations, particle creation, and EmailJS contact form.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, clamp), vanilla JS, Three.js r160 (CDN), Google Fonts (Space Grotesk, Fira Code), EmailJS (CDN)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `CLAUDE.md` | Modify | Update dependency policy |
| `.gitignore` | Create/Modify | Add `.superpowers/` entry |
| `css/style.css` | Rewrite | Complete CSS rewrite — new colors, typography, glassmorphism, animations, responsive |
| `index.html` | Restructure | Add canvas, particle container, gradient orbs, grid overlay, glass card markup, contact form, CDN scripts |
| `js/script.js` | Rewrite | Nav, typing, scroll animations, floating particles, EmailJS form, reduced-motion |
| `js/3d/script3D_constellation.js` | Create | Default 3D background — particle constellation |
| `js/3d/script3D_neural.js` | Create | Neural network visualization |
| `js/3d/script3D_dataflow.js` | Create | Data flow / matrix rain effect |
| `js/3d/script3D_brain.js` | Create | Geometric AI brain |

---

### Task 1: Update Project Config (CLAUDE.md, .gitignore)

**Files:**
- Modify: `CLAUDE.md`
- Create/Modify: `.gitignore`

- [ ] **Step 1: Update CLAUDE.md dependency policy**

In `CLAUDE.md`, change the "Tech Stack" and "Conventions" sections:

```markdown
## Tech Stack
- HTML5, CSS3 (custom properties, grid, flexbox, backdrop-filter), vanilla JavaScript
- Three.js r160 (CDN) for 3D background effects
- Google Fonts: Space Grotesk, Fira Code
- EmailJS (CDN) for contact form
- No frameworks, no build tools

## Conventions
- CDN dependencies allowed for: Three.js, Google Fonts, EmailJS only
- Inline SVGs for social icons
- Semantic HTML5 elements
- BEM-like CSS class naming
- CSS custom properties for theming
```

- [ ] **Step 2: Create/update .gitignore**

```
.superpowers/
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md .gitignore
git commit -m "chore: update dependency policy and add .gitignore"
```

---

### Task 2: Rewrite CSS — Custom Properties, Reset, Typography, Base

**Files:**
- Rewrite: `css/style.css` (lines 1–87 of current file — replace entire file)

This task writes the first portion of the new CSS. The file will be built incrementally across Tasks 2–5, each appending sections.

- [ ] **Step 1: Write CSS custom properties, reset, base, and typography**

Replace the entire `css/style.css` with:

```css
/* ==========================================================================
   Souhardya Biswas — Portfolio Stylesheet (Redesign)
   ========================================================================== */

/* ---- CSS Custom Properties ---- */
:root {
    --bg-deep: #050510;
    --bg-card: #0a0a1a;
    --accent-cyan: #00e5ff;
    --accent-purple: #8b5cf6;
    --accent-pink: #ff2d7b;
    --text-primary: #f0eeff;
    --text-muted: rgba(240, 238, 255, 0.45);
    --glass-bg: rgba(255, 255, 255, 0.04);
    --glass-border: rgba(255, 255, 255, 0.10);
    --font-body: 'Space Grotesk', sans-serif;
    --font-mono: 'Fira Code', monospace;
    --max-width: 1200px;
}

/* ---- Reset ---- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
    background-color: var(--bg-deep);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; }
h3 { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 700; }

a { color: inherit; text-decoration: none; }
ul { list-style: none; }
img { max-width: 100%; display: block; }

.container {
    max-width: var(--max-width);
    margin-inline: auto;
    padding-inline: 20px;
}

section { padding: 100px 0; position: relative; z-index: 2; }

/* ---- Section Headings ---- */
.section-heading {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-align: center;
    margin-bottom: 48px;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-heading::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-cyan), transparent);
    margin: 16px auto 0;
}

/* ---- Glassmorphism Card ---- */
.glass-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 24px 60px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    pointer-events: none;
}

.glass-card:hover {
    border-color: rgba(0, 229, 255, 0.3);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 0 30px rgba(0, 229, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 2: Verify the file renders** — open `index.html` in a browser. The page should show new colors (dark blue-black background, light text) but layout will be broken since HTML hasn't been updated yet. That's expected.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: rewrite CSS base — new color system, typography, glassmorphism"
```

---

### Task 3: CSS — Background Layers (Gradient Orbs, Grid, Particles, Canvas)

**Files:**
- Modify: `css/style.css` (append to file)

- [ ] **Step 1: Add background layer styles**

Append to `css/style.css`:

```css
/* ==========================================================================
   Background Layers
   ========================================================================== */

/* Layer 1: Three.js Canvas */
#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

/* Layer 2: Gradient Orbs */
.gradient-orbs {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.25;
}

.gradient-orb--cyan {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, var(--accent-cyan), transparent 70%);
    top: -10%;
    right: -5%;
    animation: drift-1 25s ease-in-out infinite;
}

.gradient-orb--purple {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--accent-purple), transparent 70%);
    bottom: -15%;
    left: -10%;
    animation: drift-2 30s ease-in-out infinite;
}

.gradient-orb--pink {
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, var(--accent-pink), transparent 70%);
    top: 40%;
    left: 50%;
    animation: drift-3 20s ease-in-out infinite;
}

@keyframes drift-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-40px, 30px) scale(1.06); }
    66% { transform: translate(30px, -20px) scale(0.96); }
}

@keyframes drift-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -40px) scale(0.95); }
    66% { transform: translate(-20px, 30px) scale(1.05); }
}

@keyframes drift-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, -30px) scale(1.04); }
    66% { transform: translate(40px, 20px) scale(0.97); }
}

/* Layer 3: Grid Overlay */
.grid-overlay {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

/* Layer 4: Floating Particles */
.particles-container {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    border-radius: 50%;
    background: var(--accent-cyan);
    opacity: 0;
    animation: pfloat linear infinite;
}

@keyframes pfloat {
    0% { transform: translateY(100vh); opacity: 0; }
    5% { opacity: 0.6; }
    95% { opacity: 0.6; }
    100% { transform: translateY(-10vh); opacity: 0; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS for background layers — orbs, grid, particles, canvas"
```

---

### Task 4: CSS — Navigation, Hero, Buttons

**Files:**
- Modify: `css/style.css` (append to file)

- [ ] **Step 1: Add navigation styles**

Append to `css/style.css`:

```css
/* ==========================================================================
   Navigation
   ========================================================================== */
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: transparent;
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
    padding: 16px 0;
}

nav.scrolled {
    background: rgba(5, 5, 16, 0.85);
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    border-bottom: 1px solid var(--glass-border);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--accent-cyan);
}

.nav-links {
    display: flex;
    gap: 28px;
    align-items: center;
}

.nav-links a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    transition: color 0.25s ease;
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--accent-cyan);
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--text-primary);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
    left: 0;
}

.nav-cta {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 8px 20px;
    border-radius: 6px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
    color: var(--bg-deep);
    font-weight: 700;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-cta:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

/* Hamburger */
.hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-direction: column;
    gap: 5px;
    z-index: 1001;
}

.hamburger span {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--text-primary);
    transition: transform 0.3s ease, opacity 0.3s ease;
}

body.nav-open .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
body.nav-open .hamburger span:nth-child(2) { opacity: 0; }
body.nav-open .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile Menu Overlay */
.mobile-menu {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(5, 5, 16, 0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 999;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

body.nav-open .mobile-menu {
    opacity: 1;
    pointer-events: auto;
}

.mobile-menu a {
    font-family: var(--font-mono);
    font-size: 1.3rem;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    transition: color 0.25s ease;
}

.mobile-menu a:hover { color: var(--accent-cyan); }

/* ==========================================================================
   Hero Section
   ========================================================================== */
#hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
}

.hero-card {
    text-align: center;
    padding: 56px 40px;
    max-width: 750px;
    margin: 0 auto;
}

.hero-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #00ffa3;
    margin-bottom: 24px;
    padding: 6px 16px;
    border: 1px solid rgba(0, 255, 163, 0.2);
    border-radius: 20px;
    background: rgba(0, 255, 163, 0.05);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ffa3;
    animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
}

.hero-name {
    font-family: var(--font-mono);
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
}

.hero-name-wrapper {
    min-height: 1.2em;
}

.tagline {
    min-height: 2em;
    font-family: var(--font-mono);
    color: var(--accent-cyan);
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    margin-bottom: 24px;
}

.typing-cursor {
    display: inline-block;
    width: 3px;
    height: 1em;
    background: var(--accent-cyan);
    animation: blink 1.1s step-end infinite;
    vertical-align: middle;
    margin-left: 2px;
}

@keyframes blink { 50% { opacity: 0; } }

.hero-divider {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
    margin: 0 auto 20px;
}

.hero-summary {
    max-width: 600px;
    margin: 0 auto 28px;
    color: var(--text-muted);
    line-height: 1.7;
}

.hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 28px;
}

.hero-tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 4px 14px;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    color: var(--text-muted);
    background: var(--glass-bg);
}

/* Buttons */
.cta-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 28px;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: none;
}

.btn-primary {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
    color: var(--bg-deep);
}

.btn-primary:hover {
    transform: scale(1.03);
    box-shadow: 0 0 24px rgba(139, 92, 246, 0.3), 0 0 48px rgba(0, 229, 255, 0.15);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
}

.btn-secondary:hover {
    border-color: var(--accent-cyan);
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.1);
    transform: scale(1.03);
}

.btn-arrow {
    transition: transform 0.2s ease;
}

.btn:hover .btn-arrow { transform: translateX(4px); }

/* Social Links */
.social-links {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 16px;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-muted);
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.social-links a:hover {
    color: var(--accent-cyan);
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 229, 255, 0.15);
}

/* Hero Reveal Animation */
.hero-reveal {
    opacity: 0;
    transform: translateY(36px);
    animation: heroReveal 1.2s ease-out forwards;
}

.hero-reveal.delay-1 { animation-delay: 0.2s; }
.hero-reveal.delay-2 { animation-delay: 0.4s; }
.hero-reveal.delay-3 { animation-delay: 0.6s; }
.hero-reveal.delay-4 { animation-delay: 0.8s; }

@keyframes heroReveal {
    to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS for navigation, hero section, buttons, and hero animations"
```

---

### Task 5: CSS — Content Sections, Contact Form, Footer, Responsive, Reduced Motion

**Files:**
- Modify: `css/style.css` (append to file)

- [ ] **Step 1: Add about, skills, timeline, projects styles**

Append to `css/style.css`:

```css
/* ==========================================================================
   About Section
   ========================================================================== */
.about-text {
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
    text-align: center;
    color: var(--text-muted);
}

.stats-row {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 40px;
    flex-wrap: wrap;
}

.stat-item {
    padding: 28px 36px;
    text-align: center;
    min-width: 160px;
}

.stat-number {
    display: block;
    font-size: 2.2rem;
    font-family: var(--font-mono);
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    display: block;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 6px;
}

/* ==========================================================================
   Skills Section
   ========================================================================== */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.skill-card {
    padding: 28px;
}

.skill-card:hover {
    transform: translateY(-6px);
}

.skill-category {
    font-family: var(--font-mono);
    color: var(--accent-cyan);
    margin-bottom: 16px;
    font-size: 1rem;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-chip {
    font-size: 0.78rem;
    padding: 4px 12px;
    border: 1px solid rgba(0, 229, 255, 0.2);
    border-radius: 20px;
    color: var(--text-muted);
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.skill-chip:hover {
    border-color: rgba(0, 229, 255, 0.5);
    color: var(--text-primary);
    background: rgba(0, 229, 255, 0.05);
}

/* ==========================================================================
   Timeline (Experience & Education)
   ========================================================================== */
.timeline {
    position: relative;
    padding-left: 36px;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple), transparent);
}

.timeline-entry {
    position: relative;
    margin-bottom: 32px;
}

.timeline-entry:last-child { margin-bottom: 0; }

.timeline-marker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    left: -36px;
    top: 28px;
}

#experience .timeline-marker {
    background: var(--accent-cyan);
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.4);
}

#education .timeline-marker {
    background: var(--accent-purple);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
}

.timeline-content {
    padding: 24px;
}

.timeline-title {
    font-family: var(--font-mono);
    margin-bottom: 6px;
    color: var(--text-primary);
}

.timeline-company,
.timeline-institution {
    display: block;
    color: var(--accent-cyan);
    font-size: 0.9rem;
    margin-bottom: 4px;
}

.timeline-date {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    margin-right: 16px;
}

.timeline-location {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    float: right;
}

.timeline-details { margin-top: 12px; }

.timeline-details li {
    margin-bottom: 8px;
    padding-left: 18px;
    position: relative;
    color: var(--text-muted);
    line-height: 1.6;
}

.timeline-details li::before {
    content: '\25B8';
    position: absolute;
    left: 0;
    color: var(--accent-cyan);
}

.cgpa-badge {
    display: inline-block;
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 3px 12px;
    border-radius: 12px;
    margin-top: 4px;
    border: 1px solid rgba(139, 92, 246, 0.2);
}

.module-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
}

.module-tag {
    font-size: 0.72rem;
    padding: 3px 10px;
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 16px;
    color: var(--text-muted);
}

/* ==========================================================================
   Projects Section
   ========================================================================== */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.project-card {
    padding: 28px;
}

.project-card:hover {
    transform: translateY(-4px);
}

.project-number {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-purple);
    opacity: 0.6;
    margin-bottom: 8px;
    display: block;
}

.project-title {
    font-family: var(--font-mono);
    margin-bottom: 12px;
    font-size: 1.1rem;
}

.project-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
}

.project-badge {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 3px 10px;
    border-radius: 4px;
    font-weight: 500;
}

.project-badge--cv {
    background: rgba(0, 229, 255, 0.1);
    color: var(--accent-cyan);
    border: 1px solid rgba(0, 229, 255, 0.2);
}

.project-badge--robotics {
    background: rgba(139, 92, 246, 0.1);
    color: var(--accent-purple);
    border: 1px solid rgba(139, 92, 246, 0.2);
}

.project-badge--nlp {
    background: rgba(255, 45, 123, 0.1);
    color: var(--accent-pink);
    border: 1px solid rgba(255, 45, 123, 0.2);
}

.project-badge--research {
    background: rgba(0, 255, 163, 0.1);
    color: #00ffa3;
    border: 1px solid rgba(0, 255, 163, 0.2);
}

.project-badge--ml {
    background: rgba(255, 200, 0, 0.1);
    color: #ffc800;
    border: 1px solid rgba(255, 200, 0, 0.2);
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.tech-tag {
    font-size: 0.72rem;
    padding: 3px 10px;
    border: 1px solid rgba(0, 229, 255, 0.2);
    border-radius: 20px;
    color: var(--text-muted);
}

.project-details li {
    margin-bottom: 8px;
    padding-left: 18px;
    position: relative;
    color: var(--text-muted);
    line-height: 1.6;
}

.project-details li::before {
    content: '\25B8';
    position: absolute;
    left: 0;
    color: var(--accent-cyan);
}

.project-metric {
    display: block;
    margin-top: 12px;
    color: var(--accent-cyan);
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.85rem;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: color 0.2s ease;
}

.project-link:hover { color: var(--accent-cyan); }

/* ==========================================================================
   Publications Section (reuses project card styling)
   ========================================================================== */
.publications-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.publication-card { padding: 28px; }
.publication-card:hover { transform: translateY(-4px); }

.publication-title {
    font-family: var(--font-mono);
    font-size: 1rem;
    margin-bottom: 8px;
}

.publication-venue {
    color: var(--accent-purple);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    margin-bottom: 8px;
}

.publication-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--accent-cyan);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: color 0.2s ease;
}

/* Focus-visible accessibility */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
}
```

- [ ] **Step 2: Add contact form, footer, scroll animations, reduced motion, and responsive styles**

Append to `css/style.css`:

```css
/* ==========================================================================
   Contact Section
   ========================================================================== */
#contact {
    text-align: left;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
}

.contact-info-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.contact-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
}

.contact-icon {
    font-size: 1.5rem;
    color: var(--accent-cyan);
    min-width: 40px;
    text-align: center;
}

.contact-card a {
    color: var(--text-primary);
    transition: color 0.2s ease;
}

.contact-card a:hover { color: var(--accent-cyan); }

.contact-card span.contact-label {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 2px;
}

/* Contact Form */
.contact-form {
    padding: 32px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: border-color 0.3s ease, background 0.3s ease;
    outline: none;
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--accent-cyan);
    background: rgba(0, 229, 255, 0.03);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: rgba(240, 238, 255, 0.2);
}

.btn-submit {
    width: 100%;
    padding: 14px;
    font-size: 0.85rem;
    border: none;
    cursor: pointer;
}

.btn-submit.sending {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-muted);
    pointer-events: none;
}

.btn-submit.success {
    background: linear-gradient(135deg, #00ffa3, #00cc82);
    color: var(--bg-deep);
}

.btn-submit.error {
    background: linear-gradient(135deg, #ff2d7b, #ff0044);
    color: white;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.btn-submit.shake {
    animation: shake 0.5s ease;
}

/* Contact Social Links */
.contact-socials {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

/* ==========================================================================
   Footer
   ========================================================================== */
footer {
    position: relative;
    z-index: 2;
    padding: 40px 0;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.8rem;
}

footer::before {
    content: '';
    display: block;
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
    margin: 0 auto 32px;
}

.footer-brand {
    font-family: var(--font-mono);
    color: var(--accent-cyan);
    font-size: 1rem;
    margin-bottom: 8px;
}

.footer-tagline {
    color: var(--text-muted);
    margin-bottom: 20px;
    font-size: 0.85rem;
}

.footer-socials {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 24px;
}

.footer-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    color: var(--text-muted);
    transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.footer-socials a:hover {
    color: var(--accent-cyan);
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-2px);
}

/* ==========================================================================
   Scroll Animations
   ========================================================================== */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in.visible { opacity: 1; transform: translateY(0); }
.fade-in.delay-1 { transition-delay: 0.1s; }
.fade-in.delay-2 { transition-delay: 0.2s; }
.fade-in.delay-3 { transition-delay: 0.3s; }

/* ==========================================================================
   Reduced Motion
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        transition: none !important;
        animation: none !important;
    }
    html { scroll-behavior: auto; }
    .fade-in, .hero-reveal { opacity: 1; transform: none; }
    .particle { display: none; }
    .gradient-orb { animation: none; }
}

/* ==========================================================================
   Responsive — Tablet
   ========================================================================== */
@media (max-width: 1024px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
}

/* ==========================================================================
   Responsive — Mobile
   ========================================================================== */
@media (max-width: 767px) {
    section { padding: 60px 0; }

    .hamburger { display: flex; }
    .mobile-menu { display: flex; }

    .nav-links { display: none; }

    .skills-grid { grid-template-columns: 1fr; }

    .hero-card { padding: 40px 20px; }

    .stats-row {
        flex-direction: column;
        align-items: center;
    }

    .stat-item { width: 100%; max-width: 260px; }

    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }

    .timeline-location {
        float: none;
        display: block;
    }

    .contact-grid { grid-template-columns: 1fr; }

    .footer-socials { flex-wrap: wrap; justify-content: center; }
}
```

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS for all content sections, contact form, footer, responsive, and reduced motion"
```

---

### Task 6: Restructure HTML

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Rewrite index.html with new markup**

Rewrite `index.html` with these changes (preserving all existing content/text):

1. Add Google Fonts and EmailJS CDN links in `<head>`
2. Add Three.js CDN script before closing `</body>`
3. Add background layer elements after `<body>`: canvas (`#bg-canvas`), gradient orbs, grid overlay, particles container
4. Add mobile menu overlay (`<div class="mobile-menu">`) with same nav links
5. Add "Hire Me" CTA button in nav
6. Restructure hero: wrap in `.hero-card.glass-card`, add `.hero-status` badge, add `.hero-name` with gradient, add `.hero-divider`, add `.hero-tags`, add hero-reveal animation classes
7. Wrap all stat items, skill cards, timeline content, project cards in `.glass-card` class
8. Add `.project-number` and `.project-badge` elements to each project card
9. Restructure contact section: 2-column grid with info cards + EmailJS form
10. Restructure footer: brand, tagline, social icons, copyright
11. Add `<script src="js/3d/script3D_constellation.js"></script>` before `</body>` (after Three.js CDN)
12. Add stagger `.fade-in .delay-N` classes to section children

The full HTML content from the current file must be preserved — only markup structure changes.

**Important details:**
- Add `aria-label` attributes to hamburger button, all social links, and form inputs
- Add a Publications section between Projects and Contact using `.publications-grid` > `.publication-card.glass-card` markup
- Ensure all interactive elements have appropriate focus-visible support

- [ ] **Step 2: Open in browser and verify** — page should render with glassmorphism cards, new colors, gradient orbs visible. 3D background won't work yet (script not created).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: restructure HTML — glass cards, background layers, contact form, hero redesign"
```

---

### Task 7: Rewrite Main JavaScript

**Files:**
- Rewrite: `js/script.js`

- [ ] **Step 1: Rewrite js/script.js**

Complete rewrite with these features:

1. **Navbar scroll behavior** — add `.scrolled` class on scroll > 50px (passive listener)
2. **Hamburger toggle** — toggle `body.nav-open`, close on link click, close on outside click
3. **Smooth scroll** — for nav links and CTA buttons with `#` hrefs
4. **Typing effect** — type "AI & Robotics Engineer" at 80ms/char, blink cursor, respects `prefers-reduced-motion`
5. **Scroll fade-in** — Intersection Observer (threshold 0.1) adds `.visible` to `.fade-in` elements, unobserves after
6. **Active nav link** — Intersection Observer on sections, highlights matching nav link
7. **Floating particles** — create 28 particle elements in `.particles-container`, random size (1-3.5px), random duration (12-30s), random delay, random horizontal position
8. **EmailJS contact form** — initialize with placeholder IDs (clearly commented), validate fields, send email, handle states (sending/success/error), auto-reset after 3.5s. **Fallback:** if EmailJS not loaded or placeholder IDs detected, open `mailto:` with pre-filled body. Console.warn for placeholder IDs.
9. **Reduced motion** — check `prefers-reduced-motion`, skip all animations, show content immediately, pause Three.js if available

- [ ] **Step 2: Open in browser and verify** — nav works, typing works, scroll animations work, particles float, form renders

- [ ] **Step 3: Commit**

```bash
git add js/script.js
git commit -m "feat: rewrite JS — nav, typing, scroll, particles, EmailJS form"
```

---

### Task 8: Create 3D Background — Particle Constellation (Default)

**Files:**
- Create: `js/3d/script3D_constellation.js`

- [ ] **Step 1: Create the constellation background script**

Create `js/3d/script3D_constellation.js` using Three.js:

- Initialize scene, camera (PerspectiveCamera, fov 75), renderer (alpha: true, antialias: false)
- Renderer: `setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`, `setSize(window.innerWidth, window.innerHeight)`
- Attach to `#bg-canvas` element
- Create 200+ particles using `BufferGeometry` with `Float32Array` for positions
- Random positions in 3D space (spread: -50 to 50 on each axis)
- Use `PointsMaterial` with cyan color, size 2, transparent, opacity 0.8
- **Connection lines:** On each frame, calculate distances between nearby particles (< threshold ~8 units). Draw lines between them using `LineSegments` with `LineBasicMaterial` (cyan, transparent, opacity based on distance)
- **Animation:** Particles drift slowly (small velocity per particle, bounce off boundaries)
- **Mouse parallax:** Track mouse position, move camera slightly (0.03 easing)
- **Resize handler:** Update camera aspect and renderer size on window resize
- **Reduced motion:** Check `prefers-reduced-motion`, render one frame then stop animation loop
- Performance: use single `BufferGeometry` for lines, update positions in place, no GC pressure

- [ ] **Step 2: Open in browser** — should see floating particles forming constellation connections on dark background

- [ ] **Step 3: Commit**

```bash
git add js/3d/script3D_constellation.js
git commit -m "feat: add particle constellation 3D background (default)"
```

---

### Task 9: Create 3D Background — Neural Network

**Files:**
- Create: `js/3d/script3D_neural.js`

- [ ] **Step 1: Create neural network visualization**

Create `js/3d/script3D_neural.js`:

- 60 floating `OctahedronGeometry` nodes (radius 0.3) with wireframe material (cyan, purple mix)
- Nodes bounce around in bounded 3D space with random velocities
- Dynamic connection lines between nodes closer than threshold (~12 units)
- Line opacity fades with distance
- 2 rotating `TorusGeometry` rings around the network (one cyan, one purple)
- Mouse parallax on camera
- Single `BufferGeometry` for connection lines (pre-allocated, update positions each frame)
- Resize handler, reduced motion support

- [ ] **Step 2: Test by swapping script src in index.html**

- [ ] **Step 3: Commit**

```bash
git add js/3d/script3D_neural.js
git commit -m "feat: add neural network 3D background"
```

---

### Task 10: Create 3D Background — Data Flow

**Files:**
- Create: `js/3d/script3D_dataflow.js`

- [ ] **Step 1: Create data flow visualization**

Create `js/3d/script3D_dataflow.js`:

- Streams of 500+ particles flowing through 3D space along the Z axis
- Particles have glowing trail effect (use `PointsMaterial` with additive blending)
- 3 color streams: cyan, purple, pink — each following slightly different paths
- Particles reset to far Z when they pass the camera
- Subtle sinusoidal wave movement on X/Y as particles flow
- Speed variation per particle for depth
- Mouse parallax on camera
- Background starfield (100 dim white points)
- Resize handler, reduced motion support

- [ ] **Step 2: Test by swapping script src in index.html**

- [ ] **Step 3: Commit**

```bash
git add js/3d/script3D_dataflow.js
git commit -m "feat: add data flow 3D background"
```

---

### Task 11: Create 3D Background — Geometric AI Brain

**Files:**
- Create: `js/3d/script3D_brain.js`

- [ ] **Step 1: Create geometric brain visualization**

Create `js/3d/script3D_brain.js`:

- Create a brain-like shape using `IcosahedronGeometry` (radius 8, detail 2) with wireframe material
- Slowly rotating on Y and X axes
- 100 small particles orbiting around the brain shape at various radii and speeds
- Particles glow (additive blending, cyan/purple/pink colors)
- Occasional "synapse fire" effect — random edges brighten momentarily
- Mouse parallax on camera
- Background: sparse starfield
- Resize handler, reduced motion support

- [ ] **Step 2: Test by swapping script src in index.html**

- [ ] **Step 3: Commit**

```bash
git add js/3d/script3D_brain.js
git commit -m "feat: add geometric AI brain 3D background"
```

---

### Task 12: Final Polish & Verification

**Files:**
- All files (review pass)

- [ ] **Step 1: Open portfolio in browser at desktop width** — verify all 8 sections render correctly, glassmorphism visible, animations work, 3D background runs

- [ ] **Step 2: Test responsive** — resize to tablet (768-1024px) and mobile (<768px), verify layout changes, hamburger menu works

- [ ] **Step 3: Test all 4 3D backgrounds** — swap script src in `index.html` to each of the 4 scripts, verify each renders

- [ ] **Step 4: Test reduced motion** — enable `prefers-reduced-motion` in browser dev tools, verify no animations play, content visible immediately, Three.js shows static frame

- [ ] **Step 5: Test contact form** — verify form renders, placeholder ID warning in console, fallback mailto behavior works

- [ ] **Step 6: Fix any visual issues found during testing**

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — glassmorphism, 3D backgrounds, particle effects"
```
