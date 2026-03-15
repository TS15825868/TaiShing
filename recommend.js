(function(){

if(typeof ARTICLES==="undefined") return;

const container=document.getElementById("related-articles");

if(!container) return;


/* =========================
取得目前文章
========================= */

const currentPage=location.pathname.split("/").pop();


/* =========================
排除目前文章
========================= */

const list=ARTICLES.filter(a=>a.url!==currentPage);


/* =========================
隨機推薦3篇
========================= */

const shuffled=[...list]
.sort(()=>0.5-Math.random())
.slice(0,3);


/* =========================
生成卡片
========================= */

let html="";

shuffled.forEach(a=>{

html+=`

<a href="../articles/${a.url}" class="product-card reveal">

<img
src="../${a.image}"
alt="${a.title}"
loading="lazy"
onerror="this.src='../images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${a.title}</h3>

<p>${a.summary || "龜鹿知識"}</p>

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
