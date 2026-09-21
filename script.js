/* ========================================
   CROWN & BLADE BARBERSHOP - JAVASCRIPT
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // NAVIGATION FUNCTIONALITY
    // ============================================

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);


    // ============================================
    // GALLERY FILTERING
    // ============================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    // Add fade-in animation
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });


    // ============================================
    // BOOKING FORM HANDLING
    // ============================================

    const bookingForm = document.getElementById('bookingForm');
    const bookingConfirmation = document.getElementById('bookingConfirmation');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    bookingForm.addEventListener('submit', function (e) {
        // Don't prevent default - let form submit to Formspree
        // e.preventDefault();

        // Get form data for logging
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Log form data for debugging
        console.log('Booking Request:', formData);

        // Store booking data in localStorage
        localStorage.setItem('lastBooking', JSON.stringify(formData));

        // Note: Form will submit automatically to Formspree
        // Email will be sent automatically to princenatem@gmail.com
    });

    // Reset booking form function (global scope)
    window.resetBookingForm = function () {
        bookingForm.reset();
        bookingForm.style.display = 'block';
        bookingConfirmation.classList.add('hidden');
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll(`
        .about-grid,
        .service-card,
        .package-card,
        .pricing-category,
        .gallery-item,
        .contact-grid,
        .highlight-card
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });


    // ============================================
    // FORM VALIDATION
    // ============================================

    // Phone number validation (Kenyan format)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

        // Format as Kenyan number
        if (value.startsWith('254')) {
            // Already has country code
            e.target.value = '+' + value;
        } else if (value.startsWith('0')) {
            // Local format, convert to international
            value = '254' + value.substring(1);
            e.target.value = '+' + value;
        } else if (value.startsWith('7') || value.startsWith('1')) {
            // Missing leading zero
            value = '254' + value;
            e.target.value = '+' + value;
        } else {
            e.target.value = value;
        }
    });

    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function (e) {
        const emailValue = e.target.value;
        if (emailValue && !isValidEmail(emailValue)) {
            e.target.style.borderColor = '#ff4444';
        } else {
            e.target.style.borderColor = 'transparent';
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    // ============================================
    // DYNAMIC PRICE DISPLAY
    // ============================================

    const serviceSelect = document.getElementById('service');

    // Optional: Show selected service price below the select
    serviceSelect.addEventListener('change', function () {
        const selectedService = this.value;
        if (selectedService) {
            console.log('Selected service:', selectedService);
            // You can add visual feedback here if needed
        }
    });


    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================

    const heroBackground = document.querySelector('.hero-background');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });


    // ============================================
    // PRELOAD CRITICAL IMAGES
    // ============================================

    function preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920',
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();


    // ============================================
    // GALLERY LIGHTBOX (Optional Enhancement)
    // ============================================

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${imgAlt}</p>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Fade in
            setTimeout(() => lightbox.style.opacity = '1', 10);

            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            }

            // Close on escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                    closeLightbox();
                }
            });
        });
    });


    // ============================================
    // PERFORMANCE: LAZY LOADING IMAGES
    // ============================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }


    // ============================================
    // BACK TO TOP BUTTON (Optional)
    // ============================================

    function createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');

        backToTop.style.cssText = `
            position: fixed;
            bottom: 110px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gold);
            color: var(--primary-bg);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            font-weight: bold;
        `;

        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTop.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 20px rgba(212, 175, 55, 0.4)';
        });

        backToTop.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }

    createBackToTop();


    // ============================================
    // ANALYTICS & TRACKING (Optional)
    // ============================================

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);

            // In production, send to analytics service:
            // gtag('event', 'button_click', { button_name: buttonText });
        });
    });

    // Track service card views
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceName = entry.target.querySelector('h3').textContent;
                console.log('Service viewed:', serviceName);
                // In production, send to analytics
            }
        });
    }, { threshold: 0.5 });

    serviceCards.forEach(card => serviceObserver.observe(card));


    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedHighlight = debounce(highlightNavigation, 100);
    window.addEventListener('scroll', debouncedHighlight);


    // ============================================
    // CONSOLE MESSAGE
    // ============================================

    console.log('%c🔱 Crown & Blade Barbershop', 'font-size: 24px; font-weight: bold; color: #d4af37;');
    console.log('%cSharp Cuts. Clean Look. Your Crown, Our Craft.', 'font-size: 14px; color: #b8b8b8; font-style: italic;');
    console.log('%c📍 Makutano, Kapenguria, West Pokot County, Kenya', 'font-size: 12px; color: #666;');
    console.log('%c📞 +254 768 055 069', 'font-size: 12px; color: #666;');


    // ============================================
    // INITIAL SETUP
    // ============================================

    // Trigger animations on load
    window.dispatchEvent(new Event('scroll'));

    // Log successful initialization
    console.log('✓ Crown & Blade website initialized successfully');

});


// ============================================
// LIGHTBOX STYLES (Dynamic CSS)
// ============================================

const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 4px;
        box-shadow: 0 10px 50px rgba(212, 175, 55, 0.3);
    }
    
    .lightbox-content p {
        color: var(--gold);
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 3rem;
        color: var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 300;
        line-height: 1;
    }
    
    .lightbox-close:hover {
        color: var(--gold-light);
        transform: rotate(90deg);
    }
    
    @media (max-width: 768px) {
        .lightbox-close {
            top: -50px;
            right: 10px;
            font-size: 2.5rem;
        }
        
        .lightbox-content img {
            max-height: 70vh;
        }
    }
`;
document.head.appendChild(lightboxStyles);


// ============================================
// SERVICE WORKER REGISTRATION (Optional - PWA)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('ServiceWorker registered'))
        //     .catch(err => console.log('ServiceWorker registration failed'));
    });
}


