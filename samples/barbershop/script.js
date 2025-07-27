gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const floatingTools = document.querySelectorAll('.tool');

    gsap.fromTo(heroTitle, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(heroSubtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(heroButtons,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out" }
    );

    floatingTools.forEach((tool, index) => {
        gsap.fromTo(tool,
            { opacity: 0, scale: 0, rotation: 180 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0, 
                duration: 1, 
                delay: 0.8 + (index * 0.2), 
                ease: "back.out(1.7)" 
            }
        );
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, scale: 0.8, rotationY: 45 },
            {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    const navbar = document.querySelector('.navbar');
    gsap.to(navbar, {
        scrollTrigger: {
            trigger: "body",
            start: "top -100",
            end: "bottom -100",
            onUpdate: (self) => {
                if (self.direction === 1) {
                    navbar.style.transform = "translateY(-100%)";
                } else {
                    navbar.style.transform = "translateY(0)";
                }
            }
        }
    });

    const serviceIcons = document.querySelectorAll('.service-icon i');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(this, {
                rotation: 360,
                scale: 1.2,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });

        icon.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotation: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
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
            background: ${type === 'success' ? '#00d4ff' : '#ff6b35'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border: 1px solid rgba(0, 212, 255, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        gsap.to(notification, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        setTimeout(() => {
            gsap.to(notification, {
                x: "100%",
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => notification.remove()
            });
        }, 5000);
    }

    const floatingToolsAnimation = () => {
        floatingTools.forEach((tool, index) => {
            gsap.to(tool, {
                y: -20,
                rotation: 10,
                duration: 2,
                delay: index * 0.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    };

    floatingToolsAnimation();

    const parallaxEffect = () => {
        const heroBg = document.querySelector('.hero-bg');
        gsap.to(heroBg, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    };

    parallaxEffect();

    const serviceCardHover = () => {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    serviceCardHover();

    const galleryHover = () => {
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('img'), {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(this.querySelector('.gallery-overlay'), {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('img'), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(this.querySelector('.gallery-overlay'), {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    galleryHover();

    const testimonialHover = () => {
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    testimonialHover();

    const contactItemHover = () => {
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    contactItemHover();

    const socialLinksHover = () => {
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -3,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    socialLinksHover();

    const typingEffect = () => {
        const heroTitleText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < heroTitleText.length) {
                heroTitle.textContent += heroTitleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    };

    typingEffect();

    const neonPulse = () => {
        gsap.to('.nav-logo', {
            textShadow: "0 0 30px rgba(0, 212, 255, 0.8)",
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    };

    neonPulse();

    console.log('Luna Cuts website loaded successfully! ✂️');
}); 