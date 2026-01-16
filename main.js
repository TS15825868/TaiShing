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
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    // default state
    if (!toggle.hasAttribute("aria-expanded")) {
      toggle.setAttribute("aria-expanded", "false");
    }

    // 點漢堡：開 / 關
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const next = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", next);
      toggle.classList.toggle("is-open", next);
      toggle.setAttribute("aria-expanded", next ? "true" : "false");
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
  // ✅ 產品「不換頁」彈窗：載入「原本詳細頁」內容（不換頁）
  // - 觸發：.js-product-modal（連結 href 保留原詳情頁，利於 SEO/分享）
  // - 內容：抓取 href 頁面中的 <main>（或 .site-main）塞進彈窗
  // - 支援：Esc/背景/按鈕關閉、頁內錨點在彈窗內滾動、快速跳轉目錄
  // ------------------------------
  function setupProductModalFromPages() {
    const triggers = document.querySelectorAll('.js-product-modal');
    if (!triggers.length) return;

    const modal = ensureProductModal();
    const overlay = modal.querySelector('.modal-overlay');
    const dialog = modal.querySelector('.modal-dialog');
    const titleEl = modal.querySelector('.modal-title');
    const bodyEl = modal.querySelector('.modal-body');
    const tocEl = modal.querySelector('.modal-toc');
    const openPageEl = modal.querySelector('.modal-openpage');
    const closeBtn = modal.querySelector('.modal-close');

    let lastFocus = null;

    function openModal() {
      lastFocus = document.activeElement;
      document.documentElement.classList.add('modal-open');
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      // focus close for accessibility
      setTimeout(() => closeBtn && closeBtn.focus(), 0);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('modal-open');
      // restore focus
      if (lastFocus && typeof lastFocus.focus === 'function') {
        setTimeout(() => lastFocus.focus(), 0);
      }
    }

    function setLoading(titleText) {
      titleEl.textContent = titleText || '產品介紹';
      tocEl.innerHTML = '';
      bodyEl.innerHTML = (
        '<div class="modal-loading">'
        + '<div class="modal-loading-bar"></div>'
        + '<div class="modal-loading-bar"></div>'
        + '<div class="modal-loading-bar"></div>'
        + '</div>'
      );
    }

    function buildToc(container) {
      const all = Array.from(container.querySelectorAll('h2[id], h3[id]'))
        .filter(h => (h.textContent || '').trim().length > 0);

      if (!all.length) {
        tocEl.innerHTML = '';
        return;
      }

      // Prefer a few practical jumps: 規格 / 成分 / 吃法 / FAQ / 保存 / 注意
      const prefer = [
        { key: 'spec',  re: /(規格|容量|重量|包裝|內容量)/ },
        { key: 'ing',   re: /(成分|原料|配方|內容物)/ },
        { key: 'use',   re: /(吃法|用法|使用|怎麼吃|沖泡|料理)/ },
        { key: 'faq',   re: /(常見問題|FAQ)/i },
        { key: 'keep',  re: /(保存|存放|冷藏|保存方式)/ },
        { key: 'note',  re: /(注意|提醒|不建議|適合|不適合)/ }
      ];

      const picked = [];
      const usedKeys = new Set();

      for (const h of all) {
        const t = (h.textContent || '').trim();
        for (const p of prefer) {
          if (usedKeys.has(p.key)) continue;
          if (p.re.test(t)) {
            picked.push(h);
            usedKeys.add(p.key);
            break;
          }
        }
      }

      // Fill remaining slots with the first few headings (keep overall order)
      for (const h of all) {
        if (picked.includes(h)) continue;
        picked.push(h);
        if (picked.length >= 8) break;
      }

      const frag = document.createDocumentFragment();
      picked.slice(0, 8).forEach(h => {
        const a = document.createElement('a');
        a.className = 'modal-toc-link';
        a.href = '#' + h.id;
        a.textContent = (h.textContent || '').trim();
        frag.appendChild(a);
      });

      tocEl.innerHTML = '';
      tocEl.appendChild(frag);
    }

    function scrollToAnchor(anchorId) {
      const target = bodyEl.querySelector('#' + CSS.escape(anchorId));
      if (!target) return;
      const top = target.getBoundingClientRect().top - bodyEl.getBoundingClientRect().top + bodyEl.scrollTop - 8;
      bodyEl.scrollTo({ top, behavior: 'smooth' });
    }

    // TOC quick-jump inside modal (避免只改 hash、不滾動)
    tocEl.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      e.preventDefault();
      scrollToAnchor(href.slice(1));
    });

    async function loadPageIntoModal(href, fallbackTitle) {
      setLoading(fallbackTitle);
      openPageEl.href = href;

      try {
        const res = await fetch(href, { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch failed: ' + res.status);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Title
        const pageTitle = (doc.querySelector('title')?.textContent || '').trim();
        titleEl.textContent = pageTitle || fallbackTitle || '產品介紹';

        // Main
        const main = doc.querySelector('main') || doc.querySelector('.site-main') || doc.body;
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-page';
        wrapper.innerHTML = main.innerHTML;

        // Remove nested floating LINE buttons or duplicate wrappers if any
        wrapper.querySelectorAll('.line-float, .site-header, .site-footer, script, noscript').forEach(el => el.remove());

        // Ensure IDs exist for headings so toc/anchors work reliably
        const used = new Set();
        const slugify = (text) => {
          const base = (text || '')
            .toString()
            .trim()
            .toLowerCase()
            // keep chinese/english/nums, collapse others into '-'
            .replace(/[^\u4e00-\u9fff\w\s-]+/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          return base || 'section';
        };

        wrapper.querySelectorAll('h2, h3').forEach((h, idx) => {
          const rawId = (h.getAttribute('id') || '').trim();
          let id = rawId || slugify(h.textContent);
          // Guarantee uniqueness
          let n = 1;
          let candidate = id;
          while (used.has(candidate) || wrapper.querySelector('#' + CSS.escape(candidate))) {
            n += 1;
            candidate = id + '-' + n;
          }
          id = candidate;
          used.add(id);
          h.id = id;
        });

        // Inject
        bodyEl.innerHTML = '';
        bodyEl.appendChild(wrapper);
        buildToc(wrapper);

        // If URL already has hash, scroll to it
        const hashIndex = href.indexOf('#');
        if (hashIndex > -1) {
          const anchorId = href.slice(hashIndex + 1);
          setTimeout(() => scrollToAnchor(anchorId), 60);
        } else {
          bodyEl.scrollTop = 0;
        }
      } catch (err) {
        console.error(err);
        titleEl.textContent = fallbackTitle || '產品介紹';
        tocEl.innerHTML = '';
        bodyEl.innerHTML = (
          '<div class="modal-error">'
          + '<p>目前無法載入產品內容。你可以改用「開啟完整頁」查看。</p>'
          + '</div>'
        );
      }
    }

    // Trigger click (event delegation)
    // ✅ 全站「產品詳情頁」連結一律彈窗（但不動 header/nav/footer 的必要導頁）
    if (!document.documentElement.dataset.productModalDelegated) {
      document.documentElement.dataset.productModalDelegated = '1';

      // Product detail pages that should open in modal when clicked within page content
      const PRODUCT_DETAIL_PAGES = new Set([
        'guilu.html',
        'guilu-drink.html',
        'soup.html',
        'antler.html',
        'lurong.html',
        'guilu-line.html'
      ]);

      const isInterceptCandidate = (a) => {
        if (!a) return false;

        // Exclude navigation + footer (必要導頁行為不改)
        if (a.closest('.site-header, .site-nav, .site-footer')) return false;
        if (a.classList.contains('nav-link')) return false;

        const href = (a.getAttribute('href') || '').trim();
        if (!href) return false;
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if (href.startsWith('#')) return false; // same-page anchors remain as-is

        // Normalize to filename (remove query/hash, leading ./)
        const noQuery = href.split('?')[0];
        const noHash = noQuery.split('#')[0];
        const file = noHash.replace(/^\.\//, '').split('/').pop();

        return PRODUCT_DETAIL_PAGES.has(file);
      };

      document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;

        // Allow Cmd/Ctrl/Shift/Alt click to keep default behavior (new tab / select)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // 1) Explicit triggers keep working
        if (a.classList.contains('js-product-modal')) {
          const href = a.getAttribute('href');
          if (!href) return;
          e.preventDefault();
          const title = a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent || '').trim() || '產品介紹';
          loadPageIntoModal(href, title);
          openModal();
          return;
        }

        // 2) Any internal link pointing to product detail pages inside content -> modal
        if (isInterceptCandidate(a)) {
          const href = a.getAttribute('href');
          e.preventDefault();
          const title = a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent || '').trim() || '產品介紹';
          loadPageIntoModal(href, title);
          openModal();
        }
      });
    }

    // Close handlers
    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Stop click bubbling inside dialog
    if (dialog) dialog.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    // TOC: keep anchor scroll inside modal
    tocEl.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToAnchor(href.slice(1));
      }
    });

    // Inner links: for hash links, scroll inside modal; external links open new tab
    bodyEl.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';

      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToAnchor(href.slice(1));
        return;
      }

      // If link points to another product/detail page on same site, open in modal
      if (!href.startsWith('http') && (href.endsWith('.html') || href.includes('.html#'))) {
        e.preventDefault();
        loadPageIntoModal(href, a.textContent.trim() || '內容');
      }
    });

    function ensureProductModal() {
      let existing = document.getElementById('productModal');
      if (existing) return existing;

      const modalEl = document.createElement('div');
      modalEl.id = 'productModal';
      modalEl.className = 'modal';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.setAttribute('aria-hidden', 'true');

      modalEl.innerHTML = (
        '<div class="modal-overlay" aria-hidden="true"></div>'
        + '<div class="modal-dialog" role="document">'
          + '<div class="modal-head">'
            + '<div class="modal-head-left">'
              + '<div class="modal-title">產品介紹</div>'
              + '<div class="modal-toc" aria-label="快速跳轉"></div>'
            + '</div>'
            + '<div class="modal-head-right">'
              + '<a class="modal-openpage" href="#" target="_blank" rel="noopener">開啟完整頁</a>'
              + '<button type="button" class="modal-close" aria-label="關閉">×</button>'
            + '</div>'
          + '</div>'
          + '<div class="modal-body" tabindex="0"></div>'
        + '</div>'
      );

      document.body.appendChild(modalEl);
      return modalEl;
    }
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
    setupProductModalFromPages();

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
