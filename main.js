// محلك - شي إن Landing Page - Vanilla JavaScript
// Dark mode, mobile menu, sliders, counters, scroll animations

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initDarkMode();
  initNavbar();
  initMobileMenu();
  initAnimatedCounters();
  initTestimonialsSlider();
  initScrollAnimations();
});

// ==========================================
// DARK MODE
// ==========================================
function initDarkMode() {
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateDarkModeIcons(true);
  }
  
  darkModeBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateDarkModeIcons(isDark);
  });
  
  function updateDarkModeIcons(isDark) {
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
    }
  }
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar?.classList.add('glass', 'shadow-soft');
      navbar?.classList.remove('bg-transparent');
      navbar?.style.setProperty('padding-top', '0.75rem');
      navbar?.style.setProperty('padding-bottom', '0.75rem');
    } else {
      navbar?.classList.remove('glass', 'shadow-soft');
      navbar?.classList.add('bg-transparent');
      navbar?.style.setProperty('padding-top', '1.25rem');
      navbar?.style.setProperty('padding-bottom', '1.25rem');
    }
  }
  
  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // Initial check
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  menuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('active');
    menuIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  });
  
  // Close menu when clicking on a link
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = formatNumber(target) + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = formatNumber(Math.floor(current)) + suffix;
          }
        }, duration / steps);
        
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.1 });
  
  counters.forEach(counter => observer.observe(counter));
  
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }
}

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonials-slider');
  const dots = document.querySelectorAll('[data-testimonial-dot]');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  if (!slider) return;
  
  let currentIndex = 0;
  let isAutoPlaying = true;
  let autoPlayInterval;
  
  const totalSlides = slider.children.length;
  
  function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(${currentIndex * 100}%)`;
    updateDots();
  }
  
  function updateDots() {
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.remove('bg-border');
        dot.classList.add('bg-primary');
        dot.style.backgroundColor = 'hsl(var(--primary))';
      } else {
        dot.classList.add('bg-border');
        dot.classList.remove('bg-primary');
        dot.style.backgroundColor = 'hsl(var(--border))';
      }
    });
  }
  
  function next() {
    isAutoPlaying = false;
    clearInterval(autoPlayInterval);
    goToSlide((currentIndex + 1) % totalSlides);
  }
  
  function prev() {
    isAutoPlaying = false;
    clearInterval(autoPlayInterval);
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }
  
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      isAutoPlaying = false;
      clearInterval(autoPlayInterval);
      goToSlide(index);
    });
  });
  
  // Auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (isAutoPlaying) {
        goToSlide((currentIndex + 1) % totalSlides);
      }
    }, 5000);
  }
  
  startAutoPlay();
  updateDots();
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-target');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
