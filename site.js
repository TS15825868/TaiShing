// ===== menu =====
function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

// 點外面關閉
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

fetch("products.json")
.then(res=>res.json())
.then(data=>{
productsData = data;
renderSlider(data);
})
.catch(err=>{
console.log("載入失敗",err);
});

function renderSlider(data){
const el = document.getElementById("product-slider");
if(!el) return;

el.innerHTML = data.map((p,i)=>`
<div class="product-card" onclick="openModal(${i})">

<img src="${p.image}" loading="lazy">
<h3>${p.name}</h3>
<p>${p.desc}</p>

</div>
`).join("");
}

// ===== modal =====
function openModal(i){
const p = productsData[i];

const modal = document.getElementById("modal");
const body = document.getElementById("modal-body");

if(!modal || !body) return;

modal.style.display="flex";

body.innerHTML = `
<h2>${p.name}</h2>

<img src="${p.image}">

<p>${p.desc}</p>

<h3>適合這樣的你</h3>
<ul>${p.target ? p.target.map(t=>`<li>${t}</li>`).join("") : ""}</ul>

<h3>使用方式</h3>
<ul>${p.usage.map(u=>`<li>${u}</li>`).join("")}</ul>

<div style="margin-top:20px;text-align:center;">
<a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(p.lineText || p.name)}"
class="btn btn-line">
LINE詢問
</a>
</div>
`;

document.body.style.overflow="hidden";
}

// 關閉
function closeModal(){
const modal = document.getElementById("modal");
if(!modal) return;

modal.style.display="none";
document.body.style.overflow="";
}

// ESC 關閉
document.addEventListener("keydown", function(e){
if(e.key==="Escape"){
closeModal();
}
});
