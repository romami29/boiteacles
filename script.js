document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments de sélection de couleur
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    
    // Configuration des valeurs par défaut
    const defaultPrimaryColor = '#1a5276';
    const defaultSecondaryColor = '#f39c12';
    
    // Initialisation des couleurs
    setColors(primaryColorInput.value, secondaryColorInput.value);
    
    // Écouteurs d'événements pour les changements de couleur
    primaryColorInput.addEventListener('input', function() {
        setColors(primaryColorInput.value, secondaryColorInput.value);
    });
    
    secondaryColorInput.addEventListener('input', function() {
        setColors(primaryColorInput.value, secondaryColorInput.value);
    });
    
    // Fonction pour définir les couleurs CSS
    function setColors(primaryColor, secondaryColor) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }
    
    // Animation de défilement fluide pour les liens de navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Formulaire de contact - Empêcher la soumission par défaut
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi de formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simuler un délai de traitement
            setTimeout(() => {
                alert('Message envoyé avec succès ! Nous vous contacterons prochainement.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Effet parallaxe pour l'image d'en-tête
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const scrollPosition = window.pageYOffset;
        
        // Effet de parallaxe
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
    
    // Animation des cartes service au défilement
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments qui doivent être animés
    document.querySelectorAll('.service-card, .location-card, .testimonial').forEach(item => {
        observer.observe(item);
    });
    
    // Ajouter la classe pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .location-card, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
