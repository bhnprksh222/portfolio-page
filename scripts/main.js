// Active link highlight + reveal on scroll + custom cursor + small UX
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const cursor = document.querySelector('.cursor');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Active link logic
  const setActive = () => {
    let currentId = '';
    sections.forEach(s => {
      const top = window.scrollY + 120;
      if (top >= s.offsetTop) currentId = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  // Reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Smooth scroll for nav links
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
    });
  });

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));

  // Custom cursor
  window.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});