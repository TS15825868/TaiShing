document.addEventListener("DOMContentLoaded", ()=>{

const title = document.querySelector("h1");
const content = document.querySelector(".article-content");

// 🔥 自動成交區
const cta = `
<div class="article-cta">

<h2>不知道怎麼搭配？</h2>

<p>告訴我們你的狀況，幫你搭配最適合的組合</p>

<a href="https://lin.ee/sHZW7NkR?text=幫我搭配"
class="btn btn-line">
👉 免費幫你推薦
</a>

</div>
`;

// 🔥 插入底部
if(content){
content.insertAdjacentHTML("beforeend", cta);
}

// 🔥 標題優化（強制成交感）
if(title){
title.textContent = title.textContent + "｜仙加味";
}

});
