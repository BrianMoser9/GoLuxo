document.addEventListener('DOMContentLoaded', function() {
  setupScrollFadeIns();
  setupServiceCardHover();
  setupBookingButton();
  setupSmoothScroll();
  setupForm();
});

function setupScrollFadeIns() {
  // Testimonials
  const testimonials = document.querySelectorAll('.testimonial-card');
  const instaImgs = document.querySelectorAll('.insta-img');
  const observerOptions = { threshold: 0.1 };

  const fadeIn = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new window.IntersectionObserver(fadeIn, observerOptions);
  testimonials.forEach(card => observer.observe(card));
  instaImgs.forEach(img => observer.observe(img));
}

function setupServiceCardHover() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });
}

function setupBookingButton() {
  const btn = document.querySelector('.booking-btn');
  if (!btn) return;
  btn.addEventListener('click', function(e) {
    const bookingSection = document.querySelector('#contact');
    if (bookingSection) {
      e.preventDefault();
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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