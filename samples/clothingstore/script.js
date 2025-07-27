gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const floatingElements = document.querySelectorAll('.floating-item');

    gsap.fromTo(heroTitle, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    gsap.fromTo(heroSubtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(heroButtons,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: "power2.out" }
    );

    floatingElements.forEach((element, index) => {
        gsap.fromTo(element,
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

    const collectionItems = document.querySelectorAll('.collection-item');
    collectionItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
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

    const lookbookItems = document.querySelectorAll('.lookbook-item');
    lookbookItems.forEach((item, index) => {
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

    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -50 },
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

    const filterButtons = document.querySelectorAll('.filter-btn');
    const collectionGrid = document.querySelector('.collection-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const items = document.querySelectorAll('.collection-item');
            
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
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

    const collectionItemHover = () => {
        collectionItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    collectionItemHover();

    const lookbookHover = () => {
        lookbookItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('img'), {
                    scale: 1.1,
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
            });
        });
    };

    lookbookHover();

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
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !subject || !message) {
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
            background: ${type === 'success' ? '#f8b4d9' : '#ff6b35'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border: 1px solid rgba(248, 180, 217, 0.3);
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

    const floatingCTAAnimation = () => {
        const ctaButtons = document.querySelectorAll('.cta-btn');
        ctaButtons.forEach((button, index) => {
            gsap.to(button, {
                y: -10,
                duration: 2,
                delay: index * 0.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    };

    floatingCTAAnimation();

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

    const featureItemHover = () => {
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    x: 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    };

    featureItemHover();

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

    const brandPulse = () => {
        gsap.to('.brand-text', {
            backgroundPosition: "200% center",
            duration: 3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    };

    brandPulse();

    const cartBtn = document.getElementById('cartBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showNotification('Item added to cart!', 'success');
        });
    }

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            showNotification('Item added to wishlist!', 'success');
        });
    }

    console.log('Velvet Wardrobe website loaded successfully! 👗');
}); 