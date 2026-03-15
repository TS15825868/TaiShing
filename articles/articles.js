(function(){

if(!location.pathname.includes("/articles/")) return;

const main=document.querySelector("main");

if(!main) return;

const box=document.createElement("section");

box.className="section";

box.innerHTML=`

<h2 class="center">相關閱讀</h2>

<div class="product-grid">

<a href="what-is-guilu.html" class="product-card">
<h3>什麼是龜鹿</h3>
<p>了解龜鹿文化</p>
</a>

<a href="how-to-eat-guilu.html" class="product-card">
<h3>龜鹿怎麼吃</h3>
<p>日常食用方式</p>
</a>

<a href="lurong-how.html" class="product-card">
<h3>鹿茸粉怎麼吃</h3>
<p>飲品搭配方式</p>
</a>

</div>

`;

main.appendChild(box);

})();
