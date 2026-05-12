// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const THEME_STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-mode', isLight);

    if (themeIcon) {
        themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }

    if (themeText) {
        themeText.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label',
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
        );
    }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        const nextTheme = isLight ? 'dark' : 'light';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList) {
            navList.classList.remove('active');
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll('.skill-progress-bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

// Initialize skill bars as 0 width
window.addEventListener('load', () => {
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// Animate on scroll
window.addEventListener('scroll', animateSkillBars);

// Contact form submission
let popupHideTimer;

function getContactApiUrl() {
    const isLocalHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const isLiveServerPort = /^55\d{2}$/.test(window.location.port);

    // VS Code Live Server cannot run /api functions, so route to Vercel local runtime.
    if (isLocalHost && isLiveServerPort) {
        return 'http://localhost:3000/api/contact-telegram';
    }

    return '/api/contact-telegram';
}

function hideMessagePopup() {
    const popup = document.getElementById('message-popup');
    if (!popup) return;

    popup.classList.remove('show');
}

function showMessagePopup(title, message, type = 'success') {
    let popup = document.getElementById('message-popup');

    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'message-popup';
        popup.className = 'message-popup';
        popup.setAttribute('role', 'status');
        popup.setAttribute('aria-live', 'polite');
        popup.innerHTML = `
            <div class="message-popup-icon">
                <i class="fas fa-circle-check"></i>
            </div>
            <div class="message-popup-content">
                <h4 id="message-popup-title"></h4>
                <p id="message-popup-text"></p>
            </div>
            <button type="button" class="message-popup-close" aria-label="Close message popup">
                <i class="fas fa-xmark"></i>
            </button>
        `;

        document.body.appendChild(popup);

        const closeButton = popup.querySelector('.message-popup-close');
        closeButton.addEventListener('click', () => {
            hideMessagePopup();
            clearTimeout(popupHideTimer);
        });
    }

    const titleElement = popup.querySelector('#message-popup-title');
    const textElement = popup.querySelector('#message-popup-text');
    const iconElement = popup.querySelector('.message-popup-icon i');

    titleElement.textContent = title;
    textElement.textContent = message;
    popup.classList.remove('success', 'error');
    popup.classList.add(type);
    iconElement.className = type === 'error' ? 'fas fa-circle-exclamation' : 'fas fa-circle-check';

    popup.classList.add('show');

    clearTimeout(popupHideTimer);
    popupHideTimer = setTimeout(() => {
        hideMessagePopup();
    }, 4500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(contactForm);
        const payload = {
            name: formData.get('name')?.toString().trim() || '',
            email: formData.get('email')?.toString().trim() || '',
            subject: formData.get('subject')?.toString().trim() || '',
            message: formData.get('message')?.toString().trim() || ''
        };

        if (!payload.name || !payload.email || !payload.subject || !payload.message) {
            showMessagePopup(
                'Missing Information',
                'Please complete all fields before sending your message.',
                'error'
            );
            return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(getContactApiUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            showMessagePopup(
                'Message Sent Successfully',
                'Thank you for reaching out. I will get back to you soon.',
                'success'
            );
            contactForm.reset();
        } catch (_error) {
            showMessagePopup(
                'Unable To Send Message',
                'Please try again in a moment or contact me directly by email.',
                'error'
            );
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
