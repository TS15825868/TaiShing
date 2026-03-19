(function(){

function getBasePrefix(){
  return location.pathname.includes('/articles/') ? '../' : '';
}

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

// ===== 卡片元件 =====
function menuCard(title, href, prefix){
  return `
    <a href="${prefix}${href}" class="menu-card">
      <span>${title}</span>
    </a>
  `;
}

// ===== 主流程 =====
document.addEventListener('DOMContentLoaded', () => {

  const prefix = getBasePrefix();
  const menu = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');

  // ===== 漢堡選單（封頂版）=====
  if(menu){

    menu.innerHTML = `
      <div class="menu-container">

        <!-- 品牌 -->
        <div class="menu-section">
          <div class="menu-title">品牌</div>
          <div class="menu-grid">
            ${menuCard('首頁','index.html',prefix)}
            ${menuCard('品牌故事','brand.html',prefix)}
          </div>
        </div>

        <!-- 商品 -->
        <div class="menu-section">
          <div class="menu-title">產品</div>
          <div class="menu-grid">
            ${menuCard('龜鹿系列','guilu-series.html',prefix)}
            ${menuCard('怎麼選龜鹿','choose.html',prefix)}
          </div>
        </div>

        <!-- 內容 -->
        <div class="menu-section">
          <div class="menu-title">內容</div>
          <div class="menu-grid">
            ${menuCard('料理搭配','recipes.html',prefix)}
            ${menuCard('龜鹿知識','articles.html',prefix)}
            ${menuCard('FAQ','faq.html',prefix)}
          </div>
        </div>

        <!-- 成交區 -->
        <div class="menu-cta">
          <a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent('我想了解龜鹿怎麼選')}" class="btn btn-line">
            LINE詢問
          </a>
          <a href="${prefix}order.html" class="btn btn-outline-dark">
            直接下單
          </a>
        </div>

      </div>
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

  // ===== 文章載入 =====
  if(typeof ARTICLES !== 'undefined' && Array.isArray(ARTICLES)){
    const articleGrid = document.getElementById('article-grid');
    if(articleGrid){
      articleGrid.innerHTML = ARTICLES.slice(0,12).map(a => articleCard(a,prefix)).join('');
    }
  }

});

// ===== 文章卡 =====
function articleCard(article, prefix=''){
  const href = `${prefix}articles/${article.url}`;
  const image = article.image.startsWith('images/')
    ? `${prefix}${article.image}`
    : article.image;

  return `
    <a href="${href}" class="product-card scroll-card">
      <img src="${image}" alt="${article.title}" loading="lazy">
      <h3>${article.title}</h3>
      <p>${article.summary || '查看內容'}</p>
    </a>`;
}

})();
