/* ============================================================
   PAVITHRA RAJ MOHAN — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Navbar ─────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── Active nav link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Mobile nav toggle ─────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.querySelector('.nav-links');

  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', function () {
      navLinksList.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinksList.classList.remove('open');
      }
    });
  }

  /* ── Smooth scrolling for anchor links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Back to Top ────────────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Fade-up on scroll ──────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el, i) {
      el.style.transitionDelay = (i * 80) + 'ms';
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Contact form basic UX ──────────────────────────────── */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent</span>';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

})();
