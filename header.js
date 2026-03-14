
const menuBtn=document.getElementById("menuBtn");
const menu=document.getElementById("menu");
if(menuBtn){
menuBtn.onclick=()=>menu.classList.toggle("show");
document.addEventListener("click",(e)=>{
if(!menu.contains(e.target)&&!menuBtn.contains(e.target)){
menu.classList.remove("show");
}
});
}
