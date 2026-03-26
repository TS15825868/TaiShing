let products=[];
let currentIndex=0;
let lastScroll=0;

fetch("data/products.json")
.then(res=>res.json())
.then(data=>{
products=data;
renderProducts();
});

function renderProducts(){
document.querySelectorAll("#product-list").forEach(c=>{
if(!c)return;
c.innerHTML="";
products.forEach((p,i)=>{
c.innerHTML+=`
<div class="card" onclick="openProduct(${i})">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.desc}</p>
</div>`;
});
});
}

function openProduct(i){
lastScroll=window.scrollY;
currentIndex=i;
renderModal();
}

function renderModal(){
const p=products[currentIndex];
const m=document.getElementById("modal");

m.innerHTML=`
<div class="modal-box">
<div class="modal-top">
<span onclick="prevProduct()">←</span>
<span onclick="closeModal()">關閉</span>
<span onclick="nextProduct()">→</span>
</div>

<h2>${p.name}</h2>
${p.images.map(i=>`<img src="${i}">`).join("")}
<p>${p.desc}</p>

<h4>成分</h4>
<p>${p.ingredients.join("、")}</p>

<h4>使用方式</h4>
<p>${p.usage.join("<br>")}</p>

<a href="https://lin.ee/sHZW7NkR" class="btn">LINE詢問</a>
</div>
`;

m.classList.add("show");
document.body.style.overflow="hidden";
}

function closeModal(){
document.getElementById("modal").classList.remove("show");
document.body.style.overflow="";
window.scrollTo(0,lastScroll);
}

function prevProduct(){
currentIndex=(currentIndex-1+products.length)%products.length;
renderModal();
}

function nextProduct(){
currentIndex=(currentIndex+1)%products.length;
renderModal();
}

function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}