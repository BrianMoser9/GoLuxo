// Preloader fadeout
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.style.display = 'none', 600);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '🌞';
  } else {
    body.classList.remove('light-mode');
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Initialize theme on load
setTheme(localStorage.getItem('theme') || 'dark');

// Helper to create a card HTML string with dynamic buttons
function createCard(item) {
  let buttonsHTML = '';

  if (Array.isArray(item.buttons)) {
    buttonsHTML = `<div class="buttons">` + item.buttons
      .map(btn => `<a href="${btn.link}" target="_blank" class="card-btn">${btn.name}</a>`)
      .join('') + `</div>`;
  }

  return `
    <div class="card" data-category="${item.category}" tabindex="0">
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <small>${item.date} • ${item.category}</small>
      <p>${item.description}</p>
      ${buttonsHTML}
    </div>
  `;
}

// Render cards with filtering logic & cache busting
async function loadCards(jsonUrl, containerId, filterId) {
  const url = jsonUrl + '?t=' + new Date().getTime(); // bust cache
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById(containerId);
  const filterContainer = document.getElementById(filterId);

  const categories = ['All', ...new Set(data.map(item => item.category))];

  // Render filter buttons
  filterContainer.innerHTML = categories
    .map(cat => `<button class="filter-btn" data-cat="${cat}">${cat}</button>`)
    .join('');

  function renderCards(cat) {
    const filtered = cat === 'All' ? data : data.filter(d => d.category === cat);
    container.innerHTML = filtered.map(createCard).join('');
    addCardListeners();
  }

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.getAttribute('data-cat'));
    });
  });

  filterContainer.querySelector('.filter-btn').classList.add('active');
  renderCards('All');
}

// Modal elements
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('closeModal');

function showModal(content) {
  modalBody.innerHTML = content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', hideModal);
modal.addEventListener('click', e => {
  if (e.target === modal) hideModal();
});

// Add listeners to cards to open modal
function addCardListeners() {
  document.querySelectorAll('.card').forEach(card => {
    card.onclick = () => {
      const title = card.querySelector('h3').innerText;
      const date = card.querySelector('small').innerText;
      const imgSrc = card.querySelector('img').src;
      const desc = card.querySelector('p').innerText;

      const content = `
        <h2>${title}</h2>
        <small>${date}</small>
        <img src="${imgSrc}" alt="${title}" />
        <p>${desc}</p>
      `;
      showModal(content);
    };
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') card.click();
    });
  });
}

// Init all
window.addEventListener('DOMContentLoaded', () => {
  loadCards('projects.json', 'projects-container', 'project-filters');
  loadCards('posts.json', 'posts-container', 'post-filters');
});
