(function(){

/* ===== LINE開啟 ===== */
window.openLine = function(text){
  const url = "https://lin.ee/sHZW7NkR?text=" + encodeURIComponent(text);
  window.open(url,"_blank");

  if(typeof gtag === 'function'){
    gtag('event','line_click',{
      event_category:'engagement',
      event_label:text
    });
  }
}

/* ===== 漢堡 ===== */
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

document.addEventListener('DOMContentLoaded', ()=>{

  const menu = document.getElementById('menuOverlay');

  if(menu){
    menu.innerHTML = `

    <a href="index.html">首頁</a>

    <div class="menu-group">
      <a href="choose.html">怎麼選龜鹿</a>
      <a href="combo.html">套餐推薦</a>
      <a href="how-to-use.html">怎麼使用</a>
    </div>

    <div class="menu-group">
      <a href="articles.html">龜鹿知識</a>
      <a href="faq.html">FAQ</a>
    </div>

    <div class="menu-group">
      <a href="product.html">產品總覽</a>
    </div>

    <a href="https://lin.ee/sHZW7NkR" class="btn-line">LINE詢問</a>

    `;

    menu.addEventListener('click',(e)=>{
      if(e.target === menu) toggleMenu(false);
    });

    menu.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>toggleMenu(false));
    });
  }

  document.querySelector('.menu-btn')?.addEventListener('click',toggleMenu);

});
})();
