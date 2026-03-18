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

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     2. Hamburger Toggle
     ---------------------------------------------------------- */
  const hamburger    = document.querySelector('.hamburger');
  const mobileMenu   = document.querySelector('.mobile-menu');
  const mobileLinks  = document.querySelectorAll('.mobile-menu a');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }

  // Close on mobile menu link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });

  // Close on click outside nav and mobile menu
  document.addEventListener('click', (e) => {
    if (
      document.body.classList.contains('nav-open') &&
      !e.target.closest('nav') &&
      !e.target.closest('.mobile-menu')
    ) {
      document.body.classList.remove('nav-open');
    }
  });

  /* ----------------------------------------------------------
     3. Smooth Scroll
     ---------------------------------------------------------- */
  const smoothScrollTargets = document.querySelectorAll(
    '.nav-links a, .mobile-menu a, .cta-buttons a'
  );

  smoothScrollTargets.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     4. Typing Effect
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
          // Cursor keeps blinking — handled by CSS
        }
      }, 80);
    }
  }

  /* ----------------------------------------------------------
     5. Scroll Fade-In
     ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (prefersReducedMotion) {
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
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

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

  /* ----------------------------------------------------------
     7. Floating Particles
     ---------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const particlesContainer = document.querySelector('.particles-container');

    if (particlesContainer) {
      const PARTICLE_COUNT = 28;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');

        const size     = (Math.random() * 2.5 + 1).toFixed(2);   // 1 – 3.5 px
        const duration = (Math.random() * 18 + 12).toFixed(2);   // 12 – 30 s
        const delay    = -(Math.random() * 30).toFixed(2);        // 0 – -30 s
        const left     = (Math.random() * 100).toFixed(2);        // 0 – 100 %

        particle.style.width           = `${size}px`;
        particle.style.height          = `${size}px`;
        particle.style.left            = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay   = `${delay}s`;

        particlesContainer.appendChild(particle);
      }
    }
  }

  /* ----------------------------------------------------------
     8. EmailJS Contact Form
     ---------------------------------------------------------- */
  // Replace the values below with your own EmailJS credentials
  const SERVICE_ID  = 'YOUR_SERVICE_ID';   // Replace with your EmailJS service ID
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Replace with your EmailJS template ID
  const USER_ID     = 'YOUR_USER_ID';      // Replace with your EmailJS public key

  // Initialize EmailJS (only if loaded)
  if (typeof emailjs !== 'undefined') {
    emailjs.init(USER_ID);
  }

  const contactForm  = document.getElementById('contact-form');
  const submitBtn    = contactForm
    ? contactForm.querySelector('.btn-submit')
    : null;

  if (contactForm && submitBtn) {
    const originalBtnText = submitBtn.textContent;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameField    = contactForm.elements['from_name'];
      const emailField   = contactForm.elements['from_email'];
      const messageField = contactForm.elements['message'];

      const name    = nameField    ? nameField.value.trim()    : '';
      const email   = emailField   ? emailField.value.trim()   : '';
      const message = messageField ? messageField.value.trim() : '';

      // Basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !emailRegex.test(email) || !message) {
        submitBtn.classList.add('shake');
        setTimeout(() => submitBtn.classList.remove('shake'), 500);
        return;
      }

      // Check if EmailJS is available and IDs are not placeholders
      const hasRealIds =
        SERVICE_ID  !== 'YOUR_SERVICE_ID'  &&
        TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
        USER_ID     !== 'YOUR_USER_ID';

      if (typeof emailjs === 'undefined' || !hasRealIds) {
        // Fallback: open mailto link
        console.warn(
          'EmailJS is not loaded or placeholder IDs are still in use. ' +
          'Falling back to mailto link. ' +
          'Replace SERVICE_ID, TEMPLATE_ID, and USER_ID in js/script.js.'
        );

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body    = encodeURIComponent(message);
        window.location.href =
          `mailto:souhardyabiswas02@gmail.com?subject=${subject}&body=${body}`;
        return;
      }

      // Send via EmailJS
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('sending');

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
        .then(() => {
          submitBtn.classList.remove('sending');
          submitBtn.classList.add('success');
          submitBtn.textContent = 'Message Sent!';
        })
        .catch(() => {
          submitBtn.classList.remove('sending');
          submitBtn.classList.add('error');
          submitBtn.textContent = 'Failed to send';
        })
        .finally(() => {
          setTimeout(() => {
            submitBtn.disabled    = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('success', 'error', 'sending');
          }, 3500);
        });
    });
  }

  /* ----------------------------------------------------------
     9. Pause Three.js on reduced motion
     ---------------------------------------------------------- */
  if (prefersReducedMotion && window.__threeAnimationId) {
    cancelAnimationFrame(window.__threeAnimationId);
  }

});
