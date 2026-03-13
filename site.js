
document.addEventListener("DOMContentLoaded",()=>{

const btn=document.querySelector(".menu-btn")
const menu=document.querySelector(".menu")

if(btn){
btn.onclick=()=>menu.classList.toggle("open")
}

document.querySelectorAll(".faq-item h3").forEach(q=>{
q.onclick=()=>{
q.parentElement.classList.toggle("open")
}
})

})
