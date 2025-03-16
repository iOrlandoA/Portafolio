function initializeImagePanels() {
    const imagePanels = document.querySelectorAll('.image-panel');
    imagePanels.forEach((panel) => {
        const imageSlider = panel.querySelector('.image-slider');
        const prevBtn = panel.querySelector('.prev-btn');
        const nextBtn = panel.querySelector('.next-btn');
        const images = imageSlider.querySelectorAll('img');
        const frames = imageSlider.querySelectorAll('.frame');
        const totalIndex = images.length + frames.length;
        
        // Skip initialization if there are no images or frames
        if (totalIndex === 0) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            return;
        }
        
        let currentIndex = 0;
        const margin = 0;

        // Remove existing dots container if any
        const existingDotsContainer = panel.querySelector('.dots-container');
        if (existingDotsContainer) {
            existingDotsContainer.remove();
        }

        // Add dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots-container';
        
        for(let i = 0; i < totalIndex; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSliderPosition();
            });
            dotsContainer.appendChild(dot);
        }
        panel.appendChild(dotsContainer);

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalIndex - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        function updateSliderPosition() {
            const translateValue = -(currentIndex * (imageSlider.clientWidth + margin));
            imageSlider.style.transform = `translateX(${translateValue}px)`;
            
            // Update dots
            dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            if(currentIndex == 0){
                prevBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
            }
            if(currentIndex == totalIndex - 1){
                nextBtn.style.display = "none";
            }else{
                nextBtn.style.display = "block";
            }
        }
        
        updateSliderPosition();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // This will be called by projectsRenderer.js after projects are loaded
});

// Export the function to be called from projectsRenderer.js
window.initializeImagePanels = initializeImagePanels;