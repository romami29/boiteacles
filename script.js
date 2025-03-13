document.addEventListener('DOMContentLoaded', function() {
    // Gestion du panneau de sélection de couleurs
    const colorPanel = document.querySelector('.color-picker-panel');
    const colorToggle = document.querySelector('.color-picker-toggle');
    
    colorToggle.addEventListener('click', function() {
        colorPanel.classList.toggle('open');
    });
    
    // Mise à jour des couleurs
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const primaryPreview = document.getElementById('primary-preview');
    const secondaryPreview = document.getElementById('secondary-preview');
    const presetButtons = document.querySelectorAll('.preset-btn');
    const resetButton = document.getElementById('reset-colors');
    
    // Fonctions pour mettre à jour les couleurs
    function updateColors(primary, secondary) {
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        primaryColorInput.value = primary;
        secondaryColorInput.value = secondary;
        primaryPreview.textContent = primary;
        secondaryPreview.textContent = secondary;
    }
    
    // Écouteurs d'événements pour les inputs de couleur
    primaryColorInput.addEventListener('input', function() {
        document.documentElement.style.setProperty('--primary-color', this.value);
        primaryPreview.textContent = this.value;
    });
    
    secondaryColorInput.addEventListener('input', function() {
        document.documentElement.style.setProperty('--secondary-color', this.value);
        secondaryPreview.textContent = this.value;
    });
    
    // Gestion des préréglages
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const primary = this.getAttribute('data-primary');
            const secondary = this.getAttribute('data-secondary');
            updateColors(primary, secondary);
        });
    });
    
    // Réinitialisation des couleurs
    resetButton.addEventListener('click', function() {
        updateColors('#1a5276', '#f39c12');
    });
    
    // Animation au défilement
    const animElements = document.querySelectorAll('.service-card, .location-card, .testimonial');
    
    function checkScroll() {
        animElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    }
    
    // Vérifier au chargement et au défilement
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});
