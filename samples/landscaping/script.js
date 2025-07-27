gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  animateLeaves();
  animatePlantGrow();
  setupGrassHover();
  setupBeforeAfterReveal();
  setupFloatingContactForm();
  setupContactForm();
  setupNewsletterForm();
  setupSmoothScroll();
});

function animateLeaves() {
  gsap.utils.toArray('.animated-leaves i').forEach((leaf, i) => {
    gsap.fromTo(leaf, {
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

function animatePlantGrow() {
  // Animate SVG plant path and ellipses
  const plant = document.querySelector('.growing-plant path');
  if (plant) {
    plant.style.strokeDasharray = plant.getTotalLength();
    plant.style.strokeDashoffset = plant.getTotalLength();
    gsap.to(plant, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.growing-plant',
        start: 'top 80%',
      }
    });
  }
  // Animate leaves growing
  document.querySelectorAll('.growing-plant ellipse').forEach((leaf, i) => {
    gsap.fromTo(leaf, {
      scale: 0,
      transformOrigin: '50% 50%'
    }, {
      scale: 1,
      duration: 1.2,
      delay: 1.2 + i * 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.growing-plant',
        start: 'top 80%',
      }
    });
  });
}

function setupGrassHover() {
  // Extra shimmer on hover
  document.querySelectorAll('.grass-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('grass-animate');
      setTimeout(() => el.classList.remove('grass-animate'), 800);
    });
  });
}

function setupBeforeAfterReveal() {
  // Animate before/after images on scroll
  document.querySelectorAll('.before-after-card').forEach((card, idx) => {
    const before = card.querySelector('.before-img');
    const after = card.querySelector('.after-img');
    const bar = card.querySelector('.slider-bar');
    gsap.fromTo(before, {clipPath: 'inset(0 50% 0 0)'},
      {clipPath: 'inset(0 0 0 0)', duration: 1.2, delay: 0.2 + idx * 0.2, ease: 'power2.out',
        scrollTrigger: {trigger: card, start: 'top 80%'}});
    gsap.fromTo(after, {clipPath: 'inset(0 0 0 50%)'},
      {clipPath: 'inset(0 0 0 0)', duration: 1.2, delay: 0.5 + idx * 0.2, ease: 'power2.out',
        scrollTrigger: {trigger: card, start: 'top 80%'}});
    gsap.fromTo(bar, {left: '50%'},
      {left: '100%', duration: 1.2, delay: 0.7 + idx * 0.2, ease: 'power2.out',
        scrollTrigger: {trigger: card, start: 'top 80%'}});
  });
}

function setupFloatingContactForm() {
  const openBtn = document.querySelector('.open-contact-btn');
  const formContainer = document.querySelector('.contact-form-container');
  const closeBtn = document.querySelector('.close-contact');
  if (openBtn && formContainer && closeBtn) {
    openBtn.addEventListener('click', () => {
      formContainer.style.display = 'block';
      gsap.fromTo(formContainer, {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'});
      openBtn.style.display = 'none';
    });
    closeBtn.addEventListener('click', () => {
      gsap.to(formContainer, {opacity: 0, y: 40, duration: 0.4, ease: 'power2.in', onComplete: () => {
        formContainer.style.display = 'none';
        openBtn.style.display = '';
      }});
    });
  }
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