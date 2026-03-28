
let SITE_DATA = null;
const MENU_GROUPS = [
  { title: '首頁', links: [{ href: 'index.html', label: '首頁' }] },
  { title: '產品與挑選', links: [{ href: 'products.html', label: '龜鹿系列' }, { href: 'choose.html', label: '怎麼選' }, { href: 'combo.html', label: '套餐搭配' }] },
  { title: '使用與內容', links: [{ href: 'guide.html', label: '怎麼使用' }, { href: 'recipes.html', label: '料理搭配' }, { href: 'knowledge.html', label: '食材與日常觀點' }, { href: 'videos.html', label: '觀點影片' }, { href: 'recommend.html', label: '推薦整理' }] },
  { title: '品牌與服務', links: [{ href: 'brand.html', label: '品牌故事' }, { href: 'faq.html', label: 'FAQ' }, { href: 'contact.html', label: '聯絡' }] }
];
let lastFocusedCard = null;
document.addEventListener('DOMContentLoaded', async () => {
  buildShell();
  await loadData();
  hydrateStaticFields();
  renderPage();
  initReveal();
  bindGlobalEvents();
});
async function loadData() {
  if (SITE_DATA) return SITE_DATA;
  const res = await fetch('data.json?v=' + Date.now());
  SITE_DATA = await res.json();
  return SITE_DATA;
}
function buildShell() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const modal = document.getElementById('site-modal');
  if (header) header.innerHTML = renderHeader();
  if (footer) footer.innerHTML = renderFooter();
  if (modal) modal.innerHTML = renderModalShell();
}
function hydrateStaticFields() {
  document.querySelectorAll('[data-line-url]').forEach(el => el.setAttribute('href', SITE_DATA.lineUrl || 'https://lin.ee/sHZW7NkR'));
  document.querySelectorAll('[data-line-id]').forEach(el => el.textContent = SITE_DATA.lineId || '@762jybnm');
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = SITE_DATA.brand || '仙加味');
  document.querySelectorAll('[data-brand-series]').forEach(el => el.textContent = '仙加味・龜鹿');
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}
function renderHeader() {
  return `
  <header class="site-header">
    <div class="header-inner">
      <a class="brand-mark" href="index.html"><img src="images/logo.png" alt="仙加味"><span>${SITE_DATA?.brand || '仙加味'}</span></a>
      <button id="menu-btn" class="menu-btn" type="button" aria-label="開啟選單" aria-expanded="false">☰ 選單</button>
    </div>
  </header>
  <div id="menu-drawer" class="menu-drawer" aria-hidden="true">
    <div class="menu-backdrop" data-close-menu="1"></div>
    <aside class="menu-panel">${MENU_GROUPS.map(g => `<div class="menu-group"><h4>${g.title}</h4>${g.links.map(link => `<a href="${link.href}">${link.label}</a>`).join('')}</div>`).join('')}</aside>
  </div>`;
}
function renderFooter() {
  return `<footer class="site-footer"><div class="page-shell"><div class="footer-card panel"><div><strong>仙加味・龜鹿</strong><p>補養，是一種節奏。</p><p>把龜鹿放回日常飲食與生活安排裡。</p></div><div><p>官方 LINE：${SITE_DATA?.lineId || '@762jybnm'}</p><p><a class="btn btn-line" href="${SITE_DATA?.lineUrl || 'https://lin.ee/sHZW7NkR'}" target="_blank" rel="noopener">LINE 聯絡</a></p><p>© 仙加味</p></div></div></div></footer>`;
}
function renderModalShell() {
  return `<div class="modal" id="modal"><div class="modal-backdrop" data-close-modal="1"></div><div class="modal-scroll"><div class="modal-panel" id="modal-panel"></div></div></div>`;
}
function bindGlobalEvents() {
  document.addEventListener('click', (e) => {
    const drawer = document.getElementById('menu-drawer');
    const btn = document.getElementById('menu-btn');
    if (btn && (btn === e.target || btn.contains(e.target))) {
      const opening = !drawer?.classList.contains('open');
      drawer?.classList.toggle('open', opening);
      drawer?.setAttribute('aria-hidden', String(!opening));
      btn.setAttribute('aria-expanded', String(opening));
      return;
    }
    if (e.target.closest('[data-close-menu="1"]') || e.target.closest('.menu-panel a')) closeMenu();
    if (e.target.closest('[data-close-modal="1"]')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeModal();
    }
  });
  window.addEventListener('scroll', () => closeMenu(), { passive: true });
}
function closeMenu() {
  const drawer = document.getElementById('menu-drawer');
  const btn = document.getElementById('menu-btn');
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
  btn?.setAttribute('aria-expanded', 'false');
}
function renderPage() {
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'products') renderProductsPage();
  if (page === 'choose') renderChoosePage();
  if (page === 'combo') renderComboPage();
  if (page === 'guide') renderGuidePage();
  if (page === 'recipes') renderRecipesPage();
  if (page === 'knowledge') renderKnowledgePage();
  if (page === 'videos') renderVideosPage();
  if (page === 'faq') renderFaqPage();
  if (page === 'recommend') renderRecommendPage();
}
function renderHome() { fillProducts('home-products', SITE_DATA.products); }
function renderProductsPage() {
  fillProducts('product-list', SITE_DATA.products);
  const compare = document.getElementById('compare-grid');
  if (compare) compare.innerHTML = SITE_DATA.products.map(p => `<article class="panel reveal"><span class="eyebrow">${p.size}</span><h3>${p.name}</h3><p>${p.description}</p></article>`).join('');
}
function renderChoosePage() {
  const el = document.getElementById('choose-results');
  if (!el) return;
  el.innerHTML = SITE_DATA.recommend.map(r => `<article class="panel reveal"><strong>${r.keyword}</strong><h3>${r.result}</h3><p>${r.desc}</p></article>`).join('');
}
function renderComboPage() {
  const el = document.getElementById('combo-grid');
  if (!el) return;
  el.innerHTML = `
    <article class="panel reveal"><h3>日常穩定組</h3><p>龜鹿膏＋龜鹿飲。適合想把安排做得更固定、同時保留便利性的人。</p></article>
    <article class="panel reveal"><h3>餐桌搭配組</h3><p>龜鹿湯塊＋鹿茸粉。適合會做熱飲與料理搭配、想自己調整節奏的人。</p></article>
    <article class="panel reveal"><h3>初次認識組</h3><p>先從飲與湯塊理解型態，再慢慢看自己比較偏固定節奏還是餐桌搭配。</p></article>
    <article class="panel reveal"><h3>日常調整組</h3><p>膏與粉屬於比較能自己安排節奏的方向，適合已經知道自己偏好的使用方式。</p></article>`;
}
function renderGuidePage() {
  const guide = document.querySelector('[data-render="guide"]');
  const seasonal = document.querySelector('[data-render="seasonal"]');
  if (guide) guide.innerHTML = `
      <article class="panel reveal"><span class="eyebrow">Step 1</span><h3>先看型態</h3><p>膏適合固定節奏，飲適合快速安排，湯塊適合餐桌，粉適合自己搭配。</p></article>
      <article class="panel reveal"><span class="eyebrow">Step 2</span><h3>再看作息</h3><p>把安排放在早上與下午比較好執行，盡量避免接近睡前。</p></article>
      <article class="panel reveal"><span class="eyebrow">Step 3</span><h3>最後看規格</h3><p>先從自己覺得容易開始的份量下手，比一次做太多設定更容易持續。</p></article>`;
  if (seasonal) seasonal.innerHTML = `<div class="compare-grid"><article class="panel reveal"><h3>平日安排</h3><p>把補養放進每天固定的時間點，比偶爾想到才使用更容易形成節奏。</p></article><article class="panel reveal"><h3>餐桌搭配</h3><p>湯塊與熱飲類型，適合用「順手」作為安排原則，不需要每次都做得很複雜。</p></article></div>`;
}
function renderRecipesPage() {
  const el = document.getElementById('recipe-grid');
  if (!el) return;
  el.innerHTML = SITE_DATA.recipes.map(r => `<article class="panel reveal"><span class="eyebrow">${r.category}</span><h3>${r.title}</h3><p>${r.desc}</p><ol class="steps">${r.steps.map(s => `<li>${s}</li>`).join('')}</ol></article>`).join('');
}
function renderKnowledgePage() {
  const el = document.getElementById('knowledge-grid');
  if (!el) return;
  el.innerHTML = [
    ['從食材出發','官網用語以龜板萃取物、鹿角萃取物為主，回到飲食搭配的理解方式。'],
    ['從工序出發','長時間熬製、慢火濃縮，是品牌一路延續下來的做法。'],
    ['從節奏出發','比起追求一次看見什麼，更重視能不能穩定、舒服地放進生活。'],
    ['從餐桌出發','熱飲、調飲、燉湯、固定小匙，這些都比空泛形容更有幫助。']
  ].map(([title,desc]) => `<article class="panel reveal"><h3>${title}</h3><p>${desc}</p></article>`).join('');
}
function renderVideosPage() {
  const count = document.getElementById('video-count');
  const grid = document.getElementById('video-grid');
  if (count) count.textContent = SITE_DATA.videos.length;
  if (grid) grid.innerHTML = SITE_DATA.videos.map((v, i) => `<article class="video-card reveal"><span class="eyebrow">第 ${i+1} 支</span><h3>${v.title}</h3><p>整理自公開平台，不自動播放，點擊後開啟原影片。</p><a class="watch" href="${v.url}" target="_blank" rel="noopener">開啟原影片 →</a></article>`).join('');
}
function renderFaqPage() {
  const el = document.getElementById('faq-grid');
  if (!el) return;
  el.innerHTML = SITE_DATA.faqs.map(f => `<article class="faq-item reveal"><h3>${f.q}</h3><p>${f.a}</p></article>`).join('');
}
function renderRecommendPage() {
  const el = document.getElementById('recommend-grid');
  if (!el) return;
  el.innerHTML = SITE_DATA.recommend.map(r => `<article class="panel reveal"><strong>${r.keyword}</strong><h3>${r.result}</h3><p>${r.desc}</p></article>`).join('');
}
function fillProducts(targetId, products) {
  const list = document.getElementById(targetId);
  if (!list) return;
  list.innerHTML = products.map(p => {
    const thumb = (p.gallery && p.gallery[0]) || p.image;
    return `<article class="card reveal" data-product-id="${p.id}" tabindex="0" role="button" aria-label="查看 ${p.name} 詳細介紹"><img src="${thumb}" alt="${p.name}"><span class="eyebrow">${p.series || ''}</span><h3>${p.name}</h3><p>${p.description}</p></article>`;
  }).join('');
  list.querySelectorAll('[data-product-id]').forEach(card => {
    const handler = () => {
      const p = products.find(x => x.id === card.dataset.productId);
      if (p) openProductModal(p, card);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}
function openProductModal(p, sourceEl) {
  const modal = document.getElementById('modal');
  const panel = document.getElementById('modal-panel');
  if (!modal || !panel) return;
  lastFocusedCard = sourceEl || document.activeElement;
  const gallery = ((p.gallery && p.gallery.length) ? p.gallery : [p.image]).filter(Boolean);
  panel.innerHTML = `
    <div class="modal-close"><button type="button" onclick="closeModal()">× 關閉</button></div>
    <div class="toc"><a href="#modal-spec">規格</a><a href="#modal-ingredients">成分</a><a href="#modal-usage">使用方式</a></div>
    <div class="modal-grid">
      <div>${gallery.map((src,idx)=>`<img class="modal-main-image" src="${src}" alt="${p.name} 圖片 ${idx+1}">`).join('')}</div>
      <div>
        <span class="eyebrow">${p.series || '仙加味・龜鹿'}</span>
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <p class="meta" id="modal-spec">規格：${p.size}</p>
        <h3 id="modal-ingredients">成分</h3>
        <ul>${p.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3 id="modal-usage">使用方式</h3>
        <ul>${p.usage.map(i => `<li>${i}</li>`).join('')}</ul>
        <p><a class="btn btn-line" href="${SITE_DATA.lineUrl || 'https://lin.ee/sHZW7NkR'}" target="_blank" rel="noopener">LINE 諮詢</a></p>
      </div>
    </div>`;
  modal.classList.add('show');
  panel.querySelector('button')?.focus();
}
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('show');
  if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') lastFocusedCard.focus();
}
function initReveal() {
  const run = () => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('show');
    });
  };
  run();
  window.addEventListener('scroll', run, { passive: true });
}
