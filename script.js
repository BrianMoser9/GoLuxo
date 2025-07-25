<<<<<<< HEAD
// ========================================
// GOLUXO 2.0 - REVOLUTIONARY JAVASCRIPT
// The most advanced web experience ever created
// ========================================

// Performance monitoring and analytics
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Core Web Vitals
        this.observeLCP();
        this.observeFID();
        this.observeCLS();
        
        // Custom metrics
        this.measureLoadTime();
        this.measureAnimationPerformance();
        
        // Report to analytics
        this.reportMetrics();
    }

    observeLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                console.log('LCP:', this.metrics.lcp);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    observeFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    console.log('FID:', this.metrics.fid);
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    observeCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.cls = clsValue;
                console.log('CLS:', this.metrics.cls);
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.loadTime = loadTime;
            console.log('Load Time:', loadTime);
        });
    }

    measureAnimationPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.metrics.fps = fps;
                frameCount = 0;
                lastTime = currentTime;
                
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    reportMetrics() {
        // Send to analytics service
        if (this.metrics.lcp && this.metrics.fid && this.metrics.cls) {
            console.log('Performance Metrics:', this.metrics);
        }
    }
}

// Revolutionary WebGL Background
class WebGLBackground {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.animationId = null;
        
        if (window.supportsWebGL && this.canvas) {
            this.init();
        }
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            // Color
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Revolutionary Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.dot = this.cursor?.querySelector('.cursor-dot');
        this.ring = this.cursor?.querySelector('.cursor-ring');
        
        if (this.cursor && this.dot && this.ring) {
            this.init();
        }
    }

    init() {
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let ringX = 0;
        let ringY = 0;
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .nav-link, .cta-button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
        
        // Animation loop
        const animate = () => {
            // Smooth dot movement
            dotX += (mouseX - dotX) * 0.1;
            dotY += (mouseY - dotY) * 0.1;
            
            // Smooth ring movement
            ringX += (mouseX - ringX) * 0.05;
            ringY += (mouseY - ringY) * 0.05;
            
            // Apply transforms
            this.dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            this.ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Revolutionary Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        if (this.themeToggle && this.themeIcon) {
            this.init();
        }
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Trigger theme change event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Revolutionary Navigation Manager
class NavigationManager {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.menuToggle = document.getElementById('menu-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Scroll effect
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Active section tracking
        this.updateActiveSection();
        window.addEventListener('scroll', () => this.updateActiveSection());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
        this.menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Add mobile menu logic here
        console.log('Mobile menu toggled');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active state
            this.navLinks.forEach(link => link.removeAttribute('aria-current'));
            e.currentTarget.setAttribute('aria-current', 'page');
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.removeAttribute('aria-current'));
                if (navLink) navLink.setAttribute('aria-current', 'page');
            }
        });
    }
}

// Revolutionary Loading Manager
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressFill = document.querySelector('.progress-fill');
        this.loadingText = document.querySelector('.loading-text');
        
        this.init();
    }

    init() {
        // Simulate loading progress
        this.simulateLoading();
        
        // Hide loading screen when everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => this.hideLoading(), 1000);
        });
    }

    simulateLoading() {
        const steps = [
            { progress: 20, text: 'Initializing WebGL...' },
            { progress: 40, text: 'Loading 3D assets...' },
            { progress: 60, text: 'Setting up animations...' },
            { progress: 80, text: 'Optimizing performance...' },
            { progress: 100, text: 'Ready to launch!' }
        ];
        
        let currentStep = 0;
        
        const updateProgress = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                this.progressFill.style.width = `${step.progress}%`;
                this.loadingText.textContent = step.text;
                currentStep++;
                
                setTimeout(updateProgress, 800);
            }
        };
        
        updateProgress();
    }

    hideLoading() {
        this.loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Trigger loaded event
        window.dispatchEvent(new CustomEvent('apploaded'));
    }
}

// Revolutionary Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        this.setupHeroAnimations();
        
        // Scroll animations
        this.setupScrollAnimations();
        
        // Floating elements
        this.setupFloatingElements();
        
        // Stats counter
        this.setupStatsCounter();
    }

    setupHeroAnimations() {
        // Title reveal animation
        gsap.from('.title-line', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Subtitle animation
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.8,
            ease: 'power3.out'
        });
        
        // CTA buttons animation
        gsap.from('.hero-actions', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 1,
            ease: 'power3.out'
        });
    }

    setupScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Cards animation
        gsap.utils.toArray('.card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 100,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }

    setupFloatingElements() {
        gsap.utils.toArray('.floating-element').forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 1;
            
            gsap.to(element, {
                y: -30,
                rotation: 360,
                duration: 6 / speed,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        });
    }

    setupStatsCounter() {
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(stat, {
                        duration: 2,
                        innerHTML: target,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
}

// Revolutionary Content Loader
class ContentLoader {
    constructor() {
        this.projectsContainer = document.getElementById('projects-container');
        this.blogContainer = document.getElementById('blog-container');
        
        this.init();
=======
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    const particleContainer = document.querySelector('.particle-container');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
>>>>>>> parent of 9a0b8a2 (bigupdate)
    }

    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            if (!data.projects || !Array.isArray(data.projects)) {
                throw new Error('Invalid projects data format');
            }
            projectsContainer.innerHTML = '';
            data.projects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('card', 'fade-in');
                projectCard.style.animationDelay = `${index * 0.2}s`;
                projectCard.innerHTML = `
                    <img src="${project.image || 'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" alt="${project.title}">
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.downloadLink}" target="_blank">Download</a>
                        <a href="${project.demoLink}" target="_blank">Demo</a>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
<<<<<<< HEAD
            this.showError(this.projectsContainer, 'Failed to load revolutionary projects');
        }
    }
=======
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
        });
>>>>>>> parent of 9a0b8a2 (bigupdate)

    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const blogContainer = document.getElementById('blog-container');
            if (!data.posts || !Array.isArray(data.posts)) {
                throw new Error('Invalid posts data format');
            }
<<<<<<< HEAD

            this.renderBlogPosts(data.posts);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showError(this.blogContainer, 'Failed to load revolutionary insights');
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
        card.className = 'card project-card';
        card.dataset.category = project.category || 'general';
        
        const technologies = project.technologies ? project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('') : '';
        
        card.innerHTML = `
<<<<<<< HEAD
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="card-overlay">
                    <div class="card-actions">
                        ${project.downloadLink ? `<a href="${project.downloadLink}" target="_blank" rel="noopener" class="card-action">View Code</a>` : ''}
                        ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" rel="noopener" class="card-action">Live Demo</a>` : ''}
                    </div>
=======
            <img src="${project.image || 'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}" 
                 alt="${project.title}" 
                 loading="lazy">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${technologies ? `<div class="tech-stack">${technologies}</div>` : ''}
                <div class="card-actions">
                    ${project.downloadLink ? `<a href="${project.downloadLink}" target="_blank" rel="noopener">View Code</a>` : ''}
                    ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" rel="noopener">Live Demo</a>` : ''}
>>>>>>> parent of 9093519 (8766)
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                ${technologies ? `<div class="tech-stack">${technologies}</div>` : ''}
            </div>
        `;
        
        return card;
    }

    createBlogCard(post, index) {
        const card = document.createElement('div');
<<<<<<< HEAD
        card.className = 'card blog-card';
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
=======
        card.className = 'card fade-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <img src="${post.image || 'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}" 
                 alt="${post.title}" 
                 loading="lazy">
            <div class="card-content">
>>>>>>> parent of 9093519 (8766)
                <div class="card-meta">
                    <span class="category">${post.category || 'General'}</span>
                    <span class="read-time">${post.readTime || '3 min read'}</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${post.title}</h3>
                <p class="card-date">${new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p class="card-excerpt">${post.content}</p>
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

// Revolutionary Form Manager
class FormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.buttonText = this.submitBtn?.querySelector('.button-text');
        this.buttonLoading = this.submitBtn?.querySelector('.button-loading');
        
        if (this.form && this.submitBtn) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
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
                if (!this.isValidEmail(value)) {
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
            if (errorElement) errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
        }

        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) errorElement.textContent = '';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
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
        if (this.buttonText) this.buttonText.style.display = loading ? 'none' : 'inline';
        if (this.buttonLoading) this.buttonLoading.style.display = loading ? 'flex' : 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showToast('Please fix the errors in the form', 'error');
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
            
            this.showToast(`Thank you, ${data.name}! Your revolutionary project request has been sent.`, 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showToast('Failed to send message. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        // Animate in
        gsap.fromTo(toast, 
            { x: 400, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
        
        // Remove after 4 seconds
        setTimeout(() => {
            gsap.to(toast, {
                x: 400,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => toast.remove()
            });
        }, 4000);
    }
}

// Revolutionary App Initializer
class GoLuxoApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Initialize all modules
        this.modules.performance = new PerformanceMonitor();
        this.modules.webgl = new WebGLBackground();
        this.modules.cursor = new CustomCursor();
        this.modules.theme = new ThemeManager();
        this.modules.navigation = new NavigationManager();
        this.modules.loading = new LoadingManager();
        this.modules.animations = new AnimationManager();
        this.modules.content = new ContentLoader();
        this.modules.form = new FormManager();
        
        // Wait for app to be loaded
        window.addEventListener('apploaded', () => {
            this.onAppLoaded();
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onPageHidden();
            } else {
                this.onPageVisible();
            }
        });
        
        // Handle before unload
        window.addEventListener('beforeunload', () => {
            this.onBeforeUnload();
        });
    }

    onAppLoaded() {
        console.log('🚀 GoLuxo 2.0 - Revolutionary Experience Loaded!');
        
        // Trigger loaded animations
        gsap.to('body', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    }

    onPageHidden() {
        // Pause animations and heavy operations
        if (this.modules.webgl && this.modules.webgl.animationId) {
            cancelAnimationFrame(this.modules.webgl.animationId);
        }
    }

    onPageVisible() {
        // Resume animations
        if (this.modules.webgl) {
            this.modules.webgl.animate();
        }
    }

    onBeforeUnload() {
        // Cleanup
        if (this.modules.webgl) {
            this.modules.webgl.destroy();
        }
    }
}

// Initialize the revolutionary experience
document.addEventListener('DOMContentLoaded', () => {
    // Remove no-js class
    document.documentElement.classList.remove('no-js');
    
    // Initialize the app
    window.goluxoApp = new GoLuxoApp();
});

// Export for global access
window.GoLuxoApp = GoLuxoApp;
=======
            blogContainer.innerHTML = '';
            data.posts.forEach((post, index) => {
                const postCard = document.createElement('div');
                postCard.classList.add('card', 'fade-in');
                postCard.style.animationDelay = `${index * 0.2}s`;
                postCard.innerHTML = `
                    <img src="${post.image || 'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}" alt="${post.title}">
                    <div class="card-content">
                        <h3>${post.title}</h3>
                        <p><small>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
                        <p>${post.content}</p>
                    </div>
                `;
                blogContainer.appendChild(postCard);
            });
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            const blogContainer = document.getElementById('blog-container');
            blogContainer.innerHTML = '<p class="error">Failed to load blog posts. Please try again later.</p>';
        });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        alert(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'slide-in');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section, .card').forEach(element => {
        observer.observe(element);
    });
});
>>>>>>> parent of 9a0b8a2 (bigupdate)
