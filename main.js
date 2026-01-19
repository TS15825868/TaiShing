/* =========================================================
   main.js｜台興山產・仙加味 全站核心 JS
   功能：
   1. Header 漢堡選單
   2. Reveal 滾動動畫
   3. 產品卡片 Modal 跳窗（完整載入產品頁）
   ========================================================= */

/* =========================================================
   Header：手機漢堡選單
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
  }
});

/* =========================================================
   Reveal Animation
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal, .reveal-up');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
});

/* =========================================================
   Product Modal（跳窗核心）
   ========================================================= */
function openProductModal(url) {
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');

  const modal = document.createElement('div');
  modal.className = 'modal is-open';

  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-dialog">
      <div class="modal-head">
        <div class="modal-head-left">
          <div class="modal-title">產品詳細介紹</div>
          <div class="modal-toc"></div>
        </div>
        <div class="modal-head-right">
          <button class="modal-close" aria-label="關閉">×</button>
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-loading">
          <div class="modal-loading-bar"></div>
          <div class="modal-loading-bar"></div>
          <div class="modal-loading-bar"></div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalBody = modal.querySelector('.modal-body');
  const toc = modal.querySelector('.modal-toc');

  /* 載入完整產品頁（不刪文案） */
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const main = doc.querySelector('main');

      if (!main) {
        modalBody.innerHTML = '<p>內容載入失敗，請重新整理。</p>';
        return;
      }

      modalBody.innerHTML = '';
      modalBody.appendChild(main);

      /* 自動產生 TOC（h2 / h3） */
      const headings = modalBody.querySelectorAll('h2, h3');
      headings.forEach(h => {
        if (!h.id) {
          h.id = 'sec-' + Math.random().toString(36).slice(2, 9);
        }
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.className = 'modal-toc-link';
        a.textContent = h.textContent.trim();
        toc.appendChild(a);
      });
    })
    .catch(() => {
      modalBody.innerHTML = '<p>內容載入失敗，請稍後再試。</p>';
    });

  /* 關閉 modal */
  const closeModal = () => {
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.remove();
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }, 200);
  };

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', esc);
    }
  });
}

/* =========================================================
   綁定所有產品卡（最重要）
   ========================================================= */
document.addEventListener('click', e => {
  const trigger = e.target.closest('.js-product-modal');
  if (!trigger) return;

  const url = trigger.getAttribute('href');
  if (!url) return;

  e.preventDefault();
  openProductModal(url);
});
