// Smooth scroll dla linków nawigacyjnych
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Intersection Observer dla animacji przy scrollowaniu
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Obserwuj wszystkie karty, elementy procesu i portfolio
const animatedElements = document.querySelectorAll('.card, .process-step, .portfolio-item, .value-card, .stat');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Tutaj dodałbyś logikę wysyłania formularza
    // Na razie tylko pokazujemy alert
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    contactForm.reset();
  });
}

// Parallax effect dla hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const blobs = document.querySelectorAll('.blob');

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.1;
    blob.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
  });
});

// Add stagger animation to cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Portfolio hover effect enhancement
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
  item.addEventListener('mouseenter', function () {
    const overlay = this.querySelector('.portfolio-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.4s ease';
    }
  });
});

// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const headerLogo = document.querySelector('.navbar .logo-img');

// Function to set theme
function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update logo
  if (headerLogo) {
    if (theme === 'dark') {
      headerLogo.src = 'amb.png';
    } else {
      headerLogo.src = 'logo.png';
    }
  }
}

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Toggle theme listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

console.log('AMB CODE website loaded successfully! 🚀');
