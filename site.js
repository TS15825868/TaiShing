(function(){

function getBasePrefix(){
  if(location.pathname.includes('/articles/')) return '../';
  if(location.pathname.includes('/seo/')) return '../';
  return '';
}

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

document.addEventListener('DOMContentLoaded', () => {

  const prefix = getBasePrefix();
  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  if(menu){

    menu.innerHTML = `
      <div class="menu-full">

        <div class="menu-close" id="menuClose">✕</div>

        <div>
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

    const closeBtn = menu.querySelector('#menuClose');
    if(closeBtn){
      closeBtn.addEventListener('click', ()=>toggleMenu(false));
    }

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

});

})();
