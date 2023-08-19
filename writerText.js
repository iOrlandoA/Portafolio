


document.addEventListener("DOMContentLoaded", function() {
    const text = "Un estudiante altamente comprometido  "+
                "con deseos de aprender,  empezar a trabajar, "+
                "adquirir nuevas habilidades y experiencia profesional.";
  
    const textContainer = document.getElementById("text");
    let index = 0;

  function typeText() {
    if (index < text.length) {
        textContainer.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 25); 
        }
    }
  typeText();

  
  
    
  });
