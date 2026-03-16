(function(){

/* =========================
確保 articles.js 載入
========================= */

if(typeof ARTICLES === "undefined"){
console.warn("ARTICLES 未載入");
return;
}


/* =========================
頁面路徑判斷
========================= */

const isArticle = location.pathname.includes("/articles/");
const imgBase = isArticle ? "../" : "";


/* =========================
取得容器
========================= */

const articleGrid = document.getElementById("article-grid");

const cultureGrid = document.getElementById("culture-grid");
const productGrid = document.getElementById("product-grid");
const recipeGrid = document.getElementById("recipe-grid");


/* =========================
排序（最新文章）
========================= */

const list = [...ARTICLES].sort((a,b)=>{

const d1 = new Date(a.date || "2000-01-01");
const d2 = new Date(b.date || "2000-01-01");

return d2 - d1;

});


/* =========================
建立卡片
========================= */

function createCard(a){

const img = a.image || "images/logo-seal.png";

return `

<a href="articles/${a.url}" class="product-card reveal">

<img
src="${imgBase}${img}"
alt="${a.title}"
loading="lazy"
onerror="this.src='${imgBase}images/logo-seal.png';this.classList.add('img-placeholder');"
>

<h3>${a.title}</h3>

<p>${a.summary || "龜鹿知識"}</p>

</a>

`;

}


/* =========================
渲染 grid
========================= */

function renderGrid(grid, items){

if(!grid) return;

if(!items || items.length === 0){

grid.innerHTML = "<p style='opacity:.6'>目前沒有文章</p>";
return;

}

let html = "";

items.forEach(a=>{
html += createCard(a);
});

grid.innerHTML = html;

}


/* =========================
全部文章（文章頁）
========================= */

if(articleGrid){

renderGrid(
articleGrid,
list.slice(0,12)
);

}


/* =========================
分類文章
========================= */

if(cultureGrid || productGrid || recipeGrid){

renderGrid(
cultureGrid,
list.filter(a=>a.category==="culture")
);

renderGrid(
productGrid,
list.filter(a=>a.category==="product")
);

renderGrid(
recipeGrid,
list.filter(a=>a.category==="recipe")
);

}


/* =========================
Reveal 動畫
========================= */

requestAnimationFrame(()=>{

document.querySelectorAll(".reveal").forEach(el=>{
el.classList.add("show");
});

});

})();
