(function(){

if(typeof ARTICLES==="undefined"){
console.warn("ARTICLES 未載入");
return;
}

const container=document.getElementById("popular-articles");

if(!container) return;


/* =========================
熱門文章 slug
========================= */

const popular=[
"guilu-gao.html",
"guilu-chicken-soup.html",
"guilu-drink.html"
];


/* =========================
生成卡片
========================= */

let html="";

popular.forEach(slug=>{

const article=ARTICLES.find(a=>a.url===slug);

if(!article) return;

html+=`

<a href="articles/${article.url}" class="product-card reveal">

<img
src="${article.image}"
alt="${article.title}"
loading="lazy"
onerror="this.src='images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${article.title}</h3>

<p>${article.summary || "龜鹿知識"}</p>

</a>

`;

});

container.innerHTML=html;


/* =========================
Reveal 動畫
========================= */

requestAnimationFrame(()=>{

container.querySelectorAll(".reveal").forEach(el=>{
el.classList.add("show");
});

});

})();
