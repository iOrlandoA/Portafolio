const imagePanels = document.querySelectorAll('.image-panel');
const presentacion = document.getElementsByClassName('uno');


presentacion[0].addEventListener('click', () => {
  const elementoObjetivo = document.getElementsByClassName('tres');
  elementoObjetivo[0].scrollIntoView({ behavior: 'smooth' });
});



imagePanels.forEach((panel) => {
  const imageSlider = panel.querySelector('.image-slider');
  const prevBtn = panel.querySelector('.prev-btn');
  const nextBtn = panel.querySelector('.next-btn');
  const images = imageSlider.querySelectorAll('img');
  const iframes = imageSlider.querySelectorAll('iframe');
  const totalIndex = images.length + (iframes ? iframes.length : 0);

  
  let currentIndex = 0;
  const margin = 0;

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
  }

  updateSliderPosition();
  
});


