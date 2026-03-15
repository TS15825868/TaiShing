/* =========================
   漢堡選單
========================= */

function toggleMenu(){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

menu.classList.toggle("active");

}


/* =========================
   點擊背景關閉
========================= */

document.addEventListener("click",function(e){

const menu=document.getElementById("menuOverlay");

const menuBtn=document.querySelector(".menu-btn");

if(!menu || !menuBtn) return;

if(
menu.classList.contains("active") &&
!menu.contains(e.target) &&
!menuBtn.contains(e.target)
){

menu.classList.remove("active");

}

});


/* =========================
   點擊連結關閉
========================= */

document.querySelectorAll(".menu-overlay a").forEach(link=>{

link.addEventListener("click",function(){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

menu.classList.remove("active");

});

});


/* =========================
   ESC 關閉
========================= */

document.addEventListener("keydown",function(e){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

if(e.key==="Escape"){

menu.classList.remove("active");

}

});
