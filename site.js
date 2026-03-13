
const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

burger.addEventListener('click',()=>{
menu.classList.toggle('open');
});

document.addEventListener('keydown',(e)=>{
if(e.key==="Escape"){menu.classList.remove('open');}
});
