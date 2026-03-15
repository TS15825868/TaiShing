(function(){

document.addEventListener("DOMContentLoaded",function(){

/* 只在文章頁執行 */

if(!location.pathname.includes("/articles/")) return;

const page=location.pathname.split("/").pop();

if(page==="index.html" || page==="") return;

const main=document.querySelector("main");

if(!main) return;


/* 建立區塊 */

const container=document.createElement("section");

container.className="section reveal";


/* HTML */

container.innerHTML=`

<h2 class="center">延伸閱讀</h2>

<div class="product-grid">

<a href="what-is-guilu.html" class="product-card">

<h3>什麼是龜鹿</h3>

<p>龜板與鹿角文化</p>

</a>

<a href="how-to-eat-guilu.html" class="product-card">

<h3>龜鹿怎麼吃</h3>

<p>日常食用方式</p>

</a>

<a href="guilu-drink-how.html" class="product-card">

<h3>龜鹿飲怎麼喝</h3>

<p>即飲方式</p>

</a>

</div>


<h2 class="center" style="margin-top:60px">

相關產品

</h2>

<div class="product-grid">

<a href="../product.html?id=guilu-gao" class="product-card">

<h3>龜鹿膏</h3>

<p>日常補養</p>

</a>

<a href="../product.html?id=guilu-drink" class="product-card">

<h3>龜鹿飲</h3>

<p>即飲型</p>

</a>

<a href="../product.html?id=lurong-powder" class="product-card">

<h3>鹿茸粉</h3>

<p>飲品搭配</p>

</a>

</div>

`;

main.appendChild(container);


/* 重新觸發 reveal */

if(typeof revealElements==="function"){

setTimeout(revealElements,100);

}

});

})();
