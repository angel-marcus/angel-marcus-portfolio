document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');

  // 1. Optimized Mobile Menu
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!isOpen));
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  // 2. High-Performance Smooth Scroll (Reflow-Free)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Browser handles the header offset via CSS scroll-padding-top
        target.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Accessibility: Move focus to the target
        target.focus({ preventScroll: true });
        if (document.activeElement !== target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // 3. High-Performance Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('active');
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.05, 
    rootMargin: "0px 0px 50px 0px" 
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 4. Deferred FAQ Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        const answer = btn.nextElementSibling;
        if (answer) {
          answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
        }
      });
    });
  }
});