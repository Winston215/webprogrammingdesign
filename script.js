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