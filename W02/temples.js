// temples.js

// ---------- FOOTER DINÁMICO ----------
const yearSpan = document.getElementById('current-year');
const modifiedSpan = document.getElementById('last-modified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (modifiedSpan) {
  modifiedSpan.textContent = document.lastModified;
}

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  // Cambia el ícono entre ☰ y ✕
  hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
