// ===== menu =====
function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

document.addEventListener("click", function(e){
const menu = document.getElementById("menu");
const btn = document.querySelector(".menu-btn");

if(!menu || !btn) return;

if(!menu.contains(e.target) && !btn.contains(e.target)){
menu.classList.remove("active");
}
});

// ===== products =====
let productsData = [];
let lastScroll = 0;

fetch("products.json")
.then(res=>res.json())
.then(data=>{
productsData = data;
renderSlider(data);
});

function renderSlider(data){
const el = document.getElementById("product-slider");
if(!el) return;

el.innerHTML = data.map((p,i)=>`
<div class="product-card" onclick="openModal(${i})">
<img src="${p.images[0]}">
<h3>${p.name}</h3>
<p>${p.desc}</p>
</div>
`).join("");
}

// ===== modal =====
function openModal(i){
lastScroll = window.scrollY;

const p = productsData[i];
const modal = document.getElementById("modal");
const body = document.getElementById("modal-body");

modal.style.display="flex";

body.innerHTML = `

<div class="modal-gallery">
${p.images.map(img=>`<img src="${img}">`).join("")}
</div>

<h2>${p.name}</h2>
<p>${p.desc}</p>

<div class="product-info">

<div>
<h3>規格</h3>
<p>${p.spec || ""}</p>
</div>

<div>
<h3>成分</h3>
<ul>${p.ingredients.map(i=>`<li>${i}</li>`).join("")}</ul>
</div>

<div>
<h3>使用方式</h3>
<ul>${p.usage.map(u=>`<li>${u}</li>`).join("")}</ul>
</div>

</div>

<div class="modal-actions">

<button class="btn" onclick="closeModal()">返回</button>

<a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(p.lineText || p.name)}"
class="btn btn-line">
LINE詢問
</a>

</div>
`;

document.body.style.overflow="hidden";
}

// 關閉 + 回到原位置
function closeModal(){
const modal = document.getElementById("modal");
modal.style.display="none";

document.body.style.overflow="";
window.scrollTo(0, lastScroll);
}

// ESC
document.addEventListener("keydown", e=>{
if(e.key==="Escape") closeModal();
});
