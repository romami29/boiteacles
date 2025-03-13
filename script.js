document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du color picker
    const colorPickerPanel = document.querySelector('.color-picker-panel');
    const colorPickerToggle = document.querySelector('.color-picker-toggle');
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const primaryPreview = document.getElementById('primary-preview');
    const secondaryPreview = document.getElementById('secondary-preview');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const resetColorsBtn = document.getElementById('reset-colors');
    
    // Configuration des valeurs par défaut
    const defaultPrimaryColor = '#1a5276';
    const defaultSecondaryColor = '#f39c12';
    
    // Initialisation des couleurs
    setColors(primaryColorInput.value, secondaryColorInput.value);
    updateColorPreviews();
    
    // Ouvrir/fermer le panel de sélection de couleurs
    colorPickerToggle.addEventListener('click', function() {
        colorPickerPanel.classList.toggle('open');
    });
    
    // Écouteurs d'événements pour les changements de couleur
    primaryColorInput.addEventListener('input', function() {
        setColors(primaryColorInput.value, secondaryColorInput.value);
        updateColorPreviews();
    });
    
    secondaryColorInput.addEventListener('input', function() {
        setColors(primaryColorInput.value, secondaryColorInput.value);
        updateColorPreviews();
    });
    
    // Gestion des presets de couleurs
    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const primaryColor = this.dataset.primary;
            const secondaryColor = this.dataset.secondary;
            
            primaryColorInput.value = primaryColor;
            secondaryColorInput.value = secondaryColor;
            
            setColors(primaryColor, secondaryColor);
            updateColorPreviews();
        });
    });
    
    // Réinitialiser les couleurs
    resetColorsBtn.addEventListener('click', function() {
        primaryColorInput.value = defaultPrimaryColor;
        secondaryColorInput.value = defaultSecondaryColor;
        
        setColors(defaultPrimaryColor, defaultSecondaryColor);
        updateColorPreviews();
    });
    
    // Fonction pour définir les couleurs CSS
    function setColors(primaryColor, secondaryColor) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        
        // Stocker les couleurs dans localStorage pour les conserver entre les sessions
        localStorage.setItem('primaryColor', primaryColor);
        localStorage.setItem('secondaryColor', secondaryColor);
    }
    
    // Fonction pour mettre à jour les prévisualisations de couleurs
    function updateColorPreviews() {
        primaryPreview.textContent = primaryColorInput.value;
        secondaryPreview.textContent = secondaryColorInput.value;
    }
    
    // Récupérer les couleurs stockées dans localStorage
    function loadSavedColors() {
        const savedPrimaryColor = localStorage.getItem('primaryColor');
        const savedSecondaryColor = localStorage.getItem('secondaryColor');
        
        if (savedPrimaryColor && savedSecondaryColor) {
            primaryColorInput.value = savedPrimaryColor;
            secondaryColorInput.value = savedSecondaryColor;
            setColors(savedPrimaryColor, savedSecondaryColor);
            updateColorPreviews();
        }
    }
    
    // Charger les couleurs sauvegardées
    loadSavedColors();
    
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
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observation des éléments à animer
document.querySelectorAll('.service-card, .location-card, .testimonial').forEach(element => {
    observer.observe(element);
});
