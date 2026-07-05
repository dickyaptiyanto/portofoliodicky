/* ============================================
   MOCHAMMAD DICKY APRIYANTO - PORTFOLIO JS
   Modern Futuristic Theme | TJKT SMK Wikrama
   ============================================ */

'use strict';

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 700);
    initAnimations();
  }, 1200);
});

/* ===== AOS INIT ===== */
function initAnimations() {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleBackToTop();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  }
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
    themeToggle.title = 'Switch to Light Mode';
  } else {
    themeIcon.className = 'fas fa-moon';
    themeToggle.title = 'Switch to Dark Mode';
  }
}

/* ===== TYPED TEXT EFFECT ===== */
const typedEl = document.getElementById('typed');
const phrases = [
  'Cloud Computing Enthusiast',
  'Linux System Administrator',
  'Computer Networking Enthusiast',
  'Future Cloud Engineer',
  'Future Infrastructure Engineer',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typed effect after loading
setTimeout(typeEffect, 1500);

/* ===== SKILL BARS ANIMATION ===== */
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    fill.style.width = width + '%';
  });
}

// Trigger skill bar animation when in view
const skillsSection = document.getElementById('keahlian');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      setTimeout(animateSkillBars, 300);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) skillObserver.observe(skillsSection);

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #64ffda, #00b4d8)';
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1500);
});

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== PROFILE IMAGE TILT EFFECT ===== */
const profileWrapper = document.querySelector('.profile-wrapper');
if (profileWrapper) {
  profileWrapper.addEventListener('mousemove', (e) => {
    const rect = profileWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    profileWrapper.style.transform = `perspective(600px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
  });
  profileWrapper.addEventListener('mouseleave', () => {
    profileWrapper.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
    profileWrapper.style.transition = 'transform 0.5s ease';
  });
}

/* ===== CURSOR GLOW EFFECT (Desktop only) ===== */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(100,255,218,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ===== COUNTER ANIMATION for Hero Stats ===== */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const heroSection = document.getElementById('beranda');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      const statNums = document.querySelectorAll('.stat-num');
      const targets = [4, 8, 3];
      statNums.forEach((el, i) => animateCounter(el, targets[i]));
    }
  });
}, { threshold: 0.5 });

if (heroSection) statsObserver.observe(heroSection);

/* ===== TOOL CARDS STAGGER ANIMATION ===== */
const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.05}s`;
});

/* ===== NAVBAR HIDE/SHOW ON SCROLL DIRECTION ===== */
let lastScrollY = window.scrollY;
let scrollTimeout;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    lastScrollY = window.scrollY;
  }, 100);
});

/* ===== INIT ON DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav
  updateActiveNav();

  // Add entrance animation to hero elements
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-desc, .hero-btns, .hero-stats');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 1400 + i * 150);
  });
});

/* ===== RIPPLE EFFECT ON BUTTONS ===== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${x}px; top: ${y}px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease;
      pointer-events: none;
    `;

    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
      document.head.appendChild(style);
    }

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

console.log('%c👨‍💻 Mochammad Dicky Apriyanto | TJKT SMK Wikrama Bogor', 'color: #64ffda; font-size: 14px; font-weight: bold;');
console.log('%c🚀 Cloud Engineer | Linux Administrator', 'color: #4fc3f7; font-size: 12px;');
