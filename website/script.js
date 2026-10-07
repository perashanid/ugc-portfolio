// Smooth scrolling for navigation links
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

// Hero slideshow - video in phone, images on right
let currentPhoneSlide = 0;
let currentHeroSlide = 0;
let phoneSlides = [];
let heroSlides = [];
let videosStarted = false;

// Initialize slideshow after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    phoneSlides = document.querySelectorAll('.phone-slide');
    heroSlides = document.querySelectorAll('.hero-slide');
    
    // Try to play the first video
    startVideos();
    
    // Start videos on any user interaction (for browsers that block autoplay)
    document.body.addEventListener('click', startVideos, { once: true });
    document.body.addEventListener('scroll', startVideos, { once: true });
    document.body.addEventListener('touchstart', startVideos, { once: true });
    
    // Change slides every 4 seconds
    setInterval(showNextSlides, 4000);
});

function startVideos() {
    if (videosStarted) return;
    videosStarted = true;
    
    if (phoneSlides.length > 0 && phoneSlides[0].tagName === 'VIDEO') {
        phoneSlides[0].play().catch(e => console.log('Video autoplay failed:', e));
    }
}

function showNextSlides() {
    // Handle phone video slides
    if (phoneSlides.length > 0) {
        phoneSlides[currentPhoneSlide].classList.remove('active');
        
        if (phoneSlides[currentPhoneSlide].tagName === 'VIDEO') {
            phoneSlides[currentPhoneSlide].pause();
            phoneSlides[currentPhoneSlide].currentTime = 0;
        }
        
        currentPhoneSlide = (currentPhoneSlide + 1) % phoneSlides.length;
        
        phoneSlides[currentPhoneSlide].classList.add('active');
        
        if (phoneSlides[currentPhoneSlide].tagName === 'VIDEO') {
            phoneSlides[currentPhoneSlide].play().catch(e => console.log('Video play failed:', e));
        }
    }
    
    // Handle hero image slides (right side)
    if (heroSlides.length > 0) {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }
}

// Active navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio item click handlers
document.querySelectorAll('.portfolio-item').forEach(item => {
    const video = item.querySelector('video');
    
    if (video) {
        // Play video on hover
        item.addEventListener('mouseenter', function() {
            video.play().catch(e => console.log('Video play failed:', e));
        });
        
        // Pause video on mouse leave
        item.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    }
    
    item.addEventListener('click', function() {
        console.log('Video player would open here');
        alert('Video player would open here in a full implementation');
    });
});

// Creator card click handlers
document.querySelectorAll('.creator-card').forEach(card => {
    card.addEventListener('click', function() {
        const creatorName = this.querySelector('h3').textContent;
        console.log(`Viewing creator: ${creatorName}`);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.review-card, .portfolio-item, .creator-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    setInterval(() => {
        scrollIndicator.style.transform = 'translateY(10px)';
        setTimeout(() => {
            scrollIndicator.style.transform = 'translateY(0)';
        }, 500);
    }, 2000);
    scrollIndicator.style.transition = 'transform 0.5s ease';
}

// Parallax effect for hero images (disabled during slideshow)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const heroImages = document.querySelectorAll('.hero-right img');
//     
//     heroImages.forEach((img, index) => {
//         const speed = 0.5 + (index * 0.2);
//         img.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
//     });
// });

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('UGC Marketplace Platform - Built with vanilla JavaScript');
