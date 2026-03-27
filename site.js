// HEADER
document.getElementById("app-header").innerHTML = `
<header class="header">
<div class="logo">仙加味</div>
<div class="menu-btn" onclick="toggleMenu()">☰</div>
</header>

<div id="menu" class="menu-overlay">
<div onclick="toggleMenu()">✕</div>

<a href="index.html">首頁</a>
<a href="products.html">產品</a>
<a href="choose.html">怎麼選</a>
<a href="combo.html">搭配</a>
<a href="knowledge.html">使用方式</a>
<a href="recipes.html">料理</a>
<a href="videos.html">觀點</a>
<a href="brand.html">品牌</a>
<a href="faq.html">FAQ</a>
<a href="contact.html">聯絡</a>

<a href="https://lin.ee/sHZW7NkR" class="menu-cta">LINE詢問</a>
</div>
`;

// FOOTER
document.getElementById("app-footer").innerHTML = `
<footer>© 仙加味</footer>
<a href="https://lin.ee/sHZW7NkR" class="floating-line">LINE</a>
`;

// MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

// PRODUCTS
fetch("products.json")
.then(r=>r.json())
.then(data=>{
const el=document.getElementById("product-list");
if(!el) return;

el.innerHTML=data.map(p=>`
<div class="card" onclick='openModal(${JSON.stringify(p)})'>
<h3>${p.name}</h3>
<p>${p.desc}</p>
</div>
`).join("");
});

// MODAL
function openModal(p){
const modal=document.getElementById("modal");
modal.classList.add("active");

document.getElementById("modal-body").innerHTML=`
<h2>${p.name}</h2>
<p>${p.desc}</p>

<h3>使用方式</h3>
<p>${p.usage}</p>

<h3>成份</h3>
<p>${p.ingredients.join("、")}</p>

<a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(p.lineText)}"
class="btn btn-primary">LINE詢問</a>

<button onclick="closeModal()">關閉</button>
`;
}

function closeModal(){
document.getElementById("modal").classList.remove("active");
}
