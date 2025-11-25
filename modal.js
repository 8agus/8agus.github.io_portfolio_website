// Modal functionality for project cards
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    
    // Get all project boxes
    const projectBoxes = document.querySelectorAll('.lamboBox, .compWebBox, .webCompBox, .finWebBox, .comLineBox');
    
    projectBoxes.forEach(box => {
        const modal = box.querySelector('.modal');
        
        if (modal) {
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Close modal');
            modal.appendChild(closeBtn);
            
            // Open modal on click
            box.addEventListener('click', function(e) {
                // Don't open if already open or if clicking inside modal
                if (modal.classList.contains('active') || box.classList.contains('modal-open')) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
                modal.classList.add('active');
                overlay.classList.add('active');
                box.classList.add('modal-open'); // Mark box as having open modal
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
            
            // Close modal on close button click
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                modal.classList.remove('active');
                overlay.classList.remove('active');
                box.classList.remove('modal-open'); // Remove modal-open class
                document.body.style.overflow = ''; // Restore scrolling
            });
            
            // Prevent modal content clicks from closing or triggering box click
            modal.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Prevent links inside modal from being blocked
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
        if (activeModal) {
            activeModal.classList.remove('active');
            overlay.classList.remove('active');
            // Remove modal-open from all boxes
            projectBoxes.forEach(box => box.classList.remove('modal-open'));
            document.body.style.overflow = '';
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                overlay.classList.remove('active');
                // Remove modal-open from all boxes
                projectBoxes.forEach(box => box.classList.remove('modal-open'));
                document.body.style.overflow = '';
            }
        }
    });
});
