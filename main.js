document.addEventListener('DOMContentLoaded', function () {
  // ====== 漢堡選單開關 ======
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (navToggle && nav) {
    // 點三條線：切換 is-open
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation(); // 避免冒泡到 document
      nav.classList.toggle('is-open');
    });

    // 點選單裡的連結：自動收合
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

  // ====== 詳細頁「返回上一頁」：固定回首頁產品區 ======
  const backLinks = document.querySelectorAll('.back-link');
  backLinks.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // 固定導回首頁產品區，避免跳到奇怪的頁面
      window.location.href = 'index.html#all-products';
    });
  });
});
