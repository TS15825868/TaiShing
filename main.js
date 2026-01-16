/* =========================================================
   TaiShing Site - main.js (Final)
   - Header padding-top auto fix
   - Compact header on scroll
   - Reveal animations（✅ iOS/Safari 首屏不再空白）
   - Floating LINE button helper（用既有 .line-float，沒有才自動生成）
   - Mobile 漢堡選單：點外面 or 捲動自動收合
   ========================================================= */
(function () {
  "use strict";

  function setMainPaddingTop() {
    const header = document.querySelector(".site-header");
    const main = document.querySelector(".site-main");
    if (!header || !main) return;
    const h = header.offsetHeight || 0;
    main.style.paddingTop = `${h + 18}px`;
  }

  function setupCompactHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add("header--compact");
      else header.classList.remove("header--compact");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ✅ 修正：首屏元素先顯示，避免 iOS/Safari IntersectionObserver 延遲導致空白
  function setupReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-up");
    if (!targets.length) return;

    function forceRevealAboveFold() {
      const vh = window.innerHeight || 0;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95) el.classList.add("is-visible");
      });
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "80px 0px 80px 0px" }
    );

    targets.forEach((el) => io.observe(el));

    // 立刻跑一次 + 載入後再補一次（更穩）
    forceRevealAboveFold();
    window.addEventListener("load", forceRevealAboveFold);
    setTimeout(forceRevealAboveFold, 250);
  }

  // 使用現有 .line-float；沒有才建立
  function setupLineFloat() {
    const LINE_URL = "https://lin.ee/sHZW7NkR";

    // 1. 先找看頁面上有沒有 .line-float
    let btn = document.querySelector(".line-float");

    // 2. 如果沒有，就自動生成一顆 .line-float
    if (!btn) {
      btn = document.createElement("a");
      btn.href = LINE_URL;
      btn.className = "line-float";
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.setAttribute("aria-label", "透過 LINE 聯絡我們");

      const img = document.createElement("img");
      img.src = "images/line-float-icon.png";
      img.alt = "LINE";

      btn.appendChild(img);
      document.body.appendChild(btn);
    } else {
      // 保險起見，確保屬性正確
      if (!btn.getAttribute("href")) btn.href = LINE_URL;
      if (!btn.getAttribute("target")) btn.target = "_blank";
      if (!btn.getAttribute("rel")) btn.rel = "noopener";
      if (!btn.getAttribute("aria-label")) {
        btn.setAttribute("aria-label", "透過 LINE 聯絡我們");
      }
    }

    // 3. toast 元件（如果沒存在就建立一個）
    let toast = document.querySelector(".line-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "line-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    // 4. 夜間模式 class
    try {
      const h = new Date().getHours();
      if (h >= 19 || h <= 6) btn.classList.add("is-night");
    } catch (_) {}

    // 5. 監控是否接近 footer（縮小、位移用 .is-compact）
    const footer = document.querySelector(".site-footer");
    const updateCompact = () => {
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const nearFooter = viewportBottom > footerTop - 120;
      btn.classList.toggle("is-compact", nearFooter);
    };

    updateCompact();
    window.addEventListener("scroll", updateCompact, { passive: true });
    window.addEventListener("resize", updateCompact);

    // 6. 點擊時顯示提示文字
    btn.addEventListener("click", () => {
      if (!toast) return;
      toast.textContent = "正在前往 LINE 諮詢…";
      toast.classList.add("is-show");
      setTimeout(() => toast.classList.remove("is-show"), 1200);
    });
  }

  function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
    }

    // 點漢堡：開 / 關
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("is-open");
    });

    // 點選選單項目後自動收合（含同頁錨點）
    const links = nav.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) closeNav();
      });
    });

    // 點選「非 nav / 非漢堡」的地方，自動收合
    document.addEventListener("click", function (e) {
      const clickInsideNav = nav.contains(e.target);
      const clickOnToggle = toggle.contains(e.target);
      if (!clickInsideNav && !clickOnToggle) closeNav();
    });

    // 手機版：開始捲動就自動收合
    window.addEventListener(
      "scroll",
      function () {
        if (window.innerWidth <= 768 && nav.classList.contains("is-open")) {
          closeNav();
        }
      },
      { passive: true }
    );
  }

  // ------------------------------
  // ✅ 全站統一：漢堡選單順序 + 拿掉「LINE」項目
  // - 以 JS 生成選單，避免每頁 HTML 都要同步修改
  // - 仍保留各頁面 CTA / 浮動 LINE 按鈕（不影響）
  // ------------------------------
  function setupUnifiedNav() {
    const navUl = document.querySelector(".site-nav ul");
    if (!navUl) return;

    // 你要的固定順序（全站一致）
    const items = [
      { href: "index.html", label: "首頁", key: "home" },
      { href: "index.html#all-products", label: "產品總覽", key: "products" },
      { href: "guide.html", label: "依需求挑選", key: "guide" },
      { href: "doctor_tiktok.html", label: "中醫觀點", key: "tcm" },
      { href: "about.html", label: "關於我們", key: "about" },
      { href: "faq.html", label: "常見問題", key: "faq" },
      { href: "contact.html", label: "聯絡我們", key: "contact" }
      // ❌ LINE：依你的需求，從漢堡選單移除
    ];

    const path = (window.location.pathname || "").split("/").pop() || "index.html";
    const hash = window.location.hash || "";

    function isActive(key) {
      if (key === "home") return path === "" || path === "index.html";
      if (key === "products") return (path === "" || path === "index.html") && hash === "#all-products";
      if (key === "guide") return path === "guide.html";
      if (key === "tcm") return path === "doctor_tiktok.html";
      if (key === "about") return path === "about.html";
      if (key === "faq") return path === "faq.html";
      if (key === "contact") return path === "contact.html";
      return false;
    }

    // 生成 HTML
    navUl.innerHTML = items
      .map((it) => {
        const active = isActive(it.key) ? " nav-link--active" : "";
        // 站內連結一律同分頁，不加 target
        return `<li><a href="${it.href}" class="nav-link${active}">${it.label}</a></li>`;
      })
      .join("");
  }

  // ------------------------------
  // ✅ 產品「不換頁」快速介紹（彈窗 Quick View）
  // - 目前先針對首頁「全部產品」區塊（index.html）
  // - 保留原本詳細頁（SEO/完整資訊），彈窗提供快速理解與導流
  // ------------------------------
  function setupProductQuickView() {
    const triggers = document.querySelectorAll("[data-product-quickview]");
    if (!triggers.length) return;

    const DATA = {
      guilu: {
        name: "仙加味 龜鹿膏",
        desc: "適合想建立固定補養節奏、願意每天留一小段時間給自己的人。",
        bullets: [
          "情境：作息較固定、想用『每日一小匙』建立儀式感",
          "節奏：穩定、可長期觀察（建議以『一罐』作為觀察期）",
          "方式：可直接食用或溫水攪勻"
        ],
        href: "guilu.html",
        img: "images/guilu-main.jpg"
      },
      drink: {
        name: "仙加味 龜鹿飲",
        desc: "適合工作節奏快、常在外奔波或出差，希望補養方便攜帶的人。",
        bullets: [
          "情境：通勤/外宿/出差，需要『一包就走』",
          "節奏：以方便帶著走維持穩定度",
          "提醒：想喝溫的可隔水微溫，不建議直接煮沸"
        ],
        href: "guilu-drink.html",
        img: "images/guilu-drink.jpg"
      },
      soup: {
        name: "仙加味 龜鹿湯塊",
        desc: "適合平常就愛煮湯的家庭，用『一鍋湯』讓全家一起補。",
        bullets: [
          "情境：家中本來就會煮雞湯/排骨湯",
          "節奏：一塊入鍋，最容易融入日常",
          "用量：可先從 1–2 塊試口感與濃度，再依鍋量調整"
        ],
        href: "soup.html",
        img: "images/guilu-soup-block.jpg"
      },
      lurong: {
        name: "仙加味 鹿茸粉",
        desc: "適合早餐與飲品習慣穩定的人，讓補養自然加入日常飲食。",
        bullets: [
          "情境：早餐固定（豆漿/牛奶/粥/飲品）",
          "節奏：加進原本就會吃的東西，最不容易中斷",
          "方式：可直接入口，或加入飲品/粥品中"
        ],
        href: "lurong.html",
        img: "images/product-lurong-powder.jpg"
      },
      antler: {
        name: "鹿角原料",
        desc: "提供中藥房、中醫診所、餐飲品牌與家庭自煉使用的原料方案。",
        bullets: [
          "情境：已有配方或專業用途，需要穩定供應",
          "可討論：等級/重量/切製方式（依鍋具與用途建議）",
          "合作：建議先告知用途與預估用量，再提供較合適方案"
        ],
        href: "antler.html",
        img: "images/antler-raw.jpg"
      }
    };

    // 建立彈窗容器（只建一次）
    let modal = document.querySelector(".product-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "product-modal";
      modal.innerHTML = `
        <div class="product-modal__backdrop" data-modal-close></div>
        <div class="product-modal__panel" role="dialog" aria-modal="true" aria-label="產品快速介紹">
          <button class="product-modal__close" type="button" aria-label="關閉" data-modal-close>×</button>
          <div class="product-modal__body"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const bodyEl = modal.querySelector(".product-modal__body");
    const closeEls = modal.querySelectorAll("[data-modal-close]");

    function openModal(key) {
      const d = DATA[key];
      if (!d) return;
      bodyEl.innerHTML = `
        <div class="product-modal__grid">
          <div class="product-modal__media">
            <img src="${d.img}" alt="${d.name}" loading="lazy">
          </div>
          <div class="product-modal__content">
            <h3 class="product-modal__title">${d.name}</h3>
            <p class="product-modal__desc">${d.desc}</p>
            <ul class="product-modal__list">
              ${d.bullets.map((t) => `<li>${t}</li>`).join("")}
            </ul>
            <div class="product-modal__actions">
              <a href="${d.href}" class="btn-outline">看完整介紹</a>
              <a href="contact.html" class="btn-soft">不確定怎麼選？先問我們</a>
            </div>
          </div>
        </div>
      `;

      modal.classList.add("is-open");
      document.documentElement.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.documentElement.classList.remove("modal-open");
    }

    closeEls.forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    triggers.forEach((el) => {
      el.addEventListener("click", (e) => {
        // 保留 href，但在快速介紹模式下阻止跳頁
        e.preventDefault();
        const key = el.getAttribute("data-product-quickview");
        openModal(key);
      });
    });
  }

  function setupBackLinks() {
    const backButtons = document.querySelectorAll(".back-link");
    if (!backButtons.length) return;

    const nav = document.querySelector(".site-nav");

    function closeNav() {
      if (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
      }
    }

    backButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        closeNav();
        window.location.href = "index.html#all-products";
      });
    });
  }

  function init() {
    setMainPaddingTop();
    setupBackLinks();
    setupUnifiedNav();
    setupNavToggle();
    setupCompactHeader();
    setupReveal();
    setupLineFloat();
    setupProductQuickView();

    window.addEventListener("resize", setMainPaddingTop);

    // ✅ 載入完成再補跑一次，避免首屏計算因字體/圖片造成偏差
    window.addEventListener("load", setMainPaddingTop);
    setTimeout(setMainPaddingTop, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* =========================
   Full product pages in modal (no page navigation)
   Intercepts links to product detail pages and renders the main content in a modal.
   ========================= */
function setupProductPageModal() {
  const PRODUCT_PAGES = new Set([
    'guilu.html',
    'guilu-drink.html',
    'soup.html',
    'lurong.html',
    'antler.html'
  ]);

  function normalizeHref(href) {
    if (!href) return '';
    // Remove query/hash for matching.
    const noHash = href.split('#')[0].split('?')[0];
    return noHash.trim();
  }

  function isProductPageHref(href) {
    const clean = normalizeHref(href);
    if (!clean) return false;
    // Ignore external links.
    if (/^https?:\/\//i.test(clean) || /^mailto:/i.test(clean) || /^tel:/i.test(clean)) return false;
    // Only match exact filenames (support relative paths like ./guilu.html or pages/guilu.html).
    const filename = clean.split('/').pop();
    return PRODUCT_PAGES.has(filename);
  }

  function ensureModalShell() {
    let overlay = document.querySelector('.product-modal-overlay');
    let modal = document.querySelector('.product-modal');

    if (overlay && modal) return { overlay, modal };

    // Create a simple modal shell if not present.
    overlay = document.createElement('div');
    overlay.className = 'product-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <button class="product-modal-close" type="button" aria-label="Close">×</button>
      <div class="product-modal-header">
        <h3 class="product-modal-title">Loading...</h3>
        <a class="product-modal-open" href="#" target="_blank" rel="noopener" style="display:none">Open in new tab</a>
      </div>
      <div class="product-modal-body"></div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const closeBtn = modal.querySelector('.product-modal-close');
    const close = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      // Clean content to reduce memory.
      const body = modal.querySelector('.product-modal-body');
      if (body) body.innerHTML = '';
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    return { overlay, modal };
  }

  async function openProductPageInModal(url) {
    const { overlay, modal } = ensureModalShell();

    const titleEl = modal.querySelector('.product-modal-title');
    const bodyEl = modal.querySelector('.product-modal-body');
    const openEl = modal.querySelector('.product-modal-open');

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    titleEl.textContent = 'Loading...';
    bodyEl.innerHTML = '<p style="padding:12px;">Loading...</p>';

    // Set open-in-new-tab fallback.
    openEl.href = url;
    openEl.style.display = 'inline-block';

    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const pageTitle = (doc.querySelector('title') && doc.querySelector('title').textContent) ? doc.querySelector('title').textContent.trim() : '';
      titleEl.textContent = pageTitle || 'Product details';

      // Prefer the main content area.
      const main = doc.querySelector('.site-main') || doc.querySelector('main') || doc.body;

      // Clone into a container and remove site chrome elements if they exist.
      const container = document.createElement('div');
      container.className = 'modal-page-content';

      // Use innerHTML but strip known elements first.
      const temp = document.createElement('div');
      temp.innerHTML = main.innerHTML;

      // Remove floating buttons and scripts that can duplicate or conflict.
      temp.querySelectorAll('script, .line-float, .site-header, .site-nav, .site-footer').forEach((el) => el.remove());

      // Ensure internal links inside modal do not navigate away.
      temp.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (isProductPageHref(href)) {
          // Keep as-is; our global click handler will intercept.
          return;
        }
        // If it links to another page of the site, open in new tab by default to avoid leaving the modal context.
        const clean = normalizeHref(href);
        if (clean && !clean.startsWith('#') && !/^https?:\/\//i.test(clean) && !/^mailto:/i.test(clean) && !/^tel:/i.test(clean)) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener');
        }
      });

      container.appendChild(temp);
      bodyEl.innerHTML = '';
      bodyEl.appendChild(container);

      // Scroll to top for each open.
      bodyEl.scrollTop = 0;
    } catch (err) {
      titleEl.textContent = 'Unable to load';
      bodyEl.innerHTML = `
        <div style="padding:12px;">
          <p>Unable to load this page in a popup. Please use the button below.</p>
          <p><a class="btn-outline" href="${url}" target="_blank" rel="noopener">Open in new tab</a></p>
        </div>
      `;
    }
  }

  // Intercept clicks for product page links (desktop and mobile).
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    // Respect explicit external intent.
    if (a.hasAttribute('download')) return;
    const target = a.getAttribute('target');
    if (target && target.toLowerCase() === '_blank') return;

    const href = a.getAttribute('href');
    if (!isProductPageHref(href)) return;

    e.preventDefault();
    openProductPageInModal(href);
  });
}

// Initialize the product modal behavior.
(function initProductPageModalOnce() {
  if (window.__TAISHING_PRODUCT_MODAL_INIT__) return;
  window.__TAISHING_PRODUCT_MODAL_INIT__ = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupProductPageModal);
  } else {
    setupProductPageModal();
  }
})();

