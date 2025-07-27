document.addEventListener('DOMContentLoaded', function() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(45, 52, 54, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(45, 52, 54, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${rate}px)`;
        }
    });
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.animate__animated');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    const glowButtons = document.querySelectorAll('.btn-primary');
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(214, 48, 49, 0.8)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(214, 48, 49, 0.4)';
        });
    });
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    const pizzaIcon = document.querySelector('.pizza-glow i');
    if (pizzaIcon) {
        setInterval(() => {
            pizzaIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                pizzaIcon.style.transform = 'rotate(0deg)';
            }, 1000);
        }, 5000);
    }
    let currentSlide = 0;
    const menuItems = document.querySelectorAll('.menu-item');
    const totalSlides = menuItems.length;
    function showSlide(index) {
        menuItems.forEach((item, i) => {
            if (i === index) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.9)';
            }
        });
    }
    if (menuItems.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 3000);
    }
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate__animated', 'animate__fadeInLeft');
    });
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            animation: float 3s linear infinite;
        `;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        document.querySelector('.hero-section').appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    setInterval(createParticle, 200);
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => {
        observer.observe(el);
    });
    const addScrollClass = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    };
    const scrollObserver = new IntersectionObserver(addScrollClass, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        button.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const finalPrice = price.textContent;
        const numericPrice = parseFloat(finalPrice.replace('$', ''));
        let currentPrice = 0;
        const increment = numericPrice / 20;
        const counter = setInterval(() => {
            currentPrice += increment;
            if (currentPrice >= numericPrice) {
                currentPrice = numericPrice;
                clearInterval(counter);
            }
            price.textContent = '$' + currentPrice.toFixed(2);
        }, 50);
    });
    menuCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    function playSound(type) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(type === 'click' ? 800 : 600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    buttons.forEach(button => {
        button.addEventListener('click', () => {
        });
    });
    console.log('Tony\'s Slice House website loaded successfully! 🍕');
}); 