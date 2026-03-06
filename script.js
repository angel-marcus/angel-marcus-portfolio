document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');

  // 1. Mobile Menu Logic
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', String(!isOpen));
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  // 2. Performance-First Smooth Scroll (No Layout Thrashing)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Closes menu if open
        if (nav) nav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        target.scrollIntoView({ behavior: 'smooth' });
        
        // Move focus for accessibility without jumping
        target.focus({ preventScroll: true });
      }
    });
  });

  // 3. Optimized Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// FAQ toggle
document.querySelectorAll(".faq-question").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const expanded = btn.getAttribute("aria-expanded") === "true";

    btn.setAttribute("aria-expanded", !expanded);

    const answer = btn.nextElementSibling;

    if(!expanded){
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});