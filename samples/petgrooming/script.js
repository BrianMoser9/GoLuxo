gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  setupPawSlide();
  setupServiceCardBounce();
  setupBoneHover();
  setupSmoothScroll();
  setupContactForm();
  setupNewsletterForm();
});

function setupPawSlide() {
  // Animate paw icons in hero
  gsap.utils.toArray('.paw-slide i').forEach((paw, i) => {
    gsap.fromTo(paw, {
      y: 60,
      opacity: 0.7
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: i * 0.3 + 0.5,
      ease: 'bounce.out',
      repeat: -1,
      yoyo: true
    });
  });
}

function setupServiceCardBounce() {
  // Animate service cards on scroll
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card, {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay: i * 0.2 + 0.2,
      ease: 'bounce.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

function setupBoneHover() {
  // Animate bone icon on hover (extra bounce)
  document.querySelectorAll('.bone-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const bone = el.querySelector('.fa-bone');
      if (bone) {
        bone.classList.add('animate__animated', 'animate__bounce');
        bone.addEventListener('animationend', () => {
          bone.classList.remove('animate__animated', 'animate__bounce');
        }, { once: true });
      }
    });
  });
}

function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 70;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({top, behavior: 'smooth'});
        }
      }
    });
  });
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  const checkmark = document.getElementById('confirmationCheckmark');
  if (form && checkmark) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        btn.style.display = 'none';
        checkmark.style.display = 'block';
        checkmark.classList.add('animate__tada');
        setTimeout(() => {
          checkmark.classList.remove('animate__tada');
          checkmark.style.display = 'none';
          btn.style.display = '';
          btn.disabled = false;
          btn.textContent = 'Send Message';
          form.reset();
        }, 2200);
      }, 1200);
    });
  }
}

function setupNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        newsletterForm.reset();
      }, 2000);
    });
  }
} 