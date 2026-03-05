document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');
  const body = document.body;

  // Mobile Menu Logic
  if (menuBtn && nav) {
    const toggleMenu = () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      const newState = !isOpen;
      
      nav.setAttribute('aria-hidden', String(!newState));
      menuBtn.setAttribute('aria-expanded', String(newState));
      menuBtn.setAttribute('aria-label', newState ? 'Close navigation menu' : 'Open navigation menu');
      
      body.style.overflow = newState ? 'hidden' : '';

      if (newState) {
        nav.querySelector('a')?.focus();
      } else {
        menuBtn.focus();
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    nav.addEventListener('click', (e) => {
      if (e.target.matches('a') && nav.getAttribute('aria-hidden') === 'false') {
        toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('aria-hidden') === 'false') {
        toggleMenu();
      }
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      
      document.querySelectorAll('.faq-question').forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
      });

      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal Animation with observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// Optimized Reveal Animation
const revealOptions = {
  threshold: 0.1, // Lower threshold for faster triggering
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        entry.target.classList.add('active');
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);