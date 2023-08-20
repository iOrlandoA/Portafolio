var localizationMessages;
var languageSelected = "english"; 
const buttonSwitch = document.getElementById("buttonLanguage");
let isExecuting = false;

document.addEventListener("DOMContentLoaded", function() {
    fetch('localization.json')
    .then(response => response.json())
    .then(data => {
        localizationMessages= data.texts;    
        fillTexts();
        isExecuting=true;
        writeText();
        setTimeout(function() {
            isExecuting = false;
        }, 3000);  
    }
    ).catch(error => console.error(error));

});

function fillTexts() {

    localizationMessages.forEach((textData) =>{
        const element = document.getElementById(textData.id);
        if (element) {
            element.textContent = textData.languages[languageSelected];
        }
    });
}

const buttonFunction =(e)=>{

  if (isExecuting) {
    return;
  }
  
  isExecuting = true;

  changeLanguaje(e);

  setTimeout(function() {
    isExecuting = false;
  }, 3000);  

  
}







const changeLanguaje =(e)=>{
    if(e.target.value === "ES"){
        e.target.value = "EN";
        languageSelected = "english";
        fillTexts();
        writeText();

    }else{
        e.target.value = "ES";
        languageSelected = "spanish";
        fillTexts();
        writeText();
    }

}


buttonSwitch.addEventListener("click", (e)=>{ buttonFunction(e);});





