(function(){

const container = document.getElementById("article-list");

if(!container) return;

if(typeof ARTICLES === "undefined"){
console.warn("ARTICLES 未載入");
return;
}

/* 依日期排序（最新文章） */

const latest = [...ARTICLES]
.sort((a,b)=> new Date(b.date) - new Date(a.date))
.slice(0,3);

let html = "";

latest.forEach(a=>{

html += `
<a href="articles/${a.url}" class="product-card reveal">

<img src="${a.image}" alt="${a.title}" loading="lazy">

<h3>${a.title}</h3>

<p>${a.tags ? a.tags.join(" · ") : "龜鹿知識"}</p>

</a>
`;

});

container.innerHTML = html;

/* reveal 動畫 */

setTimeout(()=>{

document.querySelectorAll(".reveal").forEach(el=>{
el.classList.add("show");
});

},100);

})();
