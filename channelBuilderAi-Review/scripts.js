// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timers
    initializeCountdowns();
    
    // Initialize FAQ accordions
    initializeFAQs();
    
    // Track performance
    trackPerformance();
});

// Countdown Timer Implementation
function initializeCountdowns() {
    // Set expiration date (3 days from now)
    const expirationDate = new Date('2025-05-20T19:47:46Z');
    
    // Update all countdowns every second
    function updateCountdowns() {
        const now = new Date();
        const timeLeft = expirationDate - now;
        
        if (timeLeft <= 0) {
            // If expired, update all countdown displays
            document.querySelectorAll('.main-countdown, .bonus-countdown').forEach(countdown => {
                countdown.innerHTML = '<div class="time-block"><span class="number">EXPIRED</span></div>';
            });
            return;
        }
        
        // Calculate time units
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update main countdown
        if (document.getElementById('hours')) {
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update bonus countdown
        if (document.getElementById('bonus-hours')) {
            document.getElementById('bonus-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('bonus-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('bonus-seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Initial update
    updateCountdowns();
    
    // Update every second
    setInterval(updateCountdowns, 1000);
}

// FAQ Accordion Implementation
function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Performance Tracking
function trackPerformance() {
    // Track page load performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = window.performance.timing;
            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
    
    // Track user interactions
    document.addEventListener('click', e => {
        const target = e.target;
        
        // Track CTA button clicks
        if (target.classList.contains('cta-button')) {
            console.log('CTA Button Clicked:', target.href);
        }
        
        // Track bonus card interactions
        if (target.closest('.bonus-card')) {
            console.log('Bonus Card Interaction:', target.closest('.bonus-card').querySelector('h3').textContent);
        }
    });
}

// Lazy Loading Implementation
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scroll Implementation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update Dynamic Content
function updateDynamicContent() {
    const lastUpdated = new Date('2025-05-17T19:47:46Z');
    
    // Update all date references
    document.querySelectorAll('.current-date').forEach(el => {
        el.textContent = lastUpdated.toLocaleDateString();
    });
    
    // Update username references
    document.querySelectorAll('.user-login').forEach(el => {
        el.textContent = 'Yassinosml';
    });
    
    // Calculate and update total bonus value
    const totalBonusValue = 645; // Fixed value from your content
    document.querySelectorAll('.total-amount').forEach(el => {
        el.textContent = `$${totalBonusValue}`;
    });
}

// Initialize everything
window.addEventListener('load', () => {
    initializeSmoothScroll();
    lazyLoadImages();
    updateDynamicContent();
});

// Console welcome message
console.log(`
ChannelBuilder AI Landing Page
Version: 1.0.0
Last Updated: 2025-05-17 19:47:46
Created by: Yassinosml
`);