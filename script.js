// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Show toast notification
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    },

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
};

// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Navigation management
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');
        
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', utils.debounce(() => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 10));

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';
            this.hamburger.setAttribute('aria-expanded', !isExpanded);
            this.navLinks.classList.toggle('active');
        });

        // Smooth scrolling
        this.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    this.navLinks.classList.remove('active');
                    this.hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Update active nav item on scroll
        window.addEventListener('scroll', utils.debounce(() => {
            this.updateActiveNavItem();
        }, 100));
    }

    updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navItems.forEach(item => item.removeAttribute('aria-current'));
                if (navLink) navLink.setAttribute('aria-current', 'page');
            }
        });
    }
}

// Particle animation
class ParticleAnimation {
    constructor() {
        this.container = document.querySelector('.particle-container');
        this.particleCount = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        this.container.appendChild(particle);
    }
}

// Content loader
class ContentLoader {
    constructor() {
        this.projectsContainer = document.getElementById('projects-container');
        this.blogContainer = document.getElementById('blog-container');
        
        this.init();
    }

    async init() {
        await Promise.all([
            this.loadProjects(),
            this.loadBlogPosts()
        ]);
    }

    async loadProjects() {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            if (!data.projects || !Array.isArray(data.projects)) {
                throw new Error('Invalid projects data format');
            }

            this.renderProjects(data.projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError(this.projectsContainer, 'Failed to load projects. Please try again later.');
        }
    }

    async loadBlogPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            if (!data.posts || !Array.isArray(data.posts)) {
                throw new Error('Invalid posts data format');
            }

            this.renderBlogPosts(data.posts);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showError(this.blogContainer, 'Failed to load blog posts. Please try again later.');
        }
    }

    renderProjects(projects) {
        this.projectsContainer.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            this.projectsContainer.appendChild(projectCard);
        });
    }

    renderBlogPosts(posts) {
        this.blogContainer.innerHTML = '';
        
        posts.forEach((post, index) => {
            const postCard = this.createBlogCard(post, index);
            this.blogContainer.appendChild(postCard);
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        const technologies = project.technologies ? project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('') : '';
        
        const fallbackImage = 'https://images.unsplash.com/photo-1461749288671-6f183fb77e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        
        card.innerHTML = `
            <img src="${project.image || fallbackImage}" 
                 alt="${project.title}" 
                 loading="lazy"
                 onerror="this.src='${fallbackImage}'; this.onerror=null;"
                 onload="this.classList.add('loaded');">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${technologies ? `<div class="tech-stack">${technologies}</div>` : ''}
                <div class="card-actions">
                    ${project.downloadLink ? `<a href="${project.downloadLink}" target="_blank" rel="noopener">View Code</a>` : ''}
                    ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" rel="noopener">Live Demo</a>` : ''}
                </div>
            </div>
        `;
        
        return card;
    }

    createBlogCard(post, index) {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        const fallbackImage = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        
        card.innerHTML = `
            <img src="${post.image || fallbackImage}" 
                 alt="${post.title}" 
                 loading="lazy"
                 onerror="this.src='${fallbackImage}'; this.onerror=null;"
                 onload="this.classList.add('loaded');">
            <div class="card-content">
                <div class="card-meta">
                    <span class="category">${post.category || 'General'}</span>
                    <span class="read-time">${post.readTime || '3 min read'}</span>
                </div>
                <h3>${post.title}</h3>
                <p><small>${utils.formatDate(post.date)}</small></p>
                <p>${post.content}</p>
            </div>
        `;
        
        return card;
    }

    showError(container, message) {
        container.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button onclick="location.reload()" class="cta-button secondary">Retry</button>
            </div>
        `;
    }
}

// Form validation and submission
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnText = this.submitBtn.querySelector('.btn-text');
        this.btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupRealTimeValidation();
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                if (!utils.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
        }

        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setLoadingState(loading) {
        this.submitBtn.disabled = loading;
        this.btnText.style.display = loading ? 'none' : 'inline';
        this.btnLoading.style.display = loading ? 'inline' : 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            utils.showToast('Please fix the errors in the form', 'error');
            return;
        }

        this.setLoadingState(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your backend
            console.log('Form data:', data);
            
            utils.showToast(`Thank you, ${data.name}! Your message has been sent successfully.`, 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            utils.showToast('Failed to send message. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in', 'slide-in');
                    }
                });
            },
            { 
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.section, .card');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Report to analytics if needed
            if (loadTime > 3000) {
                console.warn('Page load time is slow');
            }
        });

        // Monitor scroll performance
        let scrollCount = 0;
        const scrollHandler = utils.debounce(() => {
            scrollCount++;
            if (scrollCount % 100 === 0) {
                console.log(`Scrolled ${scrollCount} times`);
            }
        }, 100);

        window.addEventListener('scroll', scrollHandler);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new NavigationManager();
    new ParticleAnimation();
    new ContentLoader();
    new ContactForm();
    new AnimationObserver();
    new PerformanceMonitor();

    // Additional event listeners
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                hamburger.click();
            }
        }
    });

    // Preload critical images
    this.preloadImages();
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}