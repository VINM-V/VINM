// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    // For now, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Tool Modal Functions
function openToolModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeToolModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Plagiarism Checker
// async function checkPlagiarism() {
//     const text = document.getElementById('plagiarism-text').value;
//     const resultsContainer = document.getElementById('plagiarism-results');
    
//     if (!text.trim()) {
//         alert('Please enter some text to check');
//         return;
//     }

//     try {
//         resultsContainer.innerHTML = '<p>Checking for plagiarism...</p>';
//         resultsContainer.classList.add('active');

//         // Replace this with your actual API endpoint
//         const response = await fetch('https://api.plagiarism-checker.com/check', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'API-Key': 'YOUR_API_KEY'
//             },
//             body: JSON.stringify({ text })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to check plagiarism');
//         }

//         const data = await response.json();
        
//         // Display results
//         let resultsHTML = `
//             <h3>Plagiarism Check Results</h3>
//             <p>Similarity Score: ${data.similarityScore}%</p>
//             <div class="matches">
//                 <h4>Matching Sources:</h4>
//                 <ul>
//                     ${data.matches.map(match => `
//                         <li>
//                             <p>Source: ${match.source}</p>
//                             <p>Similarity: ${match.similarity}%</p>
//                         </li>
//                     `).join('')}
//                 </ul>
//             </div>
//         `;
        
//         resultsContainer.innerHTML = resultsHTML;
//     } catch (error) {
//         resultsContainer.innerHTML = `
//             <div class="error">
//                 <p>Demo Mode: This is a demonstration of the plagiarism checker interface.</p>
//                 <p>To enable actual checking, please integrate with a plagiarism detection API.</p>
//             </div>
//         `;
//     }
// }

// // Code Analyzer
// function analyzeCode() {
//     const code = document.getElementById('code-input').value;
//     const resultsContainer = document.getElementById('code-results');
    
//     if (!code.trim()) {
//         alert('Please enter some code to analyze');
//         return;
//     }

//     resultsContainer.innerHTML = '<p>Analyzing code...</p>';
//     resultsContainer.classList.add('active');

//     // Demo analysis results
//     setTimeout(() => {
//         const analysis = {
//             complexity: 'Medium',
//             maintainability: 'Good',
//             issues: [
//                 'Variable "x" is declared but never used',
//                 'Consider adding error handling for async operations',
//                 'Function "calculateTotal" exceeds recommended length'
//             ]
//         };

//         resultsContainer.innerHTML = `
//             <h3>Code Analysis Results</h3>
//             <p><strong>Complexity:</strong> ${analysis.complexity}</p>
//             <p><strong>Maintainability:</strong> ${analysis.maintainability}</p>
//             <div class="issues">
//                 <h4>Issues Found:</h4>
//                 <ul>
//                     ${analysis.issues.map(issue => `<li>${issue}</li>`).join('')}
//                 </ul>
//             </div>
//         `;
//     }, 1000);
// }

// // Circuit Simulator
// let circuitComponents = [];

// function initCircuitSimulator() {
//     const canvas = document.getElementById('circuit-canvas');
//     if (!canvas) return;

//     // Initialize canvas context and add event listeners
//     const ctx = canvas.getContext('2d');
    
//     // Add basic circuit drawing functionality here
//     // This is a placeholder for the actual circuit simulator implementation
// }

// Initialize circuit simulator when modal opens
document.getElementById('circuit-simulator-modal').addEventListener('show', initCircuitSimulator);



let slideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slider-container');
    const totalSlides = document.querySelectorAll('.project-card').length;
    slideIndex += direction;

    if (slideIndex < 0) {
        slideIndex = totalSlides - 1; // Loop to the last slide
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0; // Loop to the first slide
    }

    console.log('Current Slide Index:', slideIndex); // Debugging line
    console.log('Total Slides:', totalSlides); // Debugging line

    const offset = -slideIndex * (310 + 20); // Adjust based on card width and margin
    slides.style.transform = `translateX(${offset}px)`;
}

