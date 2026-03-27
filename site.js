// ===== 插入 header =====
document.getElementById("app-header").innerHTML = `
<header class="header">
<div>仙加味</div>
<div class="menu-btn">☰</div>
</header>

<div class="menu-overlay"></div>

<div class="menu-panel">
<a href="index.html">首頁</a>
<a href="products.html">產品</a>
<a href="choose.html">怎麼選</a>
<a href="combo.html">套餐</a>
<a href="recommend.html">快速推薦</a>
<a href="knowledge.html">使用方式</a>
<a href="recipes.html">料理</a>
<a href="videos.html">觀點</a>
<a href="brand.html">品牌</a>
<a href="faq.html">FAQ</a>
<a href="contact.html">聯絡</a>
<a href="https://lin.ee/sHZW7NkR">LINE詢問</a>
</div>

<div class="line-float">
<a href="https://lin.ee/sHZW7NkR" style="color:white;">LINE</a>
</div>
`;

// ===== 插入 footer =====
document.getElementById("app-footer").innerHTML = `
<footer class="card">© 仙加味</footer>
`;

// ===== iPhone安全初始化（關鍵）=====
setTimeout(() => {

  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu-panel");
  const overlay = document.querySelector(".menu-overlay");

  if(!menuBtn) return;

  menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  overlay.addEventListener("click", closeMenu);

  function closeMenu(){
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

}, 0);

// ===== Modal =====
function openModal(){
  document.querySelector(".modal").classList.add("active");
  document.body.style.overflow="hidden";
}

function closeModal(){
  document.querySelector(".modal").classList.remove("active");
  document.body.style.overflow="";
}
