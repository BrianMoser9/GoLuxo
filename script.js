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

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function loadProjects() {
        fetch(`projects.json?${new Date().getTime()}`)
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
                    projectCard.classList.add('card', 'zoom-in');
                    projectCard.style.animationDelay = `${index * 0.2}s`;
                    const img = new Image();
                    img.src = project.image || 'https://images.unsplash.com/photo-1516321310763-383ef236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    img.onload = () => {
                        projectCard.innerHTML = `
                            <img src="${img.src}" alt="${project.title}">
                            <div class="card-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <a href="${project.downloadLink}" target="_blank">Download</a>
                                <a href="${project.demoLink}" target="_blank">Demo</a>
                            </div>
                        `;
                        projectsContainer.appendChild(projectCard);
                    };
                    img.onerror = () => {
                        projectCard.innerHTML = `
                            <img src="https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="${project.title}">
                            <div class="card-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <a href="${project.downloadLink}" target="_blank">Download</a>
                                <a href="${project.demoLink}" target="_blank">Demo</a>
                            </div>
                        `;
                        projectsContainer.appendChild(projectCard);
                    };
                });
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                const projectsContainer = document.getElementById('projects-container');
                projectsContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
            });
    }

    function loadPosts() {
        fetch(`posts.json?${new Date().getTime()}`)
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
                    postCard.classList.add('card', 'zoom-in');
                    postCard.style.animationDelay = `${index * 0.2}s`;
                    const img = new Image();
                    img.src = post.image || 'https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    img.onload = () => {
                        postCard.innerHTML = `
                            <img src="${img.src}" alt="${post.title}">
                            <div class="card-content">
                                <h3>${post.title}</h3>
                                <p><small>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
                                <p>${post.content}</p>
                            </div>
                        `;
                        blogContainer.appendChild(postCard);
                    };
                    img.onerror = () => {
                        postCard.innerHTML = `
                            <img src="https://images.unsplash.com/photo-1516321310763-383e6f236bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="${post.title}">
                            <div class="card-content">
                                <h3>${post.title}</h3>
                                <p><small>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
                                <p>${post.content}</p>
                            </div>
                        `;
                        blogContainer.appendChild(postCard);
                    };
                });
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                const blogContainer = document.getElementById('blog-container');
                blogContainer.innerHTML = '<p class="error">Failed to load blog posts. Please try again later.</p>';
            });
    }

    loadProjects();
    loadPosts();

    document.getElementById('refresh-projects').addEventListener('click', loadProjects);
    document.getElementById('refresh-posts').addEventListener('click', loadPosts);

    const projectsFile = 'projects.json';
    const postsFile = 'posts.json';
    let lastProjectsModified = 0;
    let lastPostsModified = 0;

    async function checkFileUpdates() {
        try {
            const projectsResponse = await fetch(`${projectsFile}?${new Date().getTime()}`, { method: 'HEAD' });
            const projectsLastModified = new Date(projectsResponse.headers.get('Last-Modified')).getTime();
            if (projectsLastModified > lastProjectsModified) {
                lastProjectsModified = projectsLastModified;
                loadProjects();
            }

            const postsResponse = await fetch(`${postsFile}?${new Date().getTime()}`, { method: 'HEAD' });
            const postsLastModified = new Date(postsResponse.headers.get('Last-Modified')).getTime();
            if (postsLastModified > lastPostsModified) {
                lastPostsModified = postsLastModified;
                loadPosts();
            }
        } catch (error) {
            console.error('Error checking file updates:', error);
        }
    }

    setInterval(checkFileUpdates, 5000);

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
                entry.target.classList.add('fade-in', 'zoom-in');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section, .card').forEach(element => {
        observer.observe(element);
    });
});