async function getProducts(){
  const res = await fetch('products.json');
  return await res.json();
}

function safeText(v){
  return (v || '').toString();
}

function renderProducts(products){
  const grid = document.getElementById('products');
  if(!grid) return;
  const series = grid.dataset.series || '';
  const list = series ? products.filter(p => p.series === series) : products;
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="size">${p.sizes.join(' / ')}</p>
      <a class="btn" href="product.html?id=${p.id}">查看詳情</a>
    `;
    grid.appendChild(card);
  });
}

function renderProductDetail(products){
  const box = document.getElementById('productDetail');
  if(!box) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const p = products.find(x => x.id === id);
  if(!p){
    box.innerHTML = `<div class="detail-card"><h1>找不到產品</h1><p>請返回產品列表重新查看。</p><p><a class="btn secondary" href="guilu-series.html">返回龜鹿系列</a></p></div>`;
    return;
  }
  const backHref = p.series === 'qixuan' ? 'qixuan-tea.html' : 'guilu-series.html';
  box.innerHTML = `
    <div class="detail-card">
      <img src="${p.image}" alt="${p.name}" class="detail-img">
      <div class="pills">
        <span class="pill">${p.seriesName}</span>
        <span class="pill">${p.category || '產品'}</span>
      </div>
      <h1>${p.name}</h1>
      <p>${p.desc}</p>
      ${p.summary ? `<p>${p.summary}</p>` : ''}
      <h3>規格</h3>
      <p>${p.sizes.join(' / ')}</p>
      ${p.ingredients ? `<h3>成分</h3><p>${p.ingredients.join('、')}</p>` : ''}
      ${p.usage ? `<h3>使用方式</h3><ul>${p.usage.map(u => `<li>${u}</li>`).join('')}</ul>` : ''}
      <p style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <a class="btn" href="https://lin.ee/sHZW7NkR" target="_blank" rel="noopener">LINE詢問</a>
        <a class="btn secondary" href="${backHref}">返回系列頁</a>
      </p>
    </div>
  `;
  document.title = `${p.name}｜仙加味`;
}

function injectSchema(products){
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context":"https://schema.org",
    "@type":"ItemList",
    "name":"仙加味產品",
    "itemListElement": products.map((p,i)=>({
      "@type":"Product",
      "position": i + 1,
      "name": p.name,
      "image": p.image,
      "description": p.desc
    }))
  });
  document.head.appendChild(script);
}

function toggleMenu(){
  const drawer = document.getElementById('siteDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const btn = document.querySelector('.menu-btn');
  if(!drawer || !backdrop || !btn) return;
  const isOpen = drawer.classList.contains('open');
  if(isOpen){
    closeMenu();
  }else{
    drawer.classList.add('open');
    backdrop.classList.add('show');
    btn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu(){
  const drawer = document.getElementById('siteDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const btn = document.querySelector('.menu-btn');
  if(drawer) drawer.classList.remove('open');
  if(backdrop) backdrop.classList.remove('show');
  if(btn) btn.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeMenu();
});

document.addEventListener('click', function(e){
  const drawer = document.getElementById('siteDrawer');
  const btn = document.querySelector('.menu-btn');
  if(!drawer || !btn) return;
  if(drawer.classList.contains('open') && !drawer.contains(e.target) && !btn.contains(e.target)){
    closeMenu();
  }
});

document.addEventListener('DOMContentLoaded', async ()=>{
  const products = await getProducts();
  renderProducts(products);
  renderProductDetail(products);
  injectSchema(products);
});