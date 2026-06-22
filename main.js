document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Header is fixed, we need to offset by its height
                const headerOffset = document.querySelector('.header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Trigger the very first section immediately if it's already in view
    setTimeout(() => {
        const firstSections = document.querySelectorAll('.intro-section.reveal, .split-section.reveal');
        firstSections.forEach(el => el.classList.add('active'));
    }, 100);

    // --- Lightbox Implementation ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        // Select all images we want to view in lightbox
        const galleryImages = Array.from(document.querySelectorAll('.draft-layout-top img, .bottom-left-gallery img, .carousel-card, .about-cat-img, .als-left-posters img, .als-grid-gallery img, .mosquito-gallery img, .mosquito-flex-gallery img, .local-marquee-content img'));
        
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = galleryImages[currentIndex].src;
            lightbox.classList.add('active');
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentIndex].src;
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });

        // Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) showNext(); // Swipe left
            if (touchEndX > touchStartX + 50) showPrev(); // Swipe right
        }, {passive: true});
    }
});

    // --- Custom Cursor Logic ---
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
        });

        document.addEventListener('mousedown', () => {
            customCursor.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            customCursor.classList.remove('clicking');
        });
    }
