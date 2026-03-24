(function(){

/* ========================
   漢堡選單
======================== */
function toggleMenu(force){
  const menu = document.getElementById('menuOverlay');
  if(!menu) return;

  const shouldOpen = typeof force === 'boolean'
    ? force
    : !menu.classList.contains('active');

  menu.classList.toggle('active', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

window.toggleMenu = toggleMenu;

/* ========================
   LINE導流（🔥核心）
======================== */
function openLine(text){
  const url = "https://lin.ee/sHZW7NkR";
  const msg = encodeURIComponent(text || "我想了解產品");
  window.open(`${url}?text=${msg}`, "_blank");

  // GA事件
  if(typeof gtag === 'function'){
    gtag('event','line_click',{
      event_category:'conversion',
      event_label:text || 'LINE'
    });
  }
}

/* ========================
   綁定產品（🔥最重要）
======================== */
function bindProductButtons(){

  // data-product（推薦用）
  document.querySelectorAll("[data-product]").forEach(el=>{
    el.addEventListener("click",()=>{
      const name = el.dataset.product || "產品";
      openLine(`我想了解${name}`);
    });
  });

  // 攔截產品連結（避免跳頁）
  document.querySelectorAll("a[href*='product']").forEach(a=>{
    a.addEventListener("click",(e)=>{
      e.preventDefault();
      const name = a.dataset.product || "產品";
      openLine(`我想了解${name}`);
    });
  });

}

/* ========================
   浮動LINE按鈕（右下角）
======================== */
function createFloatingLINE(){

  if(document.getElementById("lineFloat")) return;

  const btn = document.createElement("div");
  btn.id = "lineFloat";
  btn.innerHTML = "LINE";

  btn.style.position = "fixed";
  btn.style.right = "16px";
  btn.style.bottom = "20px";
  btn.style.background = "#00C300";
  btn.style.color = "#fff";
  btn.style.padding = "12px 16px";
  btn.style.borderRadius = "999px";
  btn.style.fontWeight = "bold";
  btn.style.cursor = "pointer";
  btn.style.zIndex = "9999";
  btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  btn.onclick = ()=> openLine("我想了解龜鹿產品");

  document.body.appendChild(btn);
}

/* ========================
   初始化
======================== */
document.addEventListener('DOMContentLoaded', () => {

  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  /* ===== 漢堡內容（保留你原本🔥）===== */
  if(menu){
    menu.innerHTML = `
      <a href="index.html">首頁</a>

      <a href="choose.html">怎麼選龜鹿</a>
      <a href="combo.html">套餐推薦</a>
      <a href="how-to-use.html">怎麼使用</a>

      <a href="articles.html">龜鹿知識</a>
      <a href="faq.html">FAQ</a>

      <a href="product.html">產品總覽</a>

      <a href="https://lin.ee/sHZW7NkR">LINE詢問</a>
    `;

    menu.addEventListener('click',(e)=>{
      if(e.target === menu) toggleMenu(false);
    });

    menu.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>toggleMenu(false));
    });
  }

  if(btn){
    btn.addEventListener('click', ()=>toggleMenu());
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') toggleMenu(false);
  });

  /* ===== LINE 點擊追蹤（你原本）===== */
  document.querySelectorAll('a[href*="lin.ee"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(typeof gtag === 'function'){
        gtag('event','line_click',{
          event_category:'engagement',
          event_label:'LINE'
        });
      }
    });
  });

  /* ===== 🔥新增（成交核心）===== */
  bindProductButtons();
  createFloatingLINE();

});

})();
