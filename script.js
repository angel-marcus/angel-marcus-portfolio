document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');

  // 1. Mobile Menu Logic (Fixed Accessibility & Errors)
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      
      // Update ARIA for Accessibility 100 score
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.setAttribute('aria-hidden', isExpanded); // Hidden when expanded is false
      nav.classList.toggle('active');
      
      // Prevent background scrolling when menu is open
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Performance-First Smooth Scroll (Fixed Focus Management)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Move focus to the section for screen readers
        target.focus({ preventScroll: true });
      }
    });
  });

  // 3. Optimized Reveal Observer (Performance Focus)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 4. FAQ Toggle (Consolidated inside DOMContentLoaded)
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      const answer = btn.nextElementSibling;

      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});