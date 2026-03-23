(function(){

  /* ===== 基礎路徑 ===== */
  function getBasePrefix(){
    return location.pathname.includes('/articles/') ? '../' : '';
  }

  /* ===== LINE快速導流（🔥新增）===== */
  function goLine(text){
    const url = `https://lin.ee/sHZW7NkR?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  }

  /* ===== 選單控制（已修正）===== */
  function toggleMenu(force){
    const menu = document.getElementById('menuOverlay');
    if(!menu) return;

    const shouldOpen = typeof force === 'boolean'
      ? force
      : !menu.classList.contains('active');

    menu.classList.toggle('active', shouldOpen);

    document.body.style.overflow = shouldOpen ? 'hidden' : '';

    if(shouldOpen){
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  window.toggleMenu = toggleMenu;

  /* ===== 文章卡片 ===== */
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

  /* ===== 初始化 ===== */
  document.addEventListener('DOMContentLoaded', () => {

    const prefix = getBasePrefix();
    const menu = document.getElementById('menuOverlay');
    const btn = document.querySelector('.menu-btn');

    /* ===== 選單（🔥成交版）===== */
    if(menu){
      menu.innerHTML = `
        <a href="${prefix}index.html">首頁</a>
        <a href="${prefix}combo.html">套餐選擇🔥</a>
        <a href="${prefix}guilu-series.html">龜鹿系列</a>
        <a href="${prefix}recipes.html">料理搭配</a>
        <a href="${prefix}articles.html">龜鹿知識</a>
        <a href="${prefix}faq.html">FAQ</a>

        <a href="javascript:void(0)" onclick="goLine('我想開始補養，可以幫我配一組嗎？')" class="btn btn-line">
          🔥 直接幫我配
        </a>
      `;

      menu.addEventListener('click',(e)=>{
        if(e.target === menu) toggleMenu(false);
      });

      menu.querySelectorAll('a').forEach(link=>{
        link.addEventListener('click', ()=>toggleMenu(false));
      });
    }

    /* ===== 漢堡 ===== */
    if(btn){
      btn.addEventListener('click', ()=>toggleMenu());
    }

    /* ===== ESC ===== */
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') toggleMenu(false);
    });

    /* ===== 動畫 ===== */
    const revealEls = document.querySelectorAll('.reveal');

    if('IntersectionObserver' in window && revealEls.length){
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      },{threshold:.12});

      revealEls.forEach(el=>obs.observe(el));
    }else{
      revealEls.forEach(el=>el.classList.add('show'));
    }

    /* ===== 文章系統 ===== */
    if(typeof ARTICLES !== 'undefined' && Array.isArray(ARTICLES)){

      const articleGrid = document.getElementById('article-grid');
      if(articleGrid){
        articleGrid.innerHTML =
          ARTICLES.slice(0,12)
          .map(article => articleCard(article, prefix))
          .join('');
      }

      ['culture','knowledge','product','recipe'].forEach(cat=>{
        const node = document.getElementById(`article-grid-${cat}`);
        if(node){
          node.innerHTML =
            ARTICLES
            .filter(a=>a.category===cat)
            .map(article => articleCard(article, prefix))
            .join('');
        }
      });
    }

    /* ===== 商品選擇導流 ===== */
    document.querySelectorAll('.choose-btn[data-product]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-product');
        if(id){
          location.href = `${prefix}product.html?id=${encodeURIComponent(id)}`;
        }
      });
    });

    /* ===== 🔥 CTA自動強化（新）===== */
    document.querySelectorAll('[data-line]').forEach(el=>{
      el.addEventListener('click', ()=>{
        const text = el.getAttribute('data-line') || '我想了解龜鹿產品';
        goLine(text);
      });
    });

  });

})();
