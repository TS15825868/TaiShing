document.addEventListener("DOMContentLoaded", () => {

const menu = document.getElementById("menuOverlay");
const btn = document.querySelector(".menu-btn");

if (menu) {

const isArticle = location.pathname.includes("/articles/");
const base = isArticle ? "../" : "";

menu.innerHTML = `
<a href="${base}index.html">首頁</a>
<a href="${base}guilu-series.html">龜鹿系列</a>
<a href="${base}recipes.html">料理搭配</a>
<a href="${base}choose.html">怎麼選龜鹿</a>
<a href="${base}articles.html">龜鹿知識</a>
<a href="${base}brand.html">品牌故事</a>
<a href="${base}faq.html">FAQ</a>

<a href="https://lin.ee/sHZW7NkR" class="line-btn">LINE詢問</a>
`;
}

if (btn && menu) {
btn.addEventListener("click", () => {
menu.classList.toggle("active");
});
}

/* 首頁文章 */

const grid = document.getElementById("article-grid");

if (grid && typeof ARTICLES !== "undefined") {

let html = "";

ARTICLES.slice(0,6).forEach(a => {

html += `
<a href="articles/${a.url}" class="product-card">

<img src="images/guilu-gao-100g.jpg"
onerror="this.src='images/logo-seal.png'">

<h3>${a.title}</h3>
<p>龜鹿知識</p>

</a>
`;

});

grid.innerHTML = html;

}

});
