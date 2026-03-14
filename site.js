function toggleMenu(){

const menu=document.getElementById("menu")

menu.classList.toggle("active")

}

document.addEventListener("click",function(e){

const menu=document.getElementById("menu")

if(e.target.classList.contains("menu-overlay")){
menu.classList.remove("active")
}

})