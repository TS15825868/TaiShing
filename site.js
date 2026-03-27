// ===== header =====
document.body.insertAdjacentHTML('afterbegin', `
<header class="header">
  <img src="images/logo.png" class="logo">
  <div class="menu-btn">☰</div>

  <div class="menu-panel">
    <a href="index.html">首頁</a>
    <a href="products.html">產品介紹</a>
    <a href="choose.html">怎麼選</a>
    <a href="combo.html">套餐搭配</a>
    <a href="recipes.html">料理搭配</a>
    <a href="knowledge.html">使用指南</a>
    <a href="brand.html">品牌故事</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">聯絡</a>

    <a href="https://lin.ee/sHZW7NkR" class="menu-line">
      LINE幫我配
    </a>
  </div>
</header>
`);

// ===== footer =====
document.body.insertAdjacentHTML('beforeend', `
<footer>
  <p>© 仙加味</p>
  <p>萬華起家・延續鹿角工序</p>

  <a href="https://lin.ee/sHZW7NkR" class="footer-line-btn">
    LINE聯絡
  </a>
</footer>

<a href="https://lin.ee/sHZW7NkR" class="line-float">LINE</a>
`);

// ===== menu =====
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-panel');

menuBtn?.addEventListener('click', () => {
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menu || !menuBtn) return;
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove('active');
  }
});
