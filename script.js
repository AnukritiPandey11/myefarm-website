/* ============================================================
   MYE FARM - script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const sendWaBtn = document.getElementById('sendWaBtn');

  function closeMenu() {
    if (!hamburger || !navLinksEl) return;
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function onScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }

    let currentSection = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 110) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
  }

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (event) {
    if (navbar && !navbar.contains(event.target)) closeMenu();
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');

      productCards.forEach(function (card) {
        const matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden', !matches);
        if (matches) {
          card.classList.remove('visible');
          window.setTimeout(function () { card.classList.add('visible'); }, 30);
        }
      });
    });
  });

  const revealTargets = [
    '.product-card',
    '.why-card',
    '.step-item',
    '.pillar',
    '.contact-item',
    '.delivery-item',
    '.testimonial-card',
    '.about-grid',
    '.contact-grid',
    '.section-title',
    '.section-sub',
    '.section-eyebrow',
    '.hero-stats',
    '.filter-tabs'
  ];

  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentNode ? el.parentNode.children : []);
        const index = siblings.indexOf(el);
        if (index >= 0 && (
          el.classList.contains('why-card') ||
          el.classList.contains('product-card') ||
          el.classList.contains('step-item') ||
          el.classList.contains('pillar') ||
          el.classList.contains('contact-item') ||
          el.classList.contains('delivery-item') ||
          el.classList.contains('testimonial-card')
        )) {
          el.style.transitionDelay = (index * 70) + 'ms';
        }
        el.classList.add('visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', function () {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const msg = document.getElementById('contactMsg').value.trim();
      const card = document.querySelector('.contact-card');

      if (!name && !email && !msg) {
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth;
          card.classList.add('shake');
        }
        document.getElementById('contactName').focus();
        return;
      }

      let fullMsg = 'Hi Mye Farm, ';
      if (name) fullMsg += 'my name is ' + name + '. ';
      if (email) fullMsg += 'My email is ' + email + '. ';
      fullMsg += msg || "I'd like to know more about Mye Farm products.";

      window.open('https://wa.me/917077769100?text=' + encodeURIComponent(fullMsg), '_blank');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      const img = card.querySelector('img');
      if (img) img.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', function () {
      const img = card.querySelector('img');
      if (img) img.style.transform = '';
    });
  });

  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  filterBtns.forEach(function (btn) {
    const filter = btn.getAttribute('data-filter');
    const count = filter === 'all'
      ? productCards.length
      : Array.from(productCards).filter(function (card) {
          return card.getAttribute('data-category') === filter;
        }).length;
    btn.setAttribute('data-count', count);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
