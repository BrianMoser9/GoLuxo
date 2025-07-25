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
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
        });

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