(function(){

if(typeof ARTICLES==="undefined") return;

const container=document.getElementById("related-articles");

if(!container) return;

/* 取得目前文章 */

const currentPage=location.pathname.split("/").pop();

/* 排除目前文章 */

const list=ARTICLES.filter(a=>a.url!==currentPage);

/* 隨機排序 */

const shuffled=[...list].sort(()=>0.5-Math.random()).slice(0,3);

let html="";

shuffled.forEach(a=>{

html+=`

<a href="../articles/${a.url}" class="product-card">

<h3>${a.title}</h3>

<p>${a.summary || "龜鹿知識"}</p>

</a>

`;

});

container.innerHTML=html;

})();
