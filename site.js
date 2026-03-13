function toggleMenu(){
  const drawer = document.getElementById('drawer');
  const btn = document.querySelector('.menu-btn');
  const open = drawer.classList.toggle('open');
  if(btn){ btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
}

function closeMenu(){
  const drawer = document.getElementById('drawer');
  const btn = document.querySelector('.menu-btn');
  drawer.classList.remove('open');
  if(btn){ btn.setAttribute('aria-expanded', 'false'); }
}

window.addEventListener('click', (e)=>{
  const drawer = document.getElementById('drawer');
  if(!drawer) return;
  const isMenuBtn = e.target.closest('.menu-btn');
  const isInsideDrawer = e.target.closest('#drawer');
  if(drawer.classList.contains('open') && !isMenuBtn && !isInsideDrawer){
    closeMenu();
  }
});

async function loadProducts(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  try{
    const res = await fetch('products.json');
    const products = await res.json();
    products.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-img">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-size">${p.sizes.join(' / ')}</div>
      `;
      card.addEventListener('click', ()=> openModal(p));
      grid.appendChild(card);
    });
  }catch(err){
    grid.innerHTML = '<p>產品資料載入中發生問題，請稍後再試。</p>';
  }
}

function openModal(product){
  const modal = document.getElementById('productModal');
  const body = document.getElementById('modalBody');
  if(!modal || !body) return;
  body.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-image">
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <p><strong>規格：</strong>${product.sizes.join(' / ')}</p>
    <p><strong>建議搭配：</strong>${(product.usage || []).join('、')}</p>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  const modal = document.getElementById('productModal');
  if(!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ closeModal(); closeMenu(); }
});
window.addEventListener('click', (e)=>{
  const modal = document.getElementById('productModal');
  if(e.target === modal){ closeModal(); }
});

function chooseMode(mode){
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  const result = document.getElementById('recommendResult');
  if(!result) return;
  const map = {
    quick: {
      title: '快速方便推薦：龜鹿飲',
      body: '想要方便攜帶、直接飲用，優先看龜鹿飲。30cc 適合單次快速飲用，180cc 適合日常使用。'
    },
    daily: {
      title: '日常補養推薦：龜鹿膏',
      body: '想要固定融入日常節奏，可先從 100g 龜鹿膏開始，方便安排自己的日常使用方式。'
    },
    cooking: {
      title: '料理燉湯推薦：龜鹿膠湯塊',
      body: '喜歡以雞湯、排骨湯或燉湯方式搭配，建議優先看龜鹿膠湯塊，依料理需求挑選 75g / 300g / 600g。'
    }
  };
  result.innerHTML = `<h3 style="margin:0 0 8px">${map[mode].title}</h3><p style="margin:0">${map[mode].body}</p>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadProducts();
  if(document.getElementById('recommendResult')) chooseMode('daily');
});