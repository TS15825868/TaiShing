(function(){

// ===== 路徑自動 =====
function getBasePrefix(){
  return location.pathname.includes('/articles/') ? '../' : '';
}

// ===== 漢堡開關 =====
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

// ===== DOM =====
document.addEventListener('DOMContentLoaded', () => {

  const prefix = getBasePrefix();
  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  // ===== 🔥 全螢幕漢堡（封頂）=====
  if(menu){

    menu.innerHTML = `
      <div class="menu-full">

        <div class="menu-close" id="menuClose">✕</div>

        <div class="menu-block">
          <a href="${prefix}index.html">首頁</a>
          <a href="${prefix}brand.html">品牌故事</a>
        </div>

        <div class="menu-block">
          <a href="${prefix}guilu-series.html">龜鹿系列</a>
          <a href="${prefix}choose.html">怎麼選龜鹿</a>
        </div>

        <div class="menu-block">
          <a href="${prefix}recipes.html">料理搭配</a>
          <a href="${prefix}articles.html">龜鹿知識</a>
          <a href="${prefix}faq.html">FAQ</a>
        </div>

        <div class="menu-bottom">
          <a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent('我想了解龜鹿怎麼選')}" class="btn btn-line">
            LINE詢問
          </a>

          <a href="${prefix}order.html" class="btn btn-dark">
            直接下單
          </a>
        </div>

      </div>
    `;

    // 點背景關閉
    menu.addEventListener('click',(e)=>{
      if(e.target === menu) toggleMenu(false);
    });

    // ✕ 關閉
    const closeBtn = document.getElementById('menuClose');
    if(closeBtn){
      closeBtn.addEventListener('click', ()=>toggleMenu(false));
    }

    // 點連結關閉
    menu.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>toggleMenu(false));
    });
  }

  // 漢堡按鈕
  if(btn){
    btn.addEventListener('click', ()=>toggleMenu());
  }

  // ESC關閉
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') toggleMenu(false);
  });

  // ===== 動畫 =====
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:.14});
    revealEls.forEach(el=>obs.observe(el));
  }else{
    revealEls.forEach(el=>el.classList.add('show'));
  }

});

})();
