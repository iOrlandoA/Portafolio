function initializeImagePanels() {
    const imagePanels = document.querySelectorAll('.image-panel');
    
    imagePanels.forEach((panel) => {
        const imageSlider = panel.querySelector('.image-slider');
        const prevBtn = panel.querySelector('.prev-btn');
        const nextBtn = panel.querySelector('.next-btn');
        const slides = [...imageSlider.querySelectorAll('img'), ...imageSlider.querySelectorAll('.frame')];
        const totalSlides = slides.length;
        
        // Skip initialization if there are no images or frames
        if (totalSlides === 0) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            return;
        }
        
        // If only one slide, hide navigation
        if (totalSlides === 1) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            return;
        }
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        let startPosX = 0;
        let currentTranslate = 0;
        
        // Set proper width for slides to ensure they take full width
        slides.forEach(slide => {
            slide.style.width = `${panel.clientWidth}px`;
        });
        
        // Remove existing dots container if any
        const existingDotsContainer = panel.querySelector('.dots-container');
        if (existingDotsContainer) {
            existingDotsContainer.remove();
        }

        // Add dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots-container';
        
        for(let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSliderPosition();
            });
            dotsContainer.appendChild(dot);
        }
        panel.appendChild(dotsContainer);

        // Navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });
        
        // Mouse events for drag
        imageSlider.addEventListener('mousedown', startDrag);
        imageSlider.addEventListener('mousemove', drag);
        imageSlider.addEventListener('mouseup', endDrag);
        imageSlider.addEventListener('mouseleave', endDrag);
        
        // Touch events for swipe
        imageSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            startDrag(e);
        });
        
        imageSlider.addEventListener('touchmove', (e) => {
            drag(e);
        });
        
        imageSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            endDrag(e);
            handleSwipe();
        });
        
        function startDrag(e) {
            if (e.type === 'touchstart') {
                startPosX = e.touches[0].clientX;
            } else {
                startPosX = e.clientX;
                e.preventDefault(); // Prevent image dragging default behavior
            }
            
            isDragging = true;
            currentTranslate = -currentIndex * panel.clientWidth;
            imageSlider.style.transition = 'none';
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let currentPosition = 0;
            if (e.type === 'touchmove') {
                currentPosition = e.touches[0].clientX;
            } else {
                currentPosition = e.clientX;
            }
            
            const diff = currentPosition - startPosX;
            const newTranslate = currentTranslate + diff;
            
            // Add resistance at the edges
            if (currentIndex === 0 && diff > 0) {
                imageSlider.style.transform = `translateX(${newTranslate * 0.3}px)`;
            } else if (currentIndex === totalSlides - 1 && diff < 0) {
                imageSlider.style.transform = `translateX(${currentTranslate + diff * 0.3}px)`;
            } else {
                imageSlider.style.transform = `translateX(${newTranslate}px)`;
            }
        }
        
        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            
            let currentPosition = 0;
            if (e.type === 'touchend') {
                currentPosition = e.changedTouches[0].clientX;
            } else {
                currentPosition = e.clientX;
            }
            
            const diff = currentPosition - startPosX;
            const threshold = panel.clientWidth * 0.2; // 20% of panel width
            
            imageSlider.style.transition = 'transform 0.3s ease';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex > 0) {
                    currentIndex--;
                } else if (diff < 0 && currentIndex < totalSlides - 1) {
                    currentIndex++;
                }
            }
            
            updateSliderPosition();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - go to next slide
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                    updateSliderPosition();
                }
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - go to previous slide
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            }
        }

        // Keyboard navigation
        panel.tabIndex = 0;
        panel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            } else if (e.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        function updateSliderPosition() {
            // Get the current slide width
            const slideWidth = panel.clientWidth;
            const translateValue = -(currentIndex * slideWidth);
            
            imageSlider.style.transition = 'transform 0.3s ease';
            imageSlider.style.transform = `translateX(${translateValue}px)`;
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update navigation buttons
            prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
            nextBtn.style.display = currentIndex === totalSlides - 1 ? "none" : "flex";
        }
        
        // Initial position
        updateSliderPosition();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            // Resize all slides to match the new panel width
            slides.forEach(slide => {
                slide.style.width = `${panel.clientWidth}px`;
            });
            updateSliderPosition();
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // This will be called by projectsRenderer.js after projects are loaded
});

// Export the function to be called from projectsRenderer.js
window.initializeImagePanels = initializeImagePanels;