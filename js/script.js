/* ============================================================
   Souhardya Biswas — Portfolio Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. Navbar Scroll Behavior
     ---------------------------------------------------------- */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     2. Hamburger Toggle
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });

  // Close menu when clicking outside nav
  document.addEventListener('click', (e) => {
    if (
      document.body.classList.contains('nav-open') &&
      !e.target.closest('nav')
    ) {
      document.body.classList.remove('nav-open');
    }
  });

  /* ----------------------------------------------------------
     3. Smooth Scroll for Nav Links
     ---------------------------------------------------------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Also handle hero CTA buttons that link to sections
  document.querySelectorAll('.cta-buttons a').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     4. Typing Effect for Hero Tagline
     ---------------------------------------------------------- */
  const typingText = document.querySelector('.typing-text');
  const textToType = 'AI & Robotics Engineer';

  if (typingText) {
    if (prefersReducedMotion) {
      // Show text immediately — no animation
      typingText.textContent = textToType;
    } else {
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        if (charIndex >= textToType.length) {
          clearInterval(typeInterval);
        }
      }, 80);
    }
  }

  /* ----------------------------------------------------------
     5. Intersection Observer for Scroll Fade-In
     ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (prefersReducedMotion) {
    // Show everything immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  } else {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* ----------------------------------------------------------
     6. Active Nav Link Highlighting
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));

});
