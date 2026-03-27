function header(){
return `
<header class="header">
  <div class="logo" onclick="goHome()">
    <img src="images/logo.png">
  </div>
  <div class="menu-btn" onclick="toggle()">☰</div>
</header>

<div id="menu" class="menu">
  <a href="recommend.html">快速推薦</a>
  <a href="products.html">產品介紹</a>
  <a href="choose.html">怎麼選</a>
  <a href="combo.html">搭配方案</a>
  <a href="recipes.html">料理</a>
  <a href="knowledge.html">觀點</a>
  <a href="brand.html">品牌</a>
  <a href="faq.html">FAQ</a>
  <a href="contact.html">聯絡</a>
</div>
`;
}

function footer(){
return `<div class="footer">© 仙加味</div>`;
}

function goHome(){
location.href="index.html";
}

function toggle(){
document.getElementById("menu").classList.toggle("show");
}

/* LINE 成交 */
function buy(name,spec){
let txt=`我要購買\n${name}\n${spec}`;
window.open(`https://line.me/R/msg/text/?${encodeURIComponent(txt)}`);
}

/* Modal */
function openModal(name,img,desc){
document.getElementById("modal").innerHTML=`
<div class="modal-content">
<img src="${img}" style="width:100%">
<h2>${name}</h2>
<p>${desc}</p>
<button class="btn-primary" onclick="buy('${name}','')">立即購買</button>
<button class="btn" onclick="closeModal()">關閉</button>
</div>
`;
document.getElementById("modal").style.display="flex";
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("app-header").innerHTML=header();
document.getElementById("app-footer").innerHTML=footer();
});
