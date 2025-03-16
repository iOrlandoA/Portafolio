var localizationMessages;
var languageSelected = "english"; 
const buttonSwitch = document.getElementById("buttonLanguage");
let isExecuting = false;




document.addEventListener("DOMContentLoaded", function() {
    fetch('localization.json')
    .then(response => response.json())
    .then(data => {
        localizationMessages= data.texts; 
        try {
            const cacheLenguage = localStorage.getItem('language');
            if(cacheLenguage!=null){
                languageSelected= cacheLenguage;
                if(languageSelected=="english"){
                    buttonSwitch.value= "EN";
                }else{
                    buttonSwitch.value= "ES";
                }
            }
            
        } catch (error) {
            
        }  
        
        fillTexts();
        
        try {
            writeText(); 
            isExecuting=true;  
        } catch (error) {
            
        }
          
    }
    ).catch(error => console.error(error));

});

function fillTexts() {

    localizationMessages.forEach((textData) =>{
        try {
            const element = document.getElementById(textData.id);
            if (element) {
                element.style.transition= "transform 0.3s ease";
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
  
  

  changeLanguaje(e);

  

  
}







const changeLanguaje =(e)=>{
    if(e.target.value === "ES"){
        e.target.value = "EN";
        localStorage.setItem('language', 'english');
        languageSelected = "english";
        
        // Let ProjectsManager handle projects if it exists
        if (window.projectsManager) {
            window.projectsManager.currentLang = 'en';
            window.projectsManager.updateLanguage();
        }
        
        fillTexts();
        try {
            writeText();  
            isExecuting = true; 
        } catch (error) {}

    }else{
        e.target.value = "ES";
        localStorage.setItem('language', 'spanish');
        languageSelected = "spanish";
        
        // Let ProjectsManager handle projects if it exists
        if (window.projectsManager) {
            window.projectsManager.currentLang = 'es';
            window.projectsManager.updateLanguage();
        }
        
        fillTexts();
        try {
            writeText();  
            isExecuting = true; 
        } catch (error) {}
    }

}


buttonSwitch.addEventListener("click", (e)=>{ buttonFunction(e);});





