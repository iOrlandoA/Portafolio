const darkModeBtn = document.getElementById("darkMode");
const root = document.documentElement;

const diaCardText = "#303030";
const diaCardBack = "#F4F4F4";
const diaBodyText = "#0D0C08";
const diaBodyBack = "#EEF4ED";


const nocheCardText = "#F4F4F4";
const nocheCardBack = "#303030";
const nocheBodyText = "#F4F4F4";
const nocheBodyBack = "#1A2322";

var darkMode = true;

darkModeBtn.addEventListener("click",()=>{
  switchDark();
});

const switchDark=()=>{
  if (darkMode == false){
    darkMode = true;
    localStorage.setItem('darkMode', 'false');
    root.style.setProperty('--color-cardTexto', nocheCardText);
    root.style.setProperty('--color-cardBackGround', nocheCardBack);
    root.style.setProperty('--color-bodyText', nocheBodyText);
    root.style.setProperty('--color-bodyBackGround', nocheBodyBack);
  }else{
    darkMode = false;
    localStorage.setItem('darkMode', 'true');
    root.style.setProperty('--color-cardTexto', diaCardText);
    root.style.setProperty('--color-cardBackGround', diaCardBack);
    root.style.setProperty('--color-bodyText', diaBodyText);
    root.style.setProperty('--color-bodyBackGround', diaBodyBack);
  }
}


try {
  const dark = localStorage.getItem('darkMode');
  if(dark!=null){
    darkMode= dark;
  }
  
} catch (error) {
  
}  
