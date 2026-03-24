(function(){

function toggleMenu(force){
  const menu = document.getElementById('menuOverlay');
  if(!menu) return;

  const open = typeof force === 'boolean'
    ? force
    : !menu.classList.contains('active');

  menu.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

window.toggleMenu = toggleMenu;

// ===== LINE導流（核心🔥）=====
function openLine(text){
  const url = "https://lin.ee/sHZW7NkR";
  const msg = encodeURIComponent(text || "我想了解龜鹿產品");

  window.open(`${url}?text=${msg}`);

  if(typeof gtag === 'function'){
    gtag('event','line_click',{
      event_category:'conversion',
      event_label:text
    });
  }
}

// ===== 綁定產品 =====
function bindProducts(){
  document.querySelectorAll("[data-product]").forEach(el=>{
    el.onclick = ()=>{
      openLine(`我想了解${el.dataset.product}`);
    }
  });
}

// ===== 浮動LINE =====
function floatingLINE(){
  const btn = document.createElement("div");
  btn.innerHTML = "LINE";
  btn.style.cssText = `
    position:fixed;
    right:16px;
    bottom:20px;
    background:#00C300;
    color:#fff;
    padding:12px 16px;
    border-radius:999px;
    font-weight:bold;
    z-index:9999;
    cursor:pointer;
  `;
  btn.onclick = ()=> openLine("我想了解龜鹿產品");
  document.body.appendChild(btn);
}

document.addEventListener("DOMContentLoaded",()=>{

  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  if(menu){
    menu.innerHTML = `
    <a href="index.html">首頁</a>

    <a href="product.html">產品總覽</a>
    <a href="choose.html">怎麼選龜鹿</a>
    <a href="combo.html">套餐推薦</a>

    <a href="how-to-use.html">怎麼使用</a>
    <a href="recipes.html">料理搭配</a>

    <a href="articles.html">龜鹿知識</a>
    <a href="video.html">影音專區</a>
    <a href="faq.html">FAQ</a>

    <a href="brand.html">品牌介紹</a>

    <a href="https://lin.ee/sHZW7NkR">LINE詢問</a>
    `;

    menu.onclick = e=>{
      if(e.target === menu) toggleMenu(false);
    };
  }

  if(btn){
    btn.onclick = ()=>toggleMenu();
  }

  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') toggleMenu(false);
  });

  bindProducts();
  floatingLINE();

});

})();
