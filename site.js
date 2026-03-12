function toggleMenu(){
const drawer=document.getElementById("drawer");
drawer.classList.toggle("open");
}

function closeMenu(){
const drawer=document.getElementById("drawer");
drawer.classList.remove("open");
}

/* FAQ accordion */

document.addEventListener("DOMContentLoaded",function(){

const items=document.querySelectorAll(".acc-item");

items.forEach(item=>{
const q=item.querySelector(".acc-q");

if(q){
q.addEventListener("click",()=>{
item.classList.toggle("open");
});
}

});

});
