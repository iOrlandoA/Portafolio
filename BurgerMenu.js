const line1BarsRef = document.querySelector('.line1-bars-menu');
const line2BarsRef = document.querySelector('.line2-bars-menu');
const line3BarsRef = document.querySelector('.line3-bars-menu');
const menu = document.querySelector('.menu-side');

// Get reference to the menu container
const barsMenuRef = document.querySelector('.bars-menu');

// Add click event listener to the menu container
barsMenuRef.addEventListener('click', () => {
  // Toggle the 'activeline' classes on the menu lines
  line1BarsRef.classList.toggle('activeline1-bars-menu');
  line2BarsRef.classList.toggle('activeline2-bars-menu');
  line3BarsRef.classList.toggle('activeline3-bars-menu');
  menu.classList.toggle('menu-side-move');
});