document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Contact Form to Google Sheets ---
    // PASTE YOUR LONG GOOGLE SCRIPT URL INSIDE THESE QUOTES:
    const scriptURL = 'https://script.google.com/macros/s/YOUR_LONG_ID_HERE/exec'; 
    
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    msg.innerHTML = "Message sent successfully!";
                    submitBtn.innerHTML = "Send Message";
                    submitBtn.disabled = false;
                    
                    // Clear success message after 5 seconds
                    setTimeout(function(){
                        msg.innerHTML = "";
                    }, 5000);
                    
                    form.reset();
                })
                .catch(error => {
                    msg.style.color = "red";
                    msg.innerHTML = "Error! Please check your internet connection.";
                    submitBtn.innerHTML = "Send Message";
                    submitBtn.disabled = false;
                    console.error('Error!', error.message);
                });
        });
    }
});