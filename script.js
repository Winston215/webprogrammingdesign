// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// --- PAGE TRANSITION ANIMATION TYPE ---
// Change this to 'fade', 'slide', or 'scale' to switch animation style
const PAGE_TRANSITION_TYPE = 'slide'; // 'fade', 'slide', or 'scale'

const ANIMATION_CLASSES = {
    fade: { exit: 'page-exit', enter: 'page-enter' },
    slide: { exit: 'page-exit-slide', enter: 'page-enter-slide' },
    scale: { exit: 'page-exit-scale', enter: 'page-enter-scale' }
};

// Page transition
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a:not([href^="#"])'); // Select all links except anchor links
    const body = document.body;
    const anim = ANIMATION_CLASSES[PAGE_TRANSITION_TYPE];

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.href;

            // Check if the link is internal and not a download link
            if (href.startsWith(window.location.origin) && !link.hasAttribute('download')) {
                e.preventDefault();
                body.classList.add(anim.exit);

                body.addEventListener('animationend', () => {
                    window.location.href = href;
                }, { once: true });
            } else if (!href.startsWith('mailto:') && link.target !== '_blank' && !link.hasAttribute('download')) {
                // Handle external links by adding exit animation before navigating
                e.preventDefault();
                body.classList.add(anim.exit);

                body.addEventListener('animationend', () => {
                    window.location.href = href;
                }, { once: true });
            }
            // For external links opening in new tabs or download links, default behavior is fine
        });
    });

    // Add page-enter class on new page load
    body.classList.add(anim.enter);

    // Remove page-enter class after animation
    body.addEventListener('animationend', () => {
        body.classList.remove(anim.enter);
    }, { once: true });
});

// Initialize AOS with enhanced options
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    delay: 0,
    easing: 'ease-in-out-cubic',
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Add smooth scroll behavior
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.modern-hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.card, .region-card, .feature-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Add text reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('text-reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .feature-text h3, .region-content h3').forEach(element => {
    observer.observe(element);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Add dynamic background color change on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('.modern-header');

    if (header) {
        if (scrollPosition > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    }
});

// Add image lazy loading with fade-in effect
document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    observer.observe(img);
});

// Add smooth reveal for statistics
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const finalValue = parseInt(statNumber.textContent);
                let currentValue = 0;
                const duration = 2000;
                const increment = finalValue / (duration / 16);

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        statNumber.textContent = finalValue.toLocaleString();
                        clearInterval(counter);
                    } else {
                        statNumber.textContent = Math.floor(currentValue).toLocaleString();
                    }
                }, 16);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
}); 