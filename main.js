// main.js：處理漢堡選單、header 高度、返回上一頁等
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const main   = document.querySelector('.site-main');
  const nav    = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');

  // 讓內文不被固定 header 壓住
  function updateMainOffset() {
    if (!header || !main) return;
    const h = header.offsetHeight || 0;
    main.style.paddingTop = (h + 16) + 'px';
  }

  updateMainOffset();
  window.addEventListener('resize', updateMainOffset);

  // 滾動時 header 變窄一點（有加 .header--compact 的話）
  window.addEventListener('scroll', function () {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('header--compact');
    } else {
      header.classList.remove('header--compact');
    }
  });

  // 漢堡選單開合
  if (toggle && nav) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('is-open');
    });

    // 點選單裡的連結時自動收合
    nav.querySelectorAll('a.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
      });
    });

    // 點 header 以外的地方，自動收合選單
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (header && header.contains(e.target)) return;
      nav.classList.remove('is-open');
    });
  }

  // 產品詳細頁「返回上一頁」：固定導回首頁產品區
  document.querySelectorAll('.back-link').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (nav) nav.classList.remove('is-open');

      // 如果已經在首頁，就直接捲到 all-products 區塊
      const url = new URL(window.location.href);
      const path = url.pathname;

      if (path.endsWith('index.html') || path === '/' || path === '') {
        const target = document.getElementById('all-products');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.location.href = 'index.html#all-products';
      }
    });
  });
});
