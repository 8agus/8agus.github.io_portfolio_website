// Modal functionality for project cards
document.addEventListener('DOMContentLoaded', function() {
    initCaseStudiesAccordion();

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

    function initCaseStudiesAccordion() {
        const items = document.querySelectorAll('[data-case-study]');

        if (!items.length) {
            return;
        }

        function closeItem(item, withScroll) {
            const button = item.querySelector('[data-case-study-toggle]');
            const content = item.querySelector('[data-case-study-content]');
            const preview = item.querySelector('.case-study-preview');

            if (button) {
                button.setAttribute('aria-expanded', 'false');
                button.textContent = 'Read Full Case Study';
            }

            if (content) {
                content.hidden = true;
            }

            item.classList.remove('is-open');

            if (withScroll && preview) {
                preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function openItem(item) {
            const button = item.querySelector('[data-case-study-toggle]');
            const content = item.querySelector('[data-case-study-content]');

            if (content) {
                content.hidden = false;
            }

            if (button) {
                button.setAttribute('aria-expanded', 'true');
                button.textContent = 'Close Full Case Study';
            }

            item.classList.add('is-open');
        }

        items.forEach(item => {
            const button = item.querySelector('[data-case-study-toggle]');
            const collapseButton = item.querySelector('[data-case-study-collapse]');
            const content = item.querySelector('[data-case-study-content]');

            if (!button || !content) {
                return;
            }

            button.addEventListener('click', function() {
                const isOpen = item.classList.contains('is-open');

                items.forEach(otherItem => {
                    closeItem(otherItem, false);
                });

                if (!isOpen) {
                    openItem(item);
                }
            });

            if (collapseButton) {
                collapseButton.addEventListener('click', function() {
                    closeItem(item, true);
                });
            }
        });

        // Keep Saffas visually highlighted by default without auto-expanding full content.
        const defaultHighlighted = document.querySelector('[data-case-study].is-highlighted');
        if (!defaultHighlighted) {
            items[0].classList.add('is-highlighted');
        }
    }
});
