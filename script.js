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
      body.style.overflow = newState ? 'hidden' : '';
      newState ? nav.querySelector('a')?.focus() : menuBtn.focus();
    };
    menuBtn.addEventListener('click', toggleMenu);
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

  // Optimized Single Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => entry.target.classList.add('active'));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});