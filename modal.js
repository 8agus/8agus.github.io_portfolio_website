// Modal functionality for project cards
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    
    // Generic selector — any future .project-card is automatically supported
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const modal = card.querySelector('.modal');
        
        if (modal) {
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Close modal');
            modal.appendChild(closeBtn);
            
            // Open modal on card click
            card.addEventListener('click', function(e) {
                if (modal.classList.contains('active') || card.classList.contains('modal-open')) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
                modal.classList.add('active');
                overlay.classList.add('active');
                card.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            });
            
            // Close modal on close button click
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                closeModal(modal, card);
            });
            
            // Prevent modal content clicks from bubbling to card
            modal.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Allow links and buttons inside modal to work
            const modalLinks = modal.querySelectorAll('a, button');
            modalLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        }
    });
    
    // Close modal when clicking overlay
    overlay.addEventListener('click', function() {
        const activeModal = document.querySelector('.modal.active');
        const activeCard = document.querySelector('.project-card.modal-open');
        if (activeModal) {
            closeModal(activeModal, activeCard);
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            const activeCard = document.querySelector('.project-card.modal-open');
            if (activeModal) {
                closeModal(activeModal, activeCard);
            }
        }
    });
    
    function closeModal(modal, card) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        if (card) {
            card.classList.remove('modal-open');
        }
        document.body.style.overflow = '';
    }
});
