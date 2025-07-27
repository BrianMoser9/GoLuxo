gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  setupModeToggle();
  setupSmoothScroll();
  setupGalleryLazyLoad();
  setupGalleryTransitions();
  setupForm();
});

function setupModeToggle() {
  const btn = document.getElementById('toggleMode');
  const body = document.body;
  btn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      btn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      btn.innerHTML = '<i class="fas fa-moon"></i>';
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

function setupGalleryLazyLoad() {
  const lazyImgs = document.querySelectorAll('.gallery-img.lazy');
  const config = { rootMargin: '100px 0px', threshold: 0.01 };
  const onIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.onload = () => img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  };
  const observer = new window.IntersectionObserver(onIntersection, config);
  lazyImgs.forEach(img => observer.observe(img));
}

function setupGalleryTransitions() {
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item, {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay: i * 0.2 + 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
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