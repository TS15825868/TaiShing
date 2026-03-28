let products=[];

document.addEventListener("DOMContentLoaded",()=>{

renderHeader();

fetch("products.json")
.then(r=>r.json())
.then(d=>{
products=d;
renderProducts();
});

});

/* 漢堡 */
function renderHeader(){
document.getElementById("header").innerHTML=`
<header>
<div class="logo" onclick="location.href='index.html'">
<img src="images/logo.png">
</div>

<button onclick="toggleMenu()">☰</button>
</header>

<div id="menu">
<a href="index.html">首頁</a>
<a href="products.html">產品</a>
<a href="recommend.html">怎麼選</a>
<a href="recipes.html">料理搭配</a>
<a href="knowledge.html">補養觀點</a>
<a href="videos.html">觀點分享</a>
<a href="faq.html">常見問題</a>
<a href="contact.html">聯絡我們</a>
</div>
`;
}

function toggleMenu(){
menu.style.right = menu.style.right==="0%"?"-100%":"0%";
}

/* 產品 */
function renderProducts(){
const box=document.getElementById("product-list");
if(!box) return;

products.forEach((p,i)=>{
box.innerHTML+=`
<div class="card">
<img src="${p.images[0]}">
<h3>${p.name}</h3>
<p>${p.desc}</p>
<button onclick="openModal(${i})" class="btn">查看</button>
</div>
`;
});
}

/* Modal */
function openModal(i){
const p=products[i];

modal.classList.add("active");

modal.innerHTML=`
<div class="modal-box">

<h2>${p.name}</h2>

<img src="${p.images[0]}" style="width:100%">

<p>${p.desc}</p>

<p><b>規格：</b>${p.spec}</p>
<p><b>成分：</b>${p.ingredient}</p>

<ul>
${p.usage.map(u=>`<li>${u}</li>`).join("")}
</ul>

<button onclick="buy('${p.name}')" class="btn-primary">
LINE詢問
</button>

</div>
`;
}

/* 成交 */
function buy(name){
const msg=`我想了解 ${name}
請幫我建議適合的方式`;

window.open(`https://line.me/R/msg/text/?${encodeURIComponent(msg)}`);
}
