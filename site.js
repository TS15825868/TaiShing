(function(){

// ===== 路徑判斷 =====
function getBasePrefix(){
  if(location.pathname.includes('/articles/')) return '../';
  if(location.pathname.includes('/seo/')) return '../';
  return '';
}

// ===== 漢堡開關 =====
function toggleMenu(force){
  const menu = document.getElementById('menuOverlay');
  if(!menu) return;

  const open = typeof force === 'boolean'
    ? force
    : !menu.classList.contains('active');

  menu.classList.toggle('active', open);

  // 🔥 鎖住滾動
  document.body.style.overflow = open ? 'hidden' : '';

  // 🔥 class（做動畫或debug用）
  document.body.classList.toggle('menu-open', open);
}

window.toggleMenu = toggleMenu;

// ===== DOM =====
document.addEventListener('DOMContentLoaded', () => {

  const prefix = getBasePrefix();
  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  // ===== 建立漢堡內容 =====
  if(menu){

    menu.innerHTML = `
      <div class="menu-full">

        <div class="menu-close" id="menuClose">✕</div>

        <div class="menu-content">

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

          <!-- 🔥 成交入口 -->
          <div class="menu-block">
            <a href="https://lin.ee/sHZW7NkR?text=幫我搭配龜鹿">
              🔥 快速搭配
            </a>
          </div>

        </div>

        <div class="menu-bottom">
          <a href="https://lin.ee/sHZW7NkR" class="btn btn-line">
            LINE詢問
          </a>

          <a href="${prefix}order.html" class="btn btn-dark">
            直接下單
          </a>
        </div>

      </div>
    `;

    // ===== 點背景關閉 =====
    menu.addEventListener('click',(e)=>{
      if(e.target === menu) toggleMenu(false);
    });

    // ===== ✕關閉（防錯）=====
    setTimeout(()=>{
      const closeBtn = document.getElementById('menuClose');
      if(closeBtn){
        closeBtn.addEventListener('click', ()=>toggleMenu(false));
      }
    },50);

    // ===== 點連結自動關閉 =====
    menu.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>toggleMenu(false));
    });

  }

  // ===== 漢堡按鈕 =====
  if(btn){
    btn.addEventListener('click', ()=>toggleMenu());
  }

  // ===== ESC關閉 =====
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') toggleMenu(false);
  });

});
})();
