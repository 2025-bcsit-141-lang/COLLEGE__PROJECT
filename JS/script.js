document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle 
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☼' : '☪';
    });

    // Mobile Menu
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// nav section ma before after effect halera interactivity try gareko

 const sections = document.querySelectorAll('section[id]');
    // sabei nav leko
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // kunchei section ma xa vnera check gareko
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset for navbar
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // active wala css ma gareko before after shift gardina section ma
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    //image slider 
const newsGrid = document.querySelector(".news-grid");
const newsCards = document.querySelectorAll(".news-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 0;
let cardsPerPage;
let totalPages;

function updateSettings() {

    if (window.innerWidth <= 768) {
        cardsPerPage = 1;
    }
    else if (window.innerWidth <= 992) {
        cardsPerPage = 2;
    }
    else {
        cardsPerPage = 3;
    }

    totalPages = Math.ceil(newsCards.length / cardsPerPage);

    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }

    updateSlider();
}

function updateSlider() {

    const pageWidth = newsGrid.parentElement.offsetWidth;
    newsGrid.style.transform = `translateX(-${currentPage * pageWidth}px)`;

}

nextBtn.addEventListener("click", () => {

    currentPage++;

    if (currentPage >= totalPages) {
        currentPage = 0;
    }

    updateSlider();

});

prevBtn.addEventListener("click", () => {

    currentPage--;

    if (currentPage < 0) {
        currentPage = totalPages - 1;
    }

    updateSlider();

});

window.addEventListener("resize", updateSettings);

updateSettings();

    
//form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                id: Date.now(),
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toLocaleString()
            };
            
            // Get existing submissions 
            let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            
            // Add new submission
            submissions.push(formData);
            
            // Save to localStorage
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));
            
            // Show success message
            alert('✅ Message sent successfully!');
            
            // Reset form
            contactForm.reset();
        });
    }
});
