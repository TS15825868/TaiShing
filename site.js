document.addEventListener("DOMContentLoaded",()=>{

const menu=document.getElementById("menuOverlay");

if(menu){

menu.innerHTML=`

<a href="index.html">首頁</a>
<a href="guilu-series.html">龜鹿系列</a>
<a href="recipes.html">料理搭配</a>
<a href="choose.html">怎麼選龜鹿</a>
<a href="articles.html">龜鹿知識</a>
<a href="brand.html">品牌故事</a>
<a href="faq.html">FAQ</a>

<a href="https://lin.ee/sHZW7NkR"
class="line-btn"
target="_blank"
rel="noopener">

LINE詢問

</a>

`;

}

});


function toggleMenu(){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

menu.classList.toggle("active");

if(menu.classList.contains("active")){

document.body.style.overflow="hidden";

}else{

document.body.style.overflow="";

}

}


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
document.body.style.overflow="";

}

});


document.addEventListener("keydown",function(e){

const menu=document.getElementById("menuOverlay");

if(!menu) return;

if(e.key==="Escape"){

menu.classList.remove("active");
document.body.style.overflow="";

}

});
