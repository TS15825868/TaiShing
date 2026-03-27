// 共用Header
function loadHeader() {
  document.getElementById("app-header").innerHTML = `
  <header class="header">
    <div class="logo">
      <img src="images/logo.png">
    </div>
    <div class="menu-btn" onclick="toggleMenu()">☰</div>
  </header>

  <nav id="menu" class="menu">
    <strong>首頁</strong>
    <a href="index.html">首頁</a>

    <strong>產品</strong>
    <a href="products.html">產品總覽</a>

    <strong>開始使用</strong>
    <a href="choose.html">怎麼選</a>
    <a href="recommend.html">快速推薦</a>

    <strong>內容</strong>
    <a href="knowledge.html">補養知識</a>
    <a href="recipes.html">料理方式</a>
    <a href="videos.html">觀點影片</a>

    <strong>品牌</strong>
    <a href="brand.html">關於我們</a>
    <a href="faq.html">常見問題</a>
    <a href="contact.html">聯絡</a>
  </nav>
  `;
}

// Footer
function loadFooter() {
  document.getElementById("app-footer").innerHTML = `
  <footer class="footer">
    © 仙加味｜補養是一種節奏
  </footer>
  `;
}

// 漢堡控制
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// 初始化
window.onload = function () {
  if (document.getElementById("app-header")) loadHeader();
  if (document.getElementById("app-footer")) loadFooter();
};
