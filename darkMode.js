const darkModeBtn = document.getElementById("dark_mode");
const root = document.documentElement;

const diaCardText = "#303030";
const diaCardBack = "#F4F4F4";
const diaBodyText = "#0D0C08";
const diaBodyBack = "#EEF4ED";


const nocheCardText = "#F4F4F4";
const nocheCardBack = "#303030";
const nocheBodyText = "#F4F4F4";
const nocheBodyBack = "#121715";

var darkMode = true;

darkModeBtn.addEventListener("click",()=>{
  switchDark(!darkMode);
});

const switchDark=(darkMode)=>{
  if (darkMode == true){
    localStorage.setItem('darkMode', true);
    root.style.setProperty('--color-cardTexto', nocheCardText);
    root.style.setProperty('--color-cardBackGround', nocheCardBack);
    root.style.setProperty('--color-bodyText', nocheBodyText);
    root.style.setProperty('--color-bodyBackGround', nocheBodyBack);
  }else{
    localStorage.setItem('darkMode', false);
    root.style.setProperty('--color-cardTexto', diaCardText);
    root.style.setProperty('--color-cardBackGround', diaCardBack);
    root.style.setProperty('--color-bodyText', diaBodyText);
    root.style.setProperty('--color-bodyBackGround', diaBodyBack);
  }
  this.darkMode= darkMode;
}






  try {
    const dark = localStorage.getItem('darkMode');
    
    if(dark!=null){
      console.log(dark);
      darkMode= dark ==="true";
      if(darkMode==true){
        darkModeBtn.checked= true;
      }else{
        darkModeBtn.checked= false;
      }
       
    }
    switchDark(darkMode);
    
  } catch (error) {
    darkModeBtn.checked= false;
  }


