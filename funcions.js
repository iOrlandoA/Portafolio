const imagePanels = document.querySelectorAll('.image-panel');

imagePanels.forEach((panel) => {
  const imageSlider = panel.querySelector('.image-slider');
  const prevBtn = panel.querySelector('.prev-btn');
  const nextBtn = panel.querySelector('.next-btn');
  const images = imageSlider.querySelectorAll('img');

  let currentIndex = 0;
  const imageWidth = 300;
  const margin = 0;

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  function updateSliderPosition() {
    const translateValue = -(currentIndex * (imageWidth + margin));
    imageSlider.style.transform = `translateX(${translateValue}px)`;
  }

  updateSliderPosition();
});
