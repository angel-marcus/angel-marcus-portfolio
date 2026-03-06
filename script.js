document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');

  // 1. Optimized Mobile Menu (No layout thrashing)
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!isOpen));
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  // 2. High-Performance Reveal Observer
  // Using a larger rootMargin so elements prepare before they enter the screen
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Use requestAnimationFrame to ensure the class is added 
        // during the browser's next "quiet" moment
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

  // 3. Deferred FAQ Logic (Only runs if items exist)
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