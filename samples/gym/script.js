gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeBeforeAfterSliders();
    initializeNavbar();
    initializeCounters();
    initializeParallax();
    initializeFormHandling();
});

function initializeAnimations() {
    gsap.set('.hero-title', { y: 100, opacity: 0 });
    gsap.set('.hero-subtitle', { y: 50, opacity: 0 });
    gsap.set('.hero-stats', { y: 30, opacity: 0 });
    gsap.set('.hero-buttons', { y: 30, opacity: 0 });
    gsap.set('.dumbbell-spinner', { scale: 0, rotation: 0 });
    gsap.set('.floating-item', { y: 50, opacity: 0 });

    const heroTl = gsap.timeline();
    heroTl
        .to('.hero-title', { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            stagger: 0.1
        })
        .to('.hero-subtitle', { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power2.out' 
        }, '-=0.8')
        .to('.hero-stats', { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            stagger: 0.2
        }, '-=0.6')
        .to('.hero-buttons', { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            stagger: 0.1
        }, '-=0.4')
        .to('.dumbbell-spinner', { 
            scale: 1, 
            rotation: 360, 
            duration: 1.5, 
            ease: 'back.out(1.7)' 
        }, '-=0.6')
        .to('.floating-item', { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            stagger: 0.2
        }, '-=1');

    gsap.to('.dumbbell-spinner', {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.floating-item', {
        y: -30,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.5
    });

    ScrollTrigger.batch('.program-card', {
        onEnter: (elements) => {
            gsap.fromTo(elements, 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            );
        },
        start: 'top 85%'
    });

    ScrollTrigger.batch('.trainer-card', {
        onEnter: (elements) => {
            gsap.fromTo(elements, 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            );
        },
        start: 'top 85%'
    });

    ScrollTrigger.batch('.transformation-item', {
        onEnter: (elements) => {
            gsap.fromTo(elements, 
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.3, ease: 'power3.out' }
            );
        },
        start: 'top 85%'
    });

    ScrollTrigger.batch('.contact-item', {
        onEnter: (elements) => {
            gsap.fromTo(elements, 
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            );
        },
        start: 'top 85%'
    });

    gsap.fromTo('.section-title', 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.section-title',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-subtitle', 
        { y: 30, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-subtitle',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const afterImage = slider.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;
        let startX, startLeft;

        function updateSlider(x) {
            const rect = slider.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
            afterImage.style.width = percent + '%';
            handle.style.left = percent + '%';
        }

        function handleMouseDown(e) {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            startLeft = parseFloat(handle.style.left) || 50;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleMouseMove);
            document.addEventListener('touchend', handleMouseUp);
        }

        function handleMouseMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            updateSlider(x);
        }

        function handleMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        }

        handle.addEventListener('mousedown', handleMouseDown);
        handle.addEventListener('touchstart', handleMouseDown);
        slider.addEventListener('click', (e) => {
            if (!isDragging) {
                updateSlider(e.clientX);
            }
        });

        gsap.fromTo(afterImage, 
            { width: '0%' },
            { width: '50%', duration: 1.5, ease: 'power2.out', delay: 0.5 }
        );
    });
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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
}

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: 0,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.ceil(this.targets()[0].innerHTML) + suffix;
                    }
                });
            }
        });
    });
}

function initializeParallax() {
    gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.floating-elements', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                newsletterForm.reset();
            }, 2000);
        });
    }
}

function createKineticTextEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        element.appendChild(span);
        
        gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            delay: index * 0.05,
            ease: 'power2.out'
        });
    });
}

function addHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    const cards = document.querySelectorAll('.program-card, .trainer-card');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

function initializeScrollEffects() {
    gsap.utils.toArray('.program-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 100,
                rotationY: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    gsap.utils.toArray('.trainer-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                x: i % 2 === 0 ? -100 : 100
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

window.addEventListener('load', () => {
    addHoverEffects();
    initializeScrollEffects();
    
    createKineticTextEffect(document.querySelector('.hero-title'));
    
    gsap.to('.hero-content', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
}); 