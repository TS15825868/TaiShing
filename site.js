(function(){

function toggleMenu(){
const menu=document.getElementById('menuOverlay');
menu.classList.toggle('active');
document.body.style.overflow=menu.classList.contains('active')?'hidden':'';
}

window.toggleMenu=toggleMenu;

document.addEventListener('DOMContentLoaded',()=>{

const menu=document.getElementById('menuOverlay');
const btn=document.querySelector('.menu-btn');

if(menu){
menu.innerHTML=`
<div class="menu-full">

<div class="menu-close" onclick="toggleMenu()">✕</div>

<div class="menu-block">
<a href="index.html">首頁</a>
<a href="brand.html">品牌故事</a>
<a href="guilu-series.html">龜鹿系列</a>
<a href="choose.html">怎麼選</a>
<a href="recipes.html">料理</a>
<a href="faq.html">FAQ</a>
</div>

<div>
<a href="https://lin.ee/sHZW7NkR" class="btn btn-line">LINE詢問</a>
</div>

</div>`;
}

if(btn){
btn.addEventListener('click',toggleMenu);
}

});

})();
