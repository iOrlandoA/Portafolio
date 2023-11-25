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
        try {
            writeText();   
        } catch (error) {
            
        }
        setTimeout(function() {
            isExecuting = false;
        }, 3000);  
    }
    ).catch(error => console.error(error));

});

function fillTexts() {

    localizationMessages.forEach((textData) =>{
        try {
            const element = document.getElementById(textData.id);
            if (element) {
                element.textContent = textData.languages[languageSelected];
            }
        } catch (error) {
            
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
        try {
            writeText();   
        } catch (error) {}

    }else{
        e.target.value = "ES";
        languageSelected = "spanish";
        fillTexts();
        try {
            writeText();   
        } catch (error) {}
    }

}


buttonSwitch.addEventListener("click", (e)=>{ buttonFunction(e);});





