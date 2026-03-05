'use strict';

/**
 * Products page renderer (v8.2)
 * - Search by keyword
 * - Filter by category (gel/drink/block/powder)
 * - Click image / "規格" opens modal with full details
 * Data source: products.json
 */

(function () {
  const listEl = document.getElementById('productList');
  const qEl = document.getElementById('q');
  const clearBtn = document.getElementById('clearBtn');
  const metaEl = document.getElementById('resultMeta');
  const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));

  if (!listEl || !qEl || !metaEl || chips.length === 0) return;

  let raw = null;
  let flat = [];
  let activeFilter = 'all';
  let query = '';

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const norm = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, '');
  const includesAny = (hay, needles) => needles.some(n => hay.includes(n));

  function flatten(data) {
    const out = [];
    (data.categories || []).forEach(cat => {
      (cat.items || []).forEach(it => {
        out.push({
          ...it,
          _catId: cat.id,
          _catName: cat.name
        });
      });
    });
    return out;
  }

  function matches(item, q) {
    if (!q) return true;
    const nq = norm(q);
    const tokens = nq.split(/[,，]/).map(t => t.trim()).filter(Boolean);
    const hay = norm([
      item.name, item.size, item._catName,
      ...(item.highlights || []),
      ...(item.suggest || []),
      ...(item.notes || []),
      ...(item.details || []),
      ...(item.keywords || []),
      ...((item.specs || []).map(s => `${s.k} ${s.v}`))
    ].join(' '));
    return includesAny(hay, tokens.length ? tokens : [nq]);
  }

  function titleForFilter(filter, filtered) {
    if (filter === 'all') return '全部';
    const cat = (raw?.categories || []).find(c => c.id === filter);
    return cat?.name || (filtered[0]?filtered[0]._catName: filter);
  }

  function apply() {
    const filtered = flat
      .filter(it => (activeFilter === 'all' || it._catId === activeFilter))
      .filter(it => matches(it, query));

    metaEl.textContent = `共 ${filtered.length} 項｜篩選：${titleForFilter(activeFilter, filtered)}｜更新：${raw?.updatedAt ? raw.updatedAt : ''}`.replace(/\s+\| 更新：$/, '');

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="info-card">
          <div class="info-title">沒有符合的結果</div>
          <div class="muted">你可以試試看：75g / 180cc / 100g / 入湯 / 沖泡，或切回「全部」。</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map(renderItem).join('\n');

    // wire events
    listEl.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-open');
        const item = flat.find(x => x.id === id);
        if (item) openModal(item);
      });
    });
  }

  function renderItem(item) {
    const img = (item.images && item.images[0]) ? item.images[0] : 'images/product-guiku-main.jpg';
    const size = item.size ? `<span class="badge">${esc(item.size)}</span>` : '';
    const cat = item._catName ? `<span class="badge ghost">${esc(item._catName)}</span>` : '';
    const highlights = (item.highlights && item.highlights.length)
      ? `<ul class="bullets">${item.highlights.slice(0,3).map(h => `<li>${esc(h)}</li>`).join('')}</ul>`
      : '';
    const note = (item.notes && item.notes.length) ? `<div class="muted mini">${esc(item.notes[0])}</div>` : '';

    return `
      <article class="card product-card">
        <button class="product-media" type="button" data-open="${esc(item.id)}" aria-label="查看規格：${esc(item.name)}">
          <img src="${esc(img)}" alt="${esc(item.name)}" loading="lazy">
        </button>

        <div class="product-body">
          <div class="product-top">
            <h3 class="product-title">${esc(item.name)} ${size}</h3>
            <div class="badges">${cat}</div>
          </div>

          ${highlights}
          ${note}

          <div class="product-actions">
            <button class="btn" type="button" data-open="${esc(item.id)}">看規格</button>
            <a class="btn ghost" href="contact.html">立即詢問</a>
          </div>
        </div>
      </article>
    `.trim();
  }

  // ---------- Modal ----------
  let modalEl = null;

  function ensureModal() {
    if (modalEl) return;

    modalEl = document.createElement('div');
    modalEl.className = 'modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = `
      <div class="modal-backdrop" data-close></div>
      <div class="modal-card" role="document">
        <div class="modal-top">
          <div class="modal-title" id="modalTitle">產品規格</div>
          <button class="modal-close" type="button" data-close aria-label="關閉">×</button>
        </div>
        <div class="modal-body" id="modalBody"></div>
        <div class="modal-bottom">
          <a class="btn" href="contact.html">立即詢問</a>
          <button class="btn ghost" type="button" data-close>返回</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    modalEl.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.hasAttribute && t.hasAttribute('data-close')) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) closeModal();
    });
  }

  function openModal(item) {
    ensureModal();
    const titleEl = modalEl.querySelector('#modalTitle');
    const bodyEl = modalEl.querySelector('#modalBody');

    const img = (item.images && item.images[0]) ? item.images[0] : 'images/product-guiku-main.jpg';

    const specs = (item.specs && item.specs.length)
      ? `<div class="specs">${item.specs.map(s => `
          <div class="spec">
            <div class="k">${esc(s.k)}</div>
            <div class="v">${esc(s.v)}</div>
          </div>
        `).join('')}</div>`
      : '';

    const highlights = (item.highlights && item.highlights.length)
      ? `<div class="section">
           <div class="section-title">重點特色</div>
           <ul class="bullets">${item.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
         </div>` : '';

    const suggest = (item.suggest && item.suggest.length)
      ? `<div class="section">
           <div class="section-title">日常吃法（參考）</div>
           <div class="muted">${item.suggest.map(s => `• ${esc(s)}`).join('<br>')}</div>
         </div>` : '';

    const details = (item.details && item.details.length)
      ? `<div class="section">
           <div class="section-title">補充說明</div>
           <div>${item.details.map(p => `<p style="margin:0 0 10px;">${esc(p)}</p>`).join('')}</div>
         </div>` : '';

    const notes = (item.notes && item.notes.length)
      ? `<div class="info-card" style="margin-top:12px;">
           <div class="info-title">提醒</div>
           <div class="muted">${item.notes.map(n => `• ${esc(n)}`).join('<br>')}</div>
         </div>` : '';

    titleEl.textContent = `${item.name}${item.size ? '｜' + item.size : ''}`;

    bodyEl.innerHTML = `
      <div class="modal-hero">
        <img src="${esc(img)}" alt="${esc(item.name)}" loading="lazy">
        <div class="modal-meta">
          <div class="badge ghost">${esc(item._catName || '')}</div>
        </div>
      </div>
      ${specs}
      ${highlights}
      ${suggest}
      ${details}
      ${notes}
    `;

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('menu-open'); // reuse: lock scroll
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('menu-open');
  }

  // ---------- Events ----------
  function setActiveChip(filter) {
    activeFilter = filter;
    chips.forEach(btn => {
      const on = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    apply();
  }

  function initEvents() {
    chips.forEach(btn => btn.addEventListener('click', () => setActiveChip(btn.getAttribute('data-filter'))));

    qEl.addEventListener('input', () => {
      query = qEl.value || '';
      apply();

      // URL 直接開啟指定產品規格：?open=<id> 或 #<id>
      const openId = getOpenIdFromUrl();
      if(openId){
        const hit = flat.find(x => x.id === openId);
        if(hit) openModal(hit);
      }
    });

    clearBtn.addEventListener('click', () => {
      qEl.value = '';
      query = '';
      qEl.focus();
      apply();
    });
  }

  
  function getOpenIdFromUrl(){
    try{
      const sp = new URLSearchParams(location.search);
      const fromQuery = sp.get('open');
      const fromHash = (location.hash || '').replace('#','');
      return (fromQuery || fromHash || '').trim();
    }catch(_){
      return '';
    }
  }

async function boot() {
    try {
      const res = await fetch('products.json', { cache: 'no-store' });
      raw = await res.json();
      flat = flatten(raw);
      initEvents();
      apply();
    } catch (e) {
      listEl.innerHTML = `
        <div class="info-card">
          <div class="info-title">讀取產品資料失敗</div>
          <div class="muted">請確認 products.json 是否存在，或重新上傳網站檔案。</div>
        </div>
      `;
    }
  }

  boot();
})();
