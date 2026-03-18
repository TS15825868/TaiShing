document.addEventListener("DOMContentLoaded", () => {

/* =========================
MENU（漢堡選單）
========================= */

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

<a href="https://lin.ee/sHZW7NkR"
class="line-btn"
target="_blank">
LINE詢問
</a>
`;
}

/* =========================
MENU TOGGLE
========================= */

if (btn && menu) {

btn.addEventListener("click", () => {
menu.classList.toggle("active");
});

menu.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("active");
});
});

}

/* =========================
首頁文章（🔥核心）
========================= */

const homeArticleGrid = document.getElementById("article-grid");

if (homeArticleGrid && typeof ARTICLES !== "undefined") {

let html = "";

ARTICLES.slice(0, 6).forEach(a => {

html += `
<a href="articles/${a.url}" class="product-card">
<h3>${a.title}</h3>
<p>查看內容</p>
</a>
`;

});

homeArticleGrid.innerHTML = html;

}

/* =========================
SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

if (reveals.length && "IntersectionObserver" in window) {

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("show");
observer.unobserve(entry.target);
}
});

}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

}

/* =========================
ARTICLE TAG（SEO）
========================= */

const tagBox = document.getElementById("article-tags");

if(tagBox && typeof ARTICLES !== "undefined"){

const current = location.pathname.split("/").pop();
const article = ARTICLES.find(a => a.url === current);

if(article && article.tags){

tagBox.innerHTML = article.tags
.map(t => `<span><a href="../tag/?tag=${t}">${t}</a></span>`)
.join("");

}

}

/* =========================
RELATED ARTICLES
========================= */

const related = document.getElementById("related-articles");

if (related && typeof ARTICLES !== "undefined") {

const current = location.pathname.split("/").pop();

let list = ARTICLES.filter(a => a.url !== current);

list = list.slice(0,3);

let html = "";

list.forEach(a => {

html += `
<a href="../articles/${a.url}" class="product-card">
<h3>${a.title}</h3>
<p>查看內容</p>
</a>
`;

});

related.innerHTML = html;

}

/* =========================
ARTICLE PAGE（上一篇下一篇）
========================= */

if (location.pathname.includes("/articles/") && typeof ARTICLES !== "undefined") {

const current = location.pathname.split("/").pop();
const index = ARTICLES.findIndex(a => a.url === current);
const container = document.querySelector("main");

if (container) {

/* breadcrumb */

const breadcrumb = `
<div style="margin-bottom:20px;font-size:14px;">
<a href="../index.html">首頁</a> /
<a href="../articles.html">龜鹿知識</a>
</div>
`;

container.insertAdjacentHTML("afterbegin", breadcrumb);

/* prev next */

let navHTML = `<div style="margin-top:40px;display:flex;justify-content:space-between;">`;

if (index > 0) {
navHTML += `
<a href="../articles/${ARTICLES[index - 1].url}">
← 上一篇
</a>
`;
}

if (index < ARTICLES.length - 1) {
navHTML += `
<a href="../articles/${ARTICLES[index + 1].url}">
下一篇 →
</a>
`;
}

navHTML += `</div>`;

container.insertAdjacentHTML("beforeend", navHTML);

}

}

});
