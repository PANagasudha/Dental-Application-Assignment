
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header on Scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add 'scrolled' class after 50px scroll
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Form Validation Example (client-side only)
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const nameInput = document.getElementById('name');
            const mobileInput = document.getElementById('mobile');
            const captchaInput = document.getElementById('captcha');
            const captchaCodeSpan = document.querySelector('.captcha-code');
            const captchaCode = captchaCodeSpan ? captchaCodeSpan.textContent.trim() : ''; // Get current captcha code

            let isValid = true;

            if (nameInput.value.trim() === '') {
                alert('Please enter your Name.');
                isValid = false;
                nameInput.focus();
                return;
            }

            // Basic mobile number validation (10 digits)
            if (mobileInput.value.trim() === '' || !/^\d{10}$/.test(mobileInput.value.trim())) {
                alert('Please enter a valid 10-digit Mobile Number.');
                isValid = false;
                mobileInput.focus();
                return;
            }

            // Captcha validation
            if (captchaInput.value.trim() !== captchaCode) {
                alert('Incorrect Captcha. Please try again.');
                isValid = false;
                captchaInput.focus();
                // Optional: generate new captcha code here
                // captchaCodeSpan.textContent = Math.floor(1000 + Math.random() * 9000);
                return;
            }

            if (isValid) {
                // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
                alert('Form submitted successfully! (This is a demo, no actual submission)');
                consultationForm.reset(); // Clear the form fields
            }
        });
    }

    // 3. Elements Fade-in on Scroll (using Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});