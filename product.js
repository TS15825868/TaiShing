(async function(){

const params = new URLSearchParams(location.search);
let currentId = params.get('id');

const res = await fetch('products.json');
const data = await res.json();
const products = data.products || [];

if(!currentId) currentId = products[0].id;

// ===== DOM =====
const el = {
  image: document.getElementById('product-image'),
  title: document.getElementById('product-title'),
  summary: document.getElementById('product-summary'),
  sizes: document.getElementById('product-sizes'),
  pack: document.getElementById('product-package'),
  ingredients: document.getElementById('product-ingredients'),
  uses: document.getElementById('product-uses'),
  line: document.getElementById('product-line'),
  tabs: document.getElementById('product-tabs'),
  related: document.getElementById('related-products')
};

// ===== 渲染商品 =====
function renderProduct(product){

  el.image.src = product.image;
  el.title.textContent = product.name;
  el.summary.textContent = product.desc;

  el.sizes.textContent = product.sizes.join(' / ');
  el.pack.textContent = product.package;

  el.ingredients.innerHTML =
    product.ingredients.map(i=>`<li>${i}</li>`).join('');

  el.uses.innerHTML =
    product.uses.map(i=>`<li>${i}</li>`).join('');

  el.line.href =
    `https://lin.ee/sHZW7NkR?text=${encodeURIComponent(`我想詢問 ${product.name}`)}`;

  // URL 不刷新
  history.replaceState(null,'',`?id=${product.id}`);

}

// ===== 商品切換列 =====
el.tabs.innerHTML = products.map(p => `
  <div class="product-card"
    style="min-width:140px;cursor:pointer"
    onclick="switchProduct('${p.id}')">
    <img src="${p.image}">
    <h3>${p.name}</h3>
  </div>
`).join('');

// ===== 推薦 =====
function renderRelated(current){
  const others = products.filter(p => p.id !== current.id).slice(0,3);

  el.related.innerHTML = `
    <h2>你也可以看看</h2>
    <div class="product-grid">
      ${others.map(p=>`
        <a href="?id=${p.id}" class="product-card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
        </a>
      `).join('')}
    </div>
  `;
}

// ===== 切換 =====
window.switchProduct = function(id){
  const product = products.find(p=>p.id===id);
  if(!product) return;

  renderProduct(product);
  renderRelated(product);
};

// ===== 初始載入 =====
const first = products.find(p=>p.id===currentId);
renderProduct(first);
renderRelated(first);

})();
