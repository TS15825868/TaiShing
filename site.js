// ===== 安全取得元素 =====
function get(id){
return document.getElementById(id);
}

// ===== menu =====
function toggleMenu(){
const menu = get("menu");
if(menu) menu.classList.toggle("active");
}

// 點外面關閉（優化）
document.addEventListener("click", function(e){
const menu = get("menu");
const btn = document.querySelector(".menu-btn");

if(!menu || !btn) return;

// 如果 menu 沒開不用管
if(!menu.classList.contains("active")) return;

if(!menu.contains(e.target) && !btn.contains(e.target)){
menu.classList.remove("active");
}
});

// ESC 關閉 menu
document.addEventListener("keydown", function(e){
if(e.key==="Escape"){
const menu = get("menu");
if(menu) menu.classList.remove("active");
closeModal();
}
});

// ===== products =====
let productsData = [];
let lastFocus = null;

// loading skeleton
function showLoading(el){
if(!el) return;
el.innerHTML = "<p style='text-align:center'>載入中...</p>";
}

// 讀取產品
fetch("products.json")
.then(res=>{
if(!res.ok) throw new Error("JSON錯誤");
return res.json();
})
.then(data=>{
productsData = data;
renderSlider(data);
renderList(data);
})
.catch(err=>{
console.error(err);
const el = get("product-slider") || get("product-list");
if(el){
el.innerHTML = "<p style='text-align:center'>載入失敗，請重新整理</p>";
}
});

// ===== Apple slider =====
function renderSlider(data){
const el = get("product-slider");
if(!el) return;

showLoading(el);

el.innerHTML = data.map((p,i)=>`
<div class="product-card" onclick="openModal(${i}, this)" tabindex="0">

<img src="${p.image}" loading="lazy">
<h3>${p.name}</h3>
<p>${p.desc}</p>

</div>
`).join("");
}

// ===== grid list（products頁）=====
function renderList(data){
const el = get("product-list");
if(!el) return;

el.innerHTML = data.map((p,i)=>`
<div class="product-card" onclick="openModal(${i}, this)">

<img src="${p.image}" loading="lazy">
<h3>${p.name}</h3>
<p>${p.desc}</p>

</div>
`).join("");
}

// ===== modal =====
function openModal(i, el){
const p = productsData[i];

const modal = get("modal");
const body = get("modal-body");

if(!modal || !body) return;

// 記錄焦點（回來用）
lastFocus = el || null;

modal.style.display="flex";

body.innerHTML = `
<h2>${p.name}</h2>

<img src="${p.image}" style="width:100%;border-radius:10px">

<p>${p.desc}</p>

<h3>適合這樣的你</h3>
<ul>
${p.target ? p.target.map(t=>`<li>${t}</li>`).join("") : ""}
</ul>

<h3>使用方式</h3>
<ul>
${p.usage.map(u=>`<li>${u}</li>`).join("")}
</ul>

<div style="margin-top:20px;text-align:center;">
<a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(p.lineText || p.name)}"
class="btn btn-line">
LINE詢問
</a>
</div>
`;

document.body.style.overflow="hidden";
}

// 點背景關閉 modal
document.addEventListener("click", function(e){
const modal = get("modal");
if(!modal) return;

if(e.target === modal){
closeModal();
}
});

// 關閉 modal
function closeModal(){
const modal = get("modal");
if(!modal) return;

modal.style.display="none";
document.body.style.overflow="";

// 回到原本點擊位置（UX很重要）
if(lastFocus) lastFocus.focus();
}

// ===== 鍵盤操作（可 accessibility）=====
document.addEventListener("keydown", function(e){
if(e.key==="Enter"){
const active = document.activeElement;
if(active && active.classList.contains("product-card")){
active.click();
}
}
});
