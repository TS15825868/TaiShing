/* =========================
   漢堡選單
========================= */

function toggleMenu(){

const menu =
document.getElementById("menuOverlay") ||
document.getElementById("menu");

if(!menu) return;

menu.classList.toggle("active");

}


/* =========================
   點擊背景關閉選單
========================= */

document.addEventListener("click",function(e){

const menu =
document.getElementById("menuOverlay") ||
document.getElementById("menu");

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
   點擊連結自動關閉
========================= */

document.querySelectorAll(".menu-overlay a").forEach(link=>{

link.addEventListener("click",function(){

const menu =
document.getElementById("menuOverlay") ||
document.getElementById("menu");

if(!menu) return;

menu.classList.remove("active");

});

});


/* =========================
   ESC 關閉選單
========================= */

document.addEventListener("keydown",function(e){

const menu =
document.getElementById("menuOverlay") ||
document.getElementById("menu");

if(!menu) return;

if(e.key==="Escape"){
menu.classList.remove("active");
}

});


/* =========================
   Scroll Reveal
========================= */

function revealElements(){

const reveals=document.querySelectorAll(".reveal");

if(!reveals.length) return;

const windowHeight=window.innerHeight;

reveals.forEach(el=>{

const elementTop=el.getBoundingClientRect().top;

if(elementTop < windowHeight-80){
el.classList.add("show");
}

});

}

window.addEventListener("scroll",revealElements,{passive:true});
window.addEventListener("load",revealElements);
window.addEventListener("resize",revealElements);



/* =========================
   Header Scroll Blur
========================= */

const header=document.querySelector(".header");

if(header){

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.style.background="rgba(255,255,255,.92)";
header.style.backdropFilter="blur(20px)";

}else{

header.style.background="rgba(255,255,255,.75)";
header.style.backdropFilter="blur(18px)";

}

},{passive:true});

}



/* =========================
   Lazy Load Images
========================= */

const lazyImages=document.querySelectorAll("img[data-src]");

if("IntersectionObserver" in window){

const imgObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src;

imgObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imgObserver.observe(img);

});

}else{

/* fallback */

lazyImages.forEach(img=>{

img.src=img.dataset.src;

});

}



/* =========================
   圖片 fallback
========================= */

document.querySelectorAll("img").forEach(img=>{

img.addEventListener("error",function(){

if(this.dataset.fallbackApplied) return;

this.dataset.fallbackApplied=true;

this.src="images/logo-seal.png";

this.classList.add("img-placeholder");

});

});
