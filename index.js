// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const exploreBtn = document.querySelector('.explore-btn');
const mascot = document.querySelector('.mascot');

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Button animation
exploreBtn.addEventListener('click', () => {
    exploreBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        exploreBtn.style.transform = 'scale(1)';
    }, 200);
});

// Mascot hover animation with parallax effect
if (mascot) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (window.innerWidth / 2 - clientX) / 30;
        const yPos = (window.innerHeight / 2 - clientY) / 30;
        
        mascot.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.hero-content, .mascot-container').forEach(el => {
    observer.observe(el);
});

// Add scroll parallax effect to clouds
window.addEventListener('scroll', () => {
    const clouds = document.querySelectorAll('.cloud');
    const scrolled = window.pageYOffset;
    
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 0.2;
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add preloader
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'preloader';
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add smooth hover effect for buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transition = 'all 0.3s ease';
    });
});

