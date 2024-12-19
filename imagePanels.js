const imagePanels = document.querySelectorAll('.image-panel');
imagePanels.forEach((panel) => {
    const imageSlider = panel.querySelector('.image-slider');
    const prevBtn = panel.querySelector('.prev-btn');
    const nextBtn = panel.querySelector('.next-btn');
    const images = imageSlider.querySelectorAll('img');
    const iframes = imageSlider.querySelectorAll('iframe');
    const totalIndex = images.length + (iframes ? iframes.length : 0);
    let currentIndex = 0;
    const margin = 0;

    // Agregar dots
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
        
        // Actualizar dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        if(currentIndex == 0){
            prevBtn.style.display = "none";
        }else{
            prevBtn.style.display = "block";
        }
        if(currentIndex == totalIndex -1){
            nextBtn.style.display = "none";
        }else{
            nextBtn.style.display = "block";
        }
    }
    
    updateSliderPosition();
});