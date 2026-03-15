/* =========================
   DOM Ready
========================= */

document.addEventListener("DOMContentLoaded", function(){


/* =========================
   漢堡選單
========================= */

function toggleMenu(){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

menu.classList.toggle("active");

}

window.toggleMenu=toggleMenu;


/* 點擊背景關閉 */

document.addEventListener("click",function(e){

const menu=document.getElementById("menuOverlay");
const menuBtn=document.querySelector(".menu-btn");

if(!menu) return;

if(
menu.classList.contains("active") &&
!menu.contains(e.target) &&
menuBtn &&
!menuBtn.contains(e.target)
){
menu.classList.remove("active");
}

});


/* 點選選單連結關閉 */

document.querySelectorAll(".menu-overlay a").forEach(link=>{

link.addEventListener("click",function(){

const menu=document.getElementById("menuOverlay");

if(menu){
menu.classList.remove("active");
}

});

});


/* ESC 關閉 */

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

const menu=document.getElementById("menuOverlay");

if(menu){
menu.classList.remove("active");
}

}

});


/* =========================
   Scroll Reveal
========================= */

const reveals=document.querySelectorAll(".reveal");

if(reveals.length){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

reveals.forEach(el=>observer.observe(el));

}


/* =========================
   Header Scroll
========================= */

const header=document.querySelector(".header");

if(header){

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.style.background="rgba(255,255,255,.9)";

}else{

header.style.background="rgba(255,255,255,.75)";

}

});

}


/* =========================
   圖片 fallback
========================= */

document.querySelectorAll("img").forEach(img=>{

img.addEventListener("error",function(){

if(this.dataset.fallbackApplied) return;

this.dataset.fallbackApplied=true;

/* 自動判斷路徑 */

if(location.pathname.includes("/articles/")){

this.src="../images/logo-seal.png";

}else{

this.src="images/logo-seal.png";

}

this.classList.add("img-placeholder");

});

});


});
