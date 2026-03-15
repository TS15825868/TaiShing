document.addEventListener("DOMContentLoaded",()=>{

if(typeof ARTICLES==="undefined") return;
if(typeof PRODUCTS==="undefined") return;

const container=document.getElementById("product-recommend");

if(!container) return;


/* 取得目前文章 */

const current=location.pathname.split("/").pop();

const article=ARTICLES.find(a=>a.url===current);

if(!article || !article.product) return;


/* 找產品 */

const product=PRODUCTS.find(p=>p.id===article.product);

if(!product) return;


/* 生成卡片 */

container.innerHTML=`

<h2 style="text-align:center;margin-bottom:30px">

推薦產品

</h2>

<div class="product-grid">

<a href="../product.html?id=${product.id}" class="product-card">

<img
src="../${product.image}"
alt="${product.name}"
loading="lazy"
>

<h3>${product.name}</h3>

<p>${product.desc}</p>

</a>

</div>

`;

});
