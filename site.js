(function(){

  /* ===== 基礎路徑 ===== */
  function getBasePrefix(){
    return location.pathname.includes('/articles/') ? '../' : '';
  }

  /* ===== 選單控制（🔥已修正遮擋問題）===== */
  function toggleMenu(force){
    const menu = document.getElementById('menuOverlay');
    if(!menu) return;

    const shouldOpen = typeof force === 'boolean'
      ? force
      : !menu.classList.contains('active');

    menu.classList.toggle('active', shouldOpen);

    // 🔥 防止背景滾動
    document.body.style.overflow = shouldOpen ? 'hidden' : '';

    // 🔥 保險：強制 scroll 到頂（解決 hero 蓋住問題）
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

    /* ===== 建立選單 ===== */
    if(menu){
      menu.innerHTML = `
        <a href="${prefix}index.html">首頁</a>
        <a href="${prefix}brand.html">品牌故事</a>
        <a href="${prefix}guilu-series.html">龜鹿系列</a>
        <a href="${prefix}choose.html">怎麼選龜鹿</a>
        <a href="${prefix}recipes.html">料理搭配</a>
        <a href="${prefix}articles.html">龜鹿知識</a>
        <a href="${prefix}faq.html">FAQ</a>
        <a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent('我想詢問龜鹿產品')}" class="btn btn-line">LINE詢問</a>
      `;

      // 點背景關閉
      menu.addEventListener('click',(e)=>{
        if(e.target === menu) toggleMenu(false);
      });

      // 點連結關閉
      menu.querySelectorAll('a').forEach(link=>{
        link.addEventListener('click', ()=>toggleMenu(false));
      });
    }

    /* ===== 漢堡按鈕 ===== */
    if(btn){
      btn.addEventListener('click', ()=>toggleMenu());
    }

    /* ===== ESC 關閉 ===== */
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') toggleMenu(false);
    });

    /* ===== 動畫（安全版）===== */
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

    /* ===== 選擇導流 ===== */
    document.querySelectorAll('.choose-btn[data-product]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-product');
        if(id){
          location.href = `${prefix}product.html?id=${encodeURIComponent(id)}`;
        }
      });
    });

  });

})();
