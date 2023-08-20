const html = document.getElementById("welcomeDescription");



window.addEventListener("load", function() {
  
  writeText();
  isExecuting=false;
  
    
});

const writeText=()=>{
  const text = html.textContent;
  const textContainer = document.getElementById("text");
  textContainer.textContent= "";
  let index = 0;

  function typeText() {
    if (index < text.length) {
        textContainer.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 10); 
        }
    }
  typeText();
  

}

