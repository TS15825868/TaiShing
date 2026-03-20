(function(){

const listEl = document.getElementById("article-list");
const titleEl = document.getElementById("article-title");
const contentEl = document.getElementById("article-content");

const params = new URLSearchParams(location.search);
const id = params.get("id");
const type = params.get("type");

// ===== SEO題目模板 =====
const TYPES = [
{key:"eat", title:"怎麼吃"},
{key:"who", title:"適合什麼人"},
{key:"daily", title:"可以每天吃嗎"},
{key:"time", title:"什麼時候吃"},
{key:"mix", title:"怎麼搭配"},
{key:"compare", title:"差在哪"},
{key:"cook", title:"怎麼料理"},
{key:"care", title:"日常保養"},
{key:"faq", title:"常見問題"},
{key:"guide", title:"完整指南"}
];

// ===== AI內容生成（長文🔥）=====
function generateAIContent(p, type){

return `
<p>${p.name}近年來逐漸成為許多人日常補養的一種選擇，尤其在生活節奏較快的情況下，透過適當的飲食調整，建立穩定的補養習慣，是不少人關心的重點。</p>

<p>本篇將帶你了解「${p.name}${getTypeName(type)}」，從基本使用方式到日常搭配，讓你可以更清楚如何融入生活。</p>

<h2>${p.name}${getTypeName(type)}</h2>

${generateSection(p,type)}

<h2>常見使用方式</h2>
<ul>
${p.uses.map(u=>`<li>${u}</li>`).join("")}
</ul>

<h2>主要成分</h2>
<ul>
${p.ingredients.map(i=>`<li>${i}</li>`).join("")}
</ul>

<h2>日常補養建議</h2>
<p>建議可依照個人作息與飲食習慣進行調整，從少量開始，逐步建立屬於自己的補養節奏。</p>

<div style="margin-top:30px;">
<a href="../product.html?id=${p.id}" class="btn btn-dark">👉 查看產品</a>
<a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(`我想了解${p.name}怎麼搭配`)}" class="btn btn-line">👉 LINE詢問</a>
</div>
`;
}

// ===== 段落生成 =====
function generateSection(p,type){

switch(type){

case "eat":
return `<p>${p.name}通常可直接食用，或加入溫水、湯品中，依照個人習慣調整。</p>`;

case "who":
return `<p>適合作為日常補養的一部分，適合希望建立穩定飲食節奏的人。</p>`;

case "daily":
return `<p>是否每日使用，可依個人需求與習慣調整。</p>`;

case "mix":
return `<p>可搭配日常飲食，如早餐、湯品或茶飲。</p>`;

case "compare":
return `<p>不同型態（膏、飲、湯塊）主要差異在於使用方式與便利性。</p>`;

case "cook":
return `<p>可加入雞湯或排骨湯中，作為日常料理的一部分。</p>`;

default:
return `<p>${p.name}可依日常習慣靈活使用。</p>`;
}
}

function getTypeName(type){
const t = TYPES.find(x=>x.key===type);
return t ? t.title : "";
}

// ===== 列表頁 =====
if(listEl){

fetch("products.json")
.then(r=>r.json())
.then(data=>{

let html="";

data.products.forEach(p=>{
TYPES.forEach(t=>{
html += `
<a href="seo/article.html?id=${p.id}&type=${t.key}" class="product-card">
<h3>${p.name}${t.title}</h3>
<p>完整說明 →</p>
</a>`;
});
});

listEl.innerHTML = html;

});

}

// ===== 文章頁 =====
if(contentEl){

fetch("../products.json")
.then(r=>r.json())
.then(data=>{

const p = data.products.find(x=>x.id===id);

titleEl.textContent = `${p.name}${getTypeName(type)}`;
contentEl.innerHTML = generateAIContent(p,type);

});

}

})();
