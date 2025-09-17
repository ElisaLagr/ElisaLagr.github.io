// ===== Wedding Website JavaScript =====

// Wedding date: August 14th, 2026
const weddingDate = new Date('2026-08-14T19:00:00').getTime();

// ===== Countdown Timer =====
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown display with leading zeros
        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Wedding day has arrived!
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Replace countdown section with celebration message
        const countdownSection = document.querySelector('.countdown-timer');
        if (countdownSection) {
            countdownSection.innerHTML = `
                <div style="text-align: center; padding: 50px 20px;">
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--accent-color); margin-bottom: 20px;">
                        🎉 C'est le jour J ! 🎉
                    </h3>
                    <p style="font-size: 1.2rem; color: var(--text-light);">
                        Le grand jour est enfin arrivé ! Nous avons hâte de célébrer avec vous.
                    </p>
                </div>
            `;
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ===== RSVP Form Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const dietaryGroup = document.getElementById('dietaryGroup');
    const songGroup = document.getElementById('songGroup');

    // Show/hide additional fields based on attendance selection
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestCountGroup.style.display = 'block';
                songGroup.style.display = 'block';
                dietaryGroup.style.display = 'block';
                
                // Add smooth slide-down animation
                setTimeout(() => {
                    guestCountGroup.style.opacity = '1';
                    guestCountGroup.style.transform = 'translateY(0)';
                    songGroup.style.opacity = '1';
                    songGroup.style.transform = 'translateY(0)';
                    dietaryGroup.style.opacity = '1';
                    dietaryGroup.style.transform = 'translateY(0)';
                }, 50);
            } else {
                guestCountGroup.style.display = 'none';
                songGroup.style.display = 'none';
                dietaryGroup.style.display = 'none';
            }
        });
    });

    // Style additional form groups for animation
    [guestCountGroup, songGroup, dietaryGroup].forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.4s ease';
    });
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        font-family: 'Lora', serif;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== Smooth Scrolling for Navigation =====
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const invitationSection = document.querySelector('.invitation-section');
            if (invitationSection) {
                invitationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add smooth scroll to map links
    const mapLinks = document.querySelectorAll('.map-link');
    mapLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small animation to indicate the link was clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// ===== Scroll-triggered Animations =====
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.ceremony-item, .address-card, .contact-card, .time-unit');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state for elements that need scroll animation
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== Floating Hearts Animation Enhancement =====
function enhanceFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    // Add more hearts periodically
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.1 + 0.05;
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heartsContainer.contains(heart)) {
                heartsContainer.removeChild(heart);
            }
        }, 13000);
    }, 3000);
}

// ===== Form Validation Enhancement =====
function enhanceFormValidation() {
    const form = document.getElementById('rsvpForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation styles on input
            this.style.borderColor = '';
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire';
    }
    
    // Apply validation styles
    if (!isValid) {
        field.style.borderColor = '#ff6b6b';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #ff6b6b;
            font-size: 0.8rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
    } else if (value) {
        field.style.borderColor = '#4ecdc4';
    }
    
    return isValid;
}

// ===== Phone Number Formatting =====
function formatPhoneLinks() {
    const phoneLinks = document.querySelectorAll('.phone-link');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== Initialize All Features =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    handleScrollAnimations();
    enhanceFloatingHearts();
    enhanceFormValidation();
    formatPhoneLinks();
    
    // Add some sparkle to the loading experience
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('💕 Michel & Elisa Wedding Website Loaded Successfully! 💕');
});

// ===== Subtle Parallax Effect for Hero Section (Optional) =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    // Only apply parallax if not too much scroll to avoid disappearing text
    if (heroContent && scrolled < window.innerHeight * 0.5) {
        const rate = scrolled * -0.1; // Reduced parallax effect
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// ===== Add CSS for notification animation =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Surprise animation!
        const hearts = document.querySelectorAll('.floating-hearts i');
        hearts.forEach(heart => {
            heart.style.color = '#ff6b9d';
            heart.style.opacity = '0.8';
            heart.style.fontSize = '30px';
            heart.style.animationDuration = '2s';
        });
        
        showNotification('💕 Vous avez trouvé notre secret ! Amour supplémentaire pour vous ! 💕', 'success');
        konamiCode = []; // Reset
    }
});

// ===== GOOGLE APPS SCRIPT RSVP INTEGRATION =====

// Configuration Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwg8R78GNSVd8HfUMjIEbpRUPh24OuosrE6-cyF-4-y8byegvsRTBnJdHHoU2OSnm8vyQ/exec';

// RSVP Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const responseMessage = document.getElementById('responseMessage');
    
    // Gestion de l'affichage conditionnel des champs
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const songGroup = document.getElementById('songGroup');
    const dietaryGroup = document.getElementById('dietaryGroup');
    
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestCountGroup.style.display = 'block';
                songGroup.style.display = 'block';
                dietaryGroup.style.display = 'block';
            } else {
                guestCountGroup.style.display = 'none';
                songGroup.style.display = 'none';
                dietaryGroup.style.display = 'none';
                // Reset les champs cachés
                document.getElementById('guestCount').value = '1';
                document.getElementById('songRequest').value = '';
                document.getElementById('dietary').value = '';
            }
        });
    });
    
    // Soumission du formulaire
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Animation bouton loading
            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi en cours...</span>';
            submitBtn.classList.add('loading');
            
            // Masquer les anciens messages
            responseMessage.style.display = 'none';
            
            // Collecter les données
            const formData = {
                guestName: document.getElementById('guestName').value.trim(),
                guestEmail: document.getElementById('guestEmail').value.trim(),
                attendance: document.querySelector('input[name="attendance"]:checked')?.value || '',
                guestCount: document.querySelector('input[name="attendance"]:checked')?.value === 'yes' ? 
                           document.getElementById('guestCount').value : '',
                songRequest: document.getElementById('songRequest').value.trim(),
                dietary: document.getElementById('dietary').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Succès - Afficher message de confirmation
                    responseMessage.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h4>✨ Parfait !</h4>
                            <p>Votre réponse a été enregistrée avec succès.<br>Merci beaucoup ! 💕</p>
                        </div>
                    `;
                    responseMessage.className = 'response-message success';
                    responseMessage.style.display = 'block';
                    
                    // Reset du formulaire
                    rsvpForm.reset();
                    guestCountGroup.style.display = 'none';
                    songGroup.style.display = 'none';
                    dietaryGroup.style.display = 'none';
                    
                    // Faire défiler vers le message
                    responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Masquer le message après 8 secondes
                    setTimeout(() => {
                        responseMessage.style.display = 'none';
                    }, 8000);
                    
                } else {
                    throw new Error(result.message || 'Erreur lors de l\'envoi');
                }
                
            } catch (error) {
                console.error('Erreur:', error);
                responseMessage.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h4>❌ Oups !</h4>
                        <p>Une erreur s'est produite lors de l'envoi.<br>Veuillez réessayer dans quelques instants.</p>
                    </div>
                `;
                responseMessage.className = 'response-message error';
                responseMessage.style.display = 'block';
                
                // Faire défiler vers le message d'erreur
                responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
                // Restaurer le bouton
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                submitBtn.classList.remove('loading');
            }
        });
    }
});