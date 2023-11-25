const html = document.getElementById("welcomeDescription");



const writeText=()=>{
  const text = html.textContent;
  const textContainer = document.getElementById("text");
  textContainer.textContent= "";
  let index = 0;

  function typeText() {
    if (index < text.length) {
        textContainer.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 5); 
        }
  }
  typeText();
  

}

