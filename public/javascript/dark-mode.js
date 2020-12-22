'use strict';

const darkMode = document.getElementById("checkbox"); 

darkMode.addEventListener("change", ()=> {
  document.body.classList.toggle('dark'); 
});

var today = new Date(); 
var hours = today.getHours(); 
if(hours > 18 || hours < 5 ){
  document.body.classList.toggle('dark');
}
console.log(hours);

