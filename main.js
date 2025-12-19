// main.js - 專心處理：漢堡選單 + 返回上一頁
document.addEventListener('DOMContentLoaded', function () {
  setupNavToggle();
  setupBackLinks();
});

/**
 * 三條線漢堡選單
 * - 點三條線：開 / 關
 * - 點選單裡的連結：自動關閉
 * - 點畫面其它地方：自動關閉
 */
function setupNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (!navToggle || !nav) return;

  // 點三條線：切換 is-open
  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.toggle('is-open');
  });

  // 點選單內連結：自動收合
  nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
      nav.classList.remove('is-open');
    }
  });

  // 點畫面其它地方：如果有打開就關掉
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && e.target !== navToggle) {
      nav.classList.remove('is-open');
    }
  });
}

/**
 * 產品詳細頁「返回上一頁」按鈕
 * - class="back-link"
 * - 固定帶回首頁產品區 #all-products
 */
function setupBackLinks() {
  const backLinks = document.querySelectorAll('.back-link');

  backLinks.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'index.html#all-products';
    });
  });
}
