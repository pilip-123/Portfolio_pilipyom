// Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.getElementById('nav-list');
        
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
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
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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