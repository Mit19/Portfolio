# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page dark-themed portfolio website for Souhardya Biswas (AI & Robotics Engineer) using static HTML/CSS/JS with zero dependencies.

**Architecture:** Single `index.html` with linked `css/style.css` and `js/script.js`. CSS custom properties for theming, CSS Grid/Flexbox for layout, Intersection Observer for scroll animations. Fully responsive across mobile/tablet/desktop.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, clamp), vanilla JavaScript

**Spec:** `docs/superpowers/specs/2026-03-18-portfolio-design.md`

---

### Task 1: HTML Structure — All Sections

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with full semantic HTML structure**

All 8 sections (nav, hero, about, skills, experience, education, projects, contact) with proper semantic elements, meta tags, and linked CSS/JS files. Include all resume content inline. Social links use placeholder `#` hrefs for now.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Souhardya Biswas — AI & Robotics Engineer. Portfolio showcasing ML, computer vision, robotics, and NLP projects.">
    <title>Souhardya Biswas | AI & Robotics Engineer</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav>...</nav>
    <section id="hero">...</section>
    <section id="about">...</section>
    <section id="skills">...</section>
    <section id="experience">...</section>
    <section id="education">...</section>
    <section id="projects">...</section>
    <section id="contact">...</section>
    <footer>...</footer>
    <script src="js/script.js"></script>
</body>
</html>
```

Content for each section comes directly from the resume PDF. Featured projects (6): Human-Centred Robot Communication, Vision-Guided Robotic Fruit Sorting, 7-DoF Kinematics, MRI Tissue Segmentation, EKF-SLAM Navigation, Gesture Recognition.

- [ ] **Step 2: Verify HTML renders in browser**

Open `index.html` in browser. All text content should be visible (unstyled). All section anchors should exist.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add HTML structure with all portfolio sections"
```

---

### Task 2: CSS Base — Theme, Typography, Layout

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create style.css with CSS custom properties and base styles**

Define custom properties on `:root`:
```css
:root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #1a1a2e;
    --accent-primary: #00d4ff;
    --accent-secondary: #7b2ff7;
    --text-primary: #e0e0e0;
    --text-muted: #888;
    --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    --max-width: 1200px;
}
```

Add CSS reset, base body styles, section padding, container max-width, smooth scrolling on `html`.

- [ ] **Step 2: Add fluid typography with clamp()**

```css
h1 { font-size: clamp(2rem, 5vw, 4rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); }
h3 { font-size: clamp(1.1rem, 2vw, 1.5rem); }
body { font-size: clamp(0.9rem, 1.5vw, 1.1rem); }
```

Section headings use `var(--font-mono)` with `var(--accent-primary)` color.

- [ ] **Step 3: Verify in browser**

Page should show dark background, cyan headings, light gray text, monospace headings, properly sized on desktop.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS base theme, typography, and layout"
```

---

### Task 3: CSS — Navigation

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Style fixed navbar**

Fixed top, transparent background, transitions to `var(--bg-secondary)` with `backdrop-filter: blur(10px)` when `.scrolled` class is added (JS will handle this). Flex layout for logo + nav links. Links use `var(--text-primary)` with hover underline in `var(--accent-primary)`.

- [ ] **Step 2: Style mobile hamburger menu**

Hide nav links on mobile (< 768px), show hamburger button (3 lines using CSS `span` elements). When `.nav-open` class is on body, slide in full-screen overlay with nav links stacked vertically, centered.

- [ ] **Step 3: Verify both states in browser**

Desktop: horizontal nav links visible. Mobile (resize window): hamburger visible, links hidden.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: style responsive navigation with hamburger menu"
```

---

### Task 4: CSS — Hero Section

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Style hero section**

Full viewport height (`min-height: 100vh`), centered content with flexbox. Dot-grid background using CSS `radial-gradient` repeating pattern. Name in large monospace font. Tagline area with fixed height for typing animation. CTA buttons: primary (filled cyan) and secondary (outlined). Social icons row with hover color transition.

- [ ] **Step 2: Add inline SVG icons for socials in index.html**

Add SVG icons for GitHub, GitLab, LinkedIn, Kaggle in the hero social links. Each icon ~24px, `currentColor` fill for easy theming.

- [ ] **Step 3: Verify in browser**

Hero should fill viewport, dot pattern visible, buttons styled, social icons visible.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: style hero section with dot-grid background and social icons"
```

---

### Task 5: CSS — About & Skills Sections

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Style about section**

Centered text block. Stats displayed as a row of 3 cards with large accent-colored numbers and labels beneath. Cards have `var(--bg-card)` background with subtle border.

- [ ] **Step 2: Style skills section**

CSS Grid for skill category cards (3 columns desktop, 2 tablet, 1 mobile). Each card: `var(--bg-card)` background, category title, and flex-wrapped skill chips/tags. Chips: small rounded pills with border in `var(--accent-primary)`. Card hover: subtle glow using `box-shadow` with accent color.

- [ ] **Step 3: Verify in browser at multiple widths**

About stats in a row on desktop, stacked on mobile. Skill cards reflow correctly.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: style about section stats and skills card grid"
```

---

### Task 6: CSS — Experience & Education Sections

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Style timeline layout**

Vertical line (2px, `var(--accent-primary)`) on the left with circular nodes at each entry. Entry cards offset to the right with `var(--bg-card)` background. Title, company/university, date range, location. Bullet points styled with custom `::marker` or `::before` in accent color.

- [ ] **Step 2: Style education cards**

Same timeline layout. Include CGPA badges and course module tags (similar to skill chips but smaller/muted).

- [ ] **Step 3: Verify in browser**

Timeline line visible, nodes aligned, cards readable on all breakpoints.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: style experience and education timeline sections"
```

---

### Task 7: CSS — Projects & Contact Sections

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Style project cards grid**

CSS Grid: 2 columns on tablet+, 1 on mobile. Cards: `var(--bg-card)` background, padding, border-radius. Project title, description, tech tags (small pills), key metric highlighted in accent color. Hover: `translateY(-4px)` lift with increased box-shadow.

- [ ] **Step 2: Style contact section**

Centered layout. Email/phone/location as icon + text rows. Social links repeated. Subtle top border or different background shade to separate from projects.

- [ ] **Step 3: Style footer**

Simple centered text, small font, muted color. Copyright line.

- [ ] **Step 4: Verify all sections in browser**

Full page scroll should flow naturally through all sections.

- [ ] **Step 5: Commit**

```bash
git add css/style.css
git commit -m "feat: style projects grid, contact section, and footer"
```

---

### Task 8: CSS — Scroll Animations & Transitions

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add animation classes**

```css
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

Add `prefers-reduced-motion` media query that disables all transitions/animations.

- [ ] **Step 2: Add typing cursor animation**

```css
.typing-cursor {
    display: inline-block;
    width: 3px;
    background: var(--accent-primary);
    animation: blink 1s step-end infinite;
}
@keyframes blink {
    50% { opacity: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add scroll fade-in animations and typing cursor"
```

---

### Task 9: JavaScript — Nav Scroll & Hamburger

**Files:**
- Create: `js/script.js`

- [ ] **Step 1: Create script.js with navbar scroll behavior**

Listen for `scroll` event. When `window.scrollY > 50`, add `.scrolled` class to nav. Remove when back to top.

- [ ] **Step 2: Add hamburger toggle**

Click handler on hamburger button: toggle `.nav-open` on body. Close menu when a nav link is clicked. Close on click outside.

- [ ] **Step 3: Add smooth scroll for nav links**

Click handler on nav links: `preventDefault()`, get target section from `href`, `scrollIntoView({ behavior: 'smooth' })`.

- [ ] **Step 4: Verify in browser**

Nav darkens on scroll. Hamburger opens/closes on mobile. Links smooth-scroll to sections.

- [ ] **Step 5: Commit**

```bash
git add js/script.js
git commit -m "feat: add nav scroll behavior, hamburger toggle, and smooth scroll"
```

---

### Task 10: JavaScript — Typing Effect & Scroll Animations

**Files:**
- Modify: `js/script.js`

- [ ] **Step 1: Add typing effect for hero tagline**

Type out "AI & Robotics Engineer" character by character (~80ms per char). After completion, leave blinking cursor. Respect `prefers-reduced-motion` — if enabled, show text immediately.

- [ ] **Step 2: Add Intersection Observer for fade-in**

Observe all `.fade-in` elements. When they enter viewport (threshold 0.1), add `.visible` class. `once: true` so animation only plays once.

- [ ] **Step 3: Verify in browser**

Typing effect plays on load. Sections fade in as you scroll down. Disable motion in OS settings and verify instant display.

- [ ] **Step 4: Commit**

```bash
git add js/script.js
git commit -m "feat: add typing effect and scroll-triggered fade-in animations"
```

---

### Task 11: Responsive Polish & Final Review

**Files:**
- Modify: `css/style.css`
- Modify: `index.html` (if needed)

- [ ] **Step 1: Test and fix mobile layout (< 768px)**

Verify: hamburger works, hero text readable, stat cards stack, skill cards single column, timeline readable, project cards single column, contact centered. Fix any overflow or spacing issues.

- [ ] **Step 2: Test and fix tablet layout (768px - 1024px)**

Verify: nav visible, project cards 2-column, skill cards 2-column, appropriate spacing.

- [ ] **Step 3: Test and fix desktop layout (> 1024px)**

Verify: max-width container centered, all grids at full column count, comfortable whitespace.

- [ ] **Step 4: Add active nav link highlighting**

In `js/script.js`, use Intersection Observer on sections to highlight the current section's nav link as user scrolls.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: responsive polish and active nav highlighting"
```
