/* =========================================================
   main.js | 台興山產・仙加味
   - 固定 Header 間距（避免內容被蓋住）
   - 手機漢堡選單
   - Reveal 動畫
   - 浮動 LINE 按鈕靠近 Footer 自動縮小
   - 產品卡片「不換頁跳窗」：載入各產品頁 <main> 到 Modal
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------
     Utilities
  ------------------------------*/
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function isModifiedClick(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1;
  }

  /* -----------------------------
     1) Fixed header padding (robust)
  ------------------------------*/
  function setMainPadding() {
    const header = qs(".site-header");
    const main = qs(".site-main");
    if (!header || !main) return;

    const h = Math.ceil(header.getBoundingClientRect().height);
    // 內容上緣留一點呼吸，避免貼太緊
    main.style.paddingTop = `${h + 18}px`;
  }

  function initHeaderCompact() {
    const header = qs(".site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add("header--compact");
      else header.classList.remove("header--compact");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------
     2) Mobile nav toggle
  ------------------------------*/
  function initMobileNav() {
    const toggles = qsa(".nav-toggle");
    if (!toggles.length) return;

    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const header = btn.closest(".site-header");
        const nav = header ? qs(".site-nav", header) : qs(".site-nav");
        if (!nav) return;

        const isOpen = nav.classList.toggle("is-open");
        btn.classList.toggle("is-open", isOpen);
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    // 點到選單連結後收起（手機手感更像 App）
    qsa(".site-nav a").forEach((a) => {
      a.addEventListener("click", () => {
        const nav = a.closest(".site-nav");
        const header = a.closest(".site-header");
        const btn = header ? qs(".nav-toggle", header) : qs(".nav-toggle");
        if (nav && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          if (btn) {
            btn.classList.remove("is-open");
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  /* -----------------------------
     3) Reveal animations
  ------------------------------*/
  function initReveal() {
    const els = qsa(".reveal, .reveal-up");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
  }

  /* -----------------------------
     4) Floating LINE CTA near footer
  ------------------------------*/
  function initLineFloatCompact() {
    const floatBtn = qs(".line-float");
    const footer = qs(".site-footer");
    if (!floatBtn || !footer) return;

    const onScroll = () => {
      const fRect = footer.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // footer 進入視窗底部附近就縮
      const nearFooter = fRect.top < vh - 120;
      floatBtn.classList.toggle("is-compact", nearFooter);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------
     5) Product modal (no page change)
     - If fetch fails (common on file://), fallback to normal navigation.
  ------------------------------*/

  function ensureModal() {
    let modal = qs(".modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-overlay" data-modal-close="true"></div>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="產品介紹">
        <div class="modal-head">
          <div class="modal-head-left">
            <div class="modal-title">載入中…</div>
            <div class="modal-toc" aria-label="內容目錄"></div>
          </div>
          <div class="modal-head-right">
            <div class="modal-toc-toggle" title="顯示/隱藏目錄">目錄</div>
            <button class="modal-close" type="button" aria-label="關閉">×</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-loading">
            <div>正在載入內容…</div>
            <div class="modal-loading-bar"></div>
            <div class="modal-loading-bar"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function openModal() {
    const modal = ensureModal();
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    modal.classList.add("is-open");
    modal.classList.remove("is-closing");
  }

  function closeModal() {
    const modal = qs(".modal");
    if (!modal || !modal.classList.contains("is-open")) return;

    modal.classList.add("is-closing");
    window.setTimeout(() => {
      modal.classList.remove("is-open", "is-closing", "is-body-scrolled", "is-toc-peek");
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");

      // 清空內容（避免下次閃舊內容）
      const body = qs(".modal-body", modal);
      const toc = qs(".modal-toc", modal);
      const title = qs(".modal-title", modal);
      if (title) title.textContent = "";
      if (toc) toc.innerHTML = "";
      if (body) {
        body.innerHTML = `
          <div class="modal-loading">
            <div>正在載入內容…</div>
            <div class="modal-loading-bar"></div>
            <div class="modal-loading-bar"></div>
          </div>
        `;
      }
    }, 200);
  }

  function buildTOC(container, modal) {
    const toc = qs(".modal-toc", modal);
    const tocToggle = qs(".modal-toc-toggle", modal);
    if (!toc) return;

    const headings = qsa("h2, h3", container).filter((h) => h.textContent.trim().length > 0);
    if (!headings.length) {
      toc.innerHTML = "";
      if (tocToggle) tocToggle.style.display = "none";
      return;
    }

    // 確保每個 heading 都有 id
    headings.forEach((h, idx) => {
      if (!h.id) {
        const base = h.textContent
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\u4e00-\u9fa5\-]/g, "")
          .slice(0, 28);
        h.id = `m-${base || "section"}-${idx + 1}`;
      }
    });

    const links = headings.map((h) => {
      const label = h.textContent.trim();
      return `<a class="modal-toc-link" href="#${escapeHtml(h.id)}">${escapeHtml(label)}</a>`;
    });

    // 固定加一顆 CTA（導向 LINE）
    links.push(
      `<a class="modal-toc-link modal-toc-cta" href="https://lin.ee/sHZW7NkR" target="_blank" rel="noopener">先聊聊狀況</a>`
    );

    toc.innerHTML = links.join("");

    // TOC toggle
    if (tocToggle) {
      tocToggle.style.display = "inline-flex";
      tocToggle.onclick = () => {
        modal.classList.toggle("is-toc-peek");
      };
    }

    // 目錄內部點擊：滑動到 anchor（在 modal 內）
    qsa(".modal-toc-link", toc).forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = href.slice(1);
        const target = qs(`#${CSS.escape(id)}`, container);
        const body = qs(".modal-body", modal);
        if (target && body) {
          body.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
        }
      });
    });
  }

  async function loadPageIntoModal(url) {
    const modal = ensureModal();
    const body = qs(".modal-body", modal);
    const titleEl = qs(".modal-title", modal);

    if (!body) return;

    // 先顯示 loading
    body.innerHTML = `
      <div class="modal-loading">
        <div>正在載入內容…</div>
        <div class="modal-loading-bar"></div>
        <div class="modal-loading-bar"></div>
      </div>
    `;

    // 在 file:// 環境，fetch 常因瀏覽器策略失敗
    // 仍先嘗試，失敗就回到正常跳頁（保底不讓使用者卡住）
    let htmlText = "";
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      htmlText = await res.text();
    } catch (err) {
      // fallback：直接換頁
      window.location.href = url;
      return;
    }

    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const main = doc.querySelector("main");

    // title
    if (titleEl) {
      const t = (doc.title || "產品介紹").split("|")[0].trim();
      titleEl.textContent = t || "產品介紹";
    }

    if (!main) {
      body.innerHTML = `
        <div class="section">
          <h2 class="section-title">內容載入失敗</h2>
          <p>找不到產品內容主區塊（main）。你仍可直接開啟完整頁面閱讀。</p>
          <a class="btn-primary" href="${escapeHtml(url)}">開啟完整頁面</a>
        </div>
      `;
      return;
    }

    // 清理不需要的固定/浮動元素
    qsa(".site-header, .site-footer, .line-float, script", main).forEach((n) => n.remove());

    // 包一層 class 讓 CSS 套用 modal-page 規則
    const wrapper = document.createElement("div");
    wrapper.className = "modal-page";

    // 轉成 DOM 節點（避免直接插入 foreign doc node）
    const imported = document.importNode(main, true);
    wrapper.appendChild(imported);

    body.innerHTML = "";
    body.appendChild(wrapper);

    // 建立 TOC
    buildTOC(wrapper, modal);

    // 監看捲動以自動淡出 TOC（更像 App）
    const onBodyScroll = () => {
      const scrolled = body.scrollTop > 24;
      modal.classList.toggle("is-body-scrolled", scrolled);
      if (!scrolled) modal.classList.remove("is-toc-peek");
    };
    body.removeEventListener("scroll", onBodyScroll);
    body.addEventListener("scroll", onBodyScroll, { passive: true });
    onBodyScroll();
  }

  function initProductModal() {
    const modal = ensureModal();
    const overlay = qs(".modal-overlay", modal);
    const closeBtn = qs(".modal-close", modal);

    const closeIfAllowed = (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-modal-close") === "true") closeModal();
    };

    if (overlay) overlay.addEventListener("click", closeIfAllowed);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // delegate: 任何 a.js-product-modal 都支援
    document.addEventListener("click", async (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a.js-product-modal") : null;
      if (!a) return;
      if (isModifiedClick(e)) return; // 讓新分頁/複製等行為正常
      if ((a.getAttribute("target") || "").toLowerCase() === "_blank") return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();

      openModal();
      await loadPageIntoModal(href);
    });
  }

  /* -----------------------------
     6) Unified nav (optional)
     - 修正：TCM 檔名以 tcm.html 為準（避免舊檔名導致連結失效）
  ------------------------------*/
  function setupUnifiedNav() {
    const nav = qs(".site-nav ul");
    if (!nav) return;

    const NAV_ITEMS = [
      { href: "index.html", label: "首頁" },
      { href: "index.html#all-products", label: "產品總覽" },
      { href: "guide.html", label: "依需求挑選" },
      { href: "faq.html", label: "常見問題" },
      { href: "tcm.html", label: "中醫觀點" },
      { href: "about.html", label: "關於我們" },
      { href: "contact.html", label: "聯絡我們" },
      { href: "https://lin.ee/sHZW7NkR", label: "LINE", external: true },
    ];

    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    nav.innerHTML = NAV_ITEMS.map((item) => {
      const isIndexAnchor = item.href.startsWith("index.html#");
      const isActive = (!isIndexAnchor && item.href.toLowerCase() === current) ||
        (current === "index.html" && item.href === "index.html");

      const cls = `nav-link${isActive ? " nav-link--active" : ""}`;
      const ext = item.external ? ' target="_blank" rel="noopener"' : "";
      return `<li><a href="${item.href}" class="${cls}"${ext}>${item.label}</a></li>`;
    }).join("");
  }

  /* -----------------------------
     Boot
  ------------------------------*/
  function boot() {
    setupUnifiedNav();
    setMainPadding();
    initHeaderCompact();
    initMobileNav();
    initReveal();
    initLineFloatCompact();
    initProductModal();

    // resize 時重新計算 main padding
    window.addEventListener("resize", () => {
      setMainPadding();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
