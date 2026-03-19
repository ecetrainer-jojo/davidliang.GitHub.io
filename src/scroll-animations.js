// Scroll animations using IntersectionObserver
// Triggers CSS transitions when elements enter the viewport

(function () {
  const THRESHOLD = 0.12;  // element needs to be 12% visible to trigger
  const ROOT_MARGIN = '0px 0px -60px 0px'; // slightly before reaching screen edge

  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated in, stop observing to save resources
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: THRESHOLD,
      rootMargin: ROOT_MARGIN,
    });

    elements.forEach((el) => observer.observe(el));
  }

  // Skill bar fill animation - triggered when skills section enters view
  function initSkillBars() {
    const skillSection = document.querySelector('#skills');
    if (!skillSection) return;

    const fills = skillSection.querySelectorAll('.skill-fill');
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          fills.forEach((fill, i) => {
            const targetWidth = fill.dataset.width + '%';
            setTimeout(() => {
              fill.style.width = targetWidth;
            }, i * 80); // stagger each bar by 80ms
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
  }

  // Nav active state: highlight current section
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      threshold: 0.4,
    });

    sections.forEach((section) => observer.observe(section));
  }

  // Nav scroll style: add solid background when scrolled past hero
  function initNavScroll() {
    const nav = document.querySelector('.pixel-nav');
    if (!nav) return;

    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    observer.observe(heroSection);
  }

  // Run all initializers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initSkillBars();
      initNavHighlight();
      initNavScroll();
    });
  } else {
    initScrollAnimations();
    initSkillBars();
    initNavHighlight();
    initNavScroll();
  }
})();
