let DATA = {};

async function loadData(){
  const res = await fetch('/data.json');
  DATA = await res.json();
}

/* HEADER */
function renderHeader(){
  return `
  <div class="header">
    <img src="/images/logo.png" class="logo">
    <div class="menu-btn" onclick="toggleMenu()">☰</div>
  </div>
  <div id="menu" class="menu">
    <a href="/index.html">首頁</a>
    <a href="/products.html">產品</a>
    <a href="/recommend.html">怎麼選</a>
    <a href="/recipes.html">料理</a>
    <a href="/knowledge.html">知識</a>
    <a href="/videos.html">影片</a>
    <a href="/faq.html">FAQ</a>
    <a href="/contact.html">聯絡</a>
  </div>
  `;
}

function toggleMenu(){
  document.getElementById('menu').classList.toggle('open');
}

/* PRODUCTS */
function renderProducts(){
  return DATA.products.map(p=>`
    <div class="card">
      <img src="${p.images[0]}" width="100%">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a class="btn" href="https://lin.ee/sHZW7NkR">LINE詢問</a>
    </div>
  `).join('');
}

/* VIDEOS */
function renderVideos(){
  return DATA.videos.map(v=>`
    <div class="card">
      <img src="${v.thumb}" width="100%">
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
      <a href="${v.url}" target="_blank" class="btn">觀看影片</a>
    </div>
  `).join('');
}
