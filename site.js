document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("header").innerHTML = `
<header>
<div class="logo" onclick="location.href='index.html'">
<img src="images/logo.png">
</div>

<button class="menu-btn" onclick="toggleMenu()">☰</button>
</header>

<div id="menu" class="menu">
<a href="index.html">首頁</a>
<a href="products.html">產品</a>
<a href="recommend.html">快速推薦</a>
<a href="combo.html">搭配</a>
<a href="recipes.html">料理</a>
<a href="knowledge.html">飲食觀點</a>
<a href="faq.html">FAQ</a>
<a href="contact.html">聯絡</a>
</div>
`;

});

function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

function buy(name){
const text=`我要購買 ${name}`;
window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text)}`);
}

function openModal(p){
document.getElementById("modal").classList.add("active");

document.getElementById("modal").innerHTML=`
<div class="modal-content">

<button onclick="closeModal()">✕</button>

<div class="gallery">
${p.images.map(i=>`<img src="${i}">`).join("")}
</div>

<h2>${p.name}</h2>
<p>${p.desc}</p>

<p><b>規格：</b>${p.spec}</p>
<p><b>成分：</b>${p.ingredient}</p>

<ul>
${p.usage.map(u=>`<li>${u}</li>`).join("")}
</ul>

<button class="btn-primary" onclick="buy('${p.name}')">
LINE詢問
</button>

</div>
`;
}

function closeModal(){
document.getElementById("modal").classList.remove("active");
}
