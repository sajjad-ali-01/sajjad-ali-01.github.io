// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.typing-text', {
        strings: ['Software Engineer', 'Android Developer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});

// Smooth Scrolling for Anchor Links
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
            
            // Update active class on click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Add scrolled class to header
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollToTopBtn.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('active');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
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

// Scroll to Top Button
document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
document.getElementById('menu').addEventListener('click', function() {
    this.classList.toggle('fa-times');
    document.querySelector('.navbar').classList.toggle('active');
});

// Close Mobile Menu when clicking a link
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navbar').classList.remove('active');
        document.getElementById('menu').classList.remove('fa-times');
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Initialize EmailJS
// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("UyDqTub7rmhs9L69G"); // Replace with your actual public key
})();

// Form Submission Handler
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    submitForm();
});

// Contact Form Submission
function submitForm() {
    const form = document.getElementById('contact-form');
    const button = form.querySelector('button');
    const buttonText = button.querySelector('.btn-text');
    const buttonIcon = button.querySelector('.btn-icon');

    // Show loading state
    buttonText.textContent = 'Sending...';
    buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Send email using EmailJS
    emailjs.sendForm("service_b20d5aj", "template_na0nbbk", form)
        .then(function(response) {
            console.log('Email sent successfully!', response);
            buttonText.textContent = 'Message Sent!';
            buttonIcon.innerHTML = '<i class="fas fa-check"></i>';
            form.reset();
            
            setTimeout(() => {
                buttonText.textContent = 'Send Message';
                buttonIcon.innerHTML = '<i class="fa fa-paper-plane"></i>';
            }, 3000);
        }, function(error) {
            console.error('Email failed to send:', error);
            buttonText.textContent = 'Failed to Send';
            buttonIcon.innerHTML = '<i class="fas fa-times"></i>';
            
            setTimeout(() => {
                buttonText.textContent = 'Send Message';
                buttonIcon.innerHTML = '<i class="fa fa-paper-plane"></i>';
            }, 3000);
        });
}
// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.project-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectBoxes.forEach(box => {
            if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize VanillaTilt for images
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate skill bars when skills section is in view
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

observer.observe(skillsSection);