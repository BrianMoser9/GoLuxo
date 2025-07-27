gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  animateGarageDoor();
  animateTire();
  animateServiceCards();
  setupNavbar();
  setupSmoothScroll();
  setupForm();
});

function animateGarageDoor() {
  const panels = document.querySelectorAll('.garage-door .door-panel');
  if (panels.length === 3) {
    gsap.fromTo(panels, {
      y: -120,
      opacity: 0.5
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.garage-door',
        start: 'top 80%'
      }
    });
  }
}

function animateTire() {
  const tire = document.querySelector('.tire');
  const hub = document.querySelector('.hub');
  if (tire && hub) {
    gsap.to(tire, {
      rotation: 360,
      repeat: -1,
      duration: 2.5,
      ease: 'linear',
      transformOrigin: '50% 50%'
    });
    gsap.to(hub, {
      rotation: -360,
      repeat: -1,
      duration: 2.5,
      ease: 'linear',
      transformOrigin: '50% 50%'
    });
  }
}

function animateServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Animate spark or gear
      const spark = card.querySelector('.spark');
      const gear = card.querySelector('.gear');
      if (spark) {
        gsap.fromTo(spark, {scale: 0.7, opacity: 0.7}, {scale: 1.2, opacity: 1, duration: 0.3, yoyo: true, repeat: 1});
      }
      if (gear) {
        gsap.to(gear, {rotation: '+=360', duration: 1, ease: 'linear'});
      }
    });
    card.addEventListener('mouseleave', () => {
      const spark = card.querySelector('.spark');
      if (spark) {
        gsap.to(spark, {scale: 1, opacity: 0.7, duration: 0.2});
      }
    });
  });
}

function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(24,24,24,0.98)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.7)';
    } else {
      navbar.style.background = 'var(--gray)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    }
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

function setupForm() {
  const contactForm = document.querySelector('.contact-form form');
  const newsletterForm = document.querySelector('.newsletter-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }
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