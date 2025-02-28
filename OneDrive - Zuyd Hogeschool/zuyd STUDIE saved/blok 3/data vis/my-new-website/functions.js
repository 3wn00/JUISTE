document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Modal functionality
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = `modal-${button.dataset.modal}`;
        document.getElementById(modalId).style.display = 'flex';
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.style.display = 'none';
        }
    });
});

function generateBinaryString(length) {
    return Array(length).fill().map(() => {
        let num = Math.random() > 0.5 ? '1' : '0';
        let opacity = Math.random() > 0.7 ? 1 : 0.2;  // 30% of numbers will be fully visible
        return `<span style="opacity: ${opacity}">${num}</span>`;
    }).join(' ');
}


// Function to create binary layers
function createBinaryLayers() {
    const layers = document.querySelectorAll('.binary-layer');
    
    layers.forEach((layer, index) => {
        let content = '';
        // Create multiple rows of binary
        for(let i = 0; i < 20; i++) {
            content += `<div style="margin: ${20 + Math.random() * 40}px 0">${generateBinaryString(100)}</div>`;
        }
        layer.innerHTML = content;
    });
}

// Initialize binary layers
createBinaryLayers();

// Regenerate on resize for better coverage
window.addEventListener('resize', createBinaryLayers);

// Variables to track zoom level
let currentZoom = 1;
const zoomFactor = 0.2;

// Function to open the modal with the clicked image
function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Reset zoom when opening new image
    currentZoom = 1;
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalImg.style.transform = `scale(${currentZoom})`;
    modalCaption.textContent = caption;
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Function to zoom in
function zoomIn() {
    currentZoom += zoomFactor;
    updateZoom();
}

// Function to zoom out
function zoomOut() {
    if (currentZoom > zoomFactor) {
        currentZoom -= zoomFactor;
        updateZoom();
    }
}

// Function to reset zoom
function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

// Function to update the zoom level
function updateZoom() {
    const modalImg = document.getElementById('modalImage');
    modalImg.style.transform = `scale(${currentZoom})`;
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}