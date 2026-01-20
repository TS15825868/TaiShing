/* =========================================================
   main.js (FULL REPLACE)
   - Header spacing
   - Mobile nav toggle
   - Reveal animation
   - Floating LINE compact near footer
   - Product modal: load detail page <main> into modal, build TOC (dedupe)
   ========================================================= */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeText(s) {
    return (s || "").toString().replace(/[<>&]/g, (c) => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;"
    }[c]));
  }

  /* -----------------------------
     Header spacing & compact
  ----------------------------- */
  function updateMainPadding() {
    const header = $(".site-header");
    const main = $(".site-main");
    if (!header || !main) return;
    const h = header.offsetHeight || 0;
    main.style.paddingTop = (h + 18) + "px";
  }

  function setupHeaderCompact() {
    const header = $(".site-header");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add("header--compact");
      else header.classList.remove("header--compact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------
     Mobile nav toggle
  ----------------------------- */
  function setupNavToggle() {
    const toggle = $(".nav-toggle");
    const nav = $(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open");
    });

    // close when clicking a link (mobile)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    });
  }

  /* -----------------------------
     Reveal animation
  ----------------------------- */
  function setupReveal() {
    const items = $$(".reveal, .reveal-up");
    if (!items.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((el) => io.observe(el));
  }

  /* -----------------------------
     Floating LINE compact near footer
  ----------------------------- */
  function setupLineFloat() {
    const btn = $(".line-float");
    const footer = $(".site-footer");
    if (!btn || !footer) return;

    const onScroll = () => {
      const fRect = footer.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      // if footer enters view, compact
      if (fRect.top < vh - 40) btn.classList.add("is-compact");
      else btn.classList.remove("is-compact");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     Product Modal
  ========================================================= */
  const MODAL_ID = "productModalV2";

  function ensureModal() {
    let modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-overlay" data-close="1" aria-hidden="true"></div>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="產品詳細介紹">
        <div class="modal-head">
          <div class="modal-head-left">
            <div class="modal-title" id="${MODAL_ID}-title">產品詳細介紹</div>
            <div class="modal-toc" id="${MODAL_ID}-toc" aria-label="目錄"></div>
          </div>
          <div class="modal-head-right">
            <button class="modal-toc-toggle" type="button" aria-label="顯示目錄">目錄</button>
            <button class="modal-close" type="button" aria-label="關閉">×</button>
          </div>
        </div>
        <div class="modal-body" id="${MODAL_ID}-body">
          <div class="modal-loading">
            <div style="font-weight:800; letter-spacing:.04em; color: rgba(0,0,0,.78);">載入中…</div>
            <div class="modal-loading-bar"></div>
            <div style="color: rgba(0,0,0,.62); font-size:.95rem;">正在取得詳細內容，請稍候。</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // close handlers
    const overlay = $(".modal-overlay", modal);
    const closeBtn = $(".modal-close", modal);
    const tocToggle = $(".modal-toc-toggle", modal);
    const toc = $("#" + MODAL_ID + "-toc", modal);
    const body = $("#" + MODAL_ID + "-body", modal);

    if (overlay) overlay.addEventListener("click", () => closeModal());
    if (closeBtn) closeBtn.addEventListener("click", () => closeModal());

    // ESC close
    document.addEventListener("keydown", (e) => {
      if (!isModalOpen()) return;
      if (e.key === "Escape") closeModal();
    });

    // toc auto fade on scroll
    if (body) {
      let t = null;
      body.addEventListener("scroll", () => {
        modal.classList.add("is-body-scrolled");
        clearTimeout(t);
        t = setTimeout(() => {
          // keep state (so it stays compact) unless user toggled peek
          if (!modal.classList.contains("is-toc-peek")) {
            // nothing
          }
        }, 250);
      }, { passive: true });
    }

    // toc toggle
    if (tocToggle) {
      tocToggle.addEventListener("click", () => {
        modal.classList.toggle("is-toc-peek");
        if (modal.classList.contains("is-toc-peek")) {
          modal.classList.remove("is-body-scrolled");
          // allow interactions with toc again
          if (toc) toc.scrollLeft = 0;
        }
      });
    }

    return modal;
  }

  function isModalOpen() {
    const modal = document.getElementById(MODAL_ID);
    return !!(modal && modal.classList.contains("is-open"));
  }

  function openModal() {
    const modal = ensureModal();
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    modal.classList.add("is-open");
    modal.classList.remove("is-closing");
    modal.classList.remove("is-body-scrolled");
    modal.classList.remove("is-toc-peek");
  }

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.classList.add("is-closing");
    setTimeout(() => {
      modal.classList.remove("is-open");
      modal.classList.remove("is-closing");
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      // cleanup body content to avoid heavy memory
      const body = $("#" + MODAL_ID + "-body", modal);
      if (body) body.innerHTML = "";
      const toc = $("#" + MODAL_ID + "-toc", modal);
      if (toc) toc.innerHTML = "";
    }, 180);
  }

  function setModalLoading(titleText) {
    const modal = ensureModal();
    const title = $("#" + MODAL_ID + "-title", modal);
    const body = $("#" + MODAL_ID + "-body", modal);
    const toc = $("#" + MODAL_ID + "-toc", modal);

    if (title) title.textContent = titleText || "載入中…";
    if (toc) toc.innerHTML = "";
    if (body) {
      body.innerHTML = `
        <div class="modal-loading">
          <div style="font-weight:800; letter-spacing:.04em; color: rgba(0,0,0,.78);">載入中…</div>
          <div class="modal-loading-bar"></div>
          <div style="color: rgba(0,0,0,.62); font-size:.95rem;">正在取得詳細內容，請稍候。</div>
        </div>
      `;
    }
  }

  function setModalError(titleText, message) {
    const modal = ensureModal();
    const title = $("#" + MODAL_ID + "-title", modal);
    const body = $("#" + MODAL_ID + "-body", modal);
    const toc = $("#" + MODAL_ID + "-toc", modal);
    if (title) title.textContent = titleText || "載入失敗";
    if (toc) toc.innerHTML = "";

    if (body) {
      body.innerHTML = `
        <div class="section" style="margin:0; padding:18px 16px;">
          <div class="section-kicker">ERROR</div>
          <h2 class="section-title" style="margin:10px 0;">內容載入失敗</h2>
          <p style="margin:0 0 10px;">
            無法取得詳細頁內容，可能原因：檔案路徑錯誤、GitHub Pages 尚未更新、或瀏覽器快取仍在使用舊檔。
          </p>
          <p class="text-note" style="margin:0 0 12px;">${safeText(message || "請稍後重試。")}</p>
          <a class="btn-outline" href="#" data-close="1">關閉</a>
        </div>
      `;

      const close = $('[data-close="1"]', body);
      if (close) close.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
      });
    }
  }

  function absolutizeLinks(rootEl, pageUrl) {
    // ensure links in modal work relative to original page
    const anchors = $$("a[href]", rootEl);
    anchors.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href) return;
      if (href.startsWith("#")) return; // in-page
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("http://") || href.startsWith("https://")) return;

      try {
        const abs = new URL(href, pageUrl).toString();
        a.setAttribute("href", abs);
      } catch (_) {}
    });

    const imgs = $$("img[src]", rootEl);
    imgs.forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!src) return;
      if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) return;
      try {
        const abs = new URL(src, pageUrl).toString();
        img.setAttribute("src", abs);
      } catch (_) {}
    });
  }

  function buildTOC(modalBodyEl) {
    const modal = ensureModal();
    const toc = $("#" + MODAL_ID + "-toc", modal);
    if (!toc) return;

    // find headings inside modal content
    const headings = $$("h2, h3", modalBodyEl)
      .filter(h => (h.textContent || "").trim().length > 0)
      .slice(0, 24);

    const seen = new Set();
    const items = [];

    headings.forEach((h, idx) => {
      if (!h.id) h.id = "msec-" + idx + "-" + Math.random().toString(16).slice(2, 8);
      const text = (h.textContent || "").trim();
      const key = text + "::" + h.tagName + "::" + h.id;
      if (seen.has(key)) return;
      seen.add(key);
      items.push({ id: h.id, text });
    });

    // add CTA to LINE (optional)
    const lineUrl = "https://lin.ee/sHZW7NkR";

    toc.innerHTML = "";
    items.forEach((it) => {
      const a = document.createElement("a");
      a.className = "modal-toc-link";
      a.href = "#" + it.id;
      a.textContent = it.text;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(it.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

        // if user used toc, allow peek close
        const m = document.getElementById(MODAL_ID);
        if (m) m.classList.remove("is-toc-peek");
      });
      toc.appendChild(a);
    });

    // CTA at end
    const cta = document.createElement("a");
    cta.className = "modal-toc-link modal-toc-cta";
    cta.href = lineUrl;
    cta.target = "_blank";
    cta.rel = "noopener";
    cta.textContent = "LINE 諮詢";
    toc.appendChild(cta);
  }

  async function loadDetailIntoModal(url) {
    openModal();
    setModalLoading("載入中…");

    const modal = ensureModal();
    const body = $("#" + MODAL_ID + "-body", modal);
    const title = $("#" + MODAL_ID + "-title", modal);
    if (!body) return;

    try {
      // cache bust to avoid GitHub pages cache
      const u = new URL(url, window.location.href);
      u.searchParams.set("_ts", Date.now().toString());

      const res = await fetch(u.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const pageTitle = (doc.querySelector("title")?.textContent || "").trim();
      if (title) title.textContent = pageTitle || "產品詳細介紹";

      const main = doc.querySelector("main");
      if (!main) throw new Error("找不到 <main>，請確認詳情頁結構。");

      // remove elements not desired inside modal
      const cloned = main.cloneNode(true);

      // remove nested headers/footers if any
      $$("header, footer, .site-header, .site-footer, .line-float, script", cloned).forEach(el => el.remove());

      // add class for css targeting
      const wrapper = document.createElement("div");
      wrapper.className = "modal-page";
      wrapper.appendChild(cloned);

      // absolutize resource links
      absolutizeLinks(wrapper, u.toString());

      // inject
      body.innerHTML = "";
      body.appendChild(wrapper);

      // build TOC (dedupe)
      buildTOC(body);

      // reset scroll
      body.scrollTop = 0;

    } catch (err) {
      setModalError("載入失敗", (err && err.message) ? err.message : String(err));
    }
  }

  function shouldOpenModalForLink(a) {
    if (!a) return false;
    if (!a.classList.contains("js-product-modal")) return false;

    // if external (LINE), do not modal
    const href = a.getAttribute("href") || "";
    if (!href) return false;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      // if it is same origin site pages, still allow modal
      try {
        const u = new URL(href);
        const here = new URL(window.location.href);
        if (u.origin === here.origin) return true;
        return false;
      } catch (_) {
        return false;
      }
    }
    return true;
  }

  function bindModalTriggersDirect() {
    // direct bind (iOS safe)
    const links = $$("a.js-product-modal");
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        // if already handled by delegation, no harm
        e.preventDefault();
        const href = a.getAttribute("href");
        if (!href) return;
        loadDetailIntoModal(href);
      });
    });
  }

  function bindModalTriggersDelegation() {
    // delegation (for dynamic content)
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      // close from inside modal
      if (a.getAttribute("data-close") === "1") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (!shouldOpenModalForLink(a)) return;

      e.preventDefault();
      const href = a.getAttribute("href");
      if (!href) return;
      loadDetailIntoModal(href);
    }, true);
  }

  /* -----------------------------
     Init
  ----------------------------- */
  function init() {
    updateMainPadding();
    window.addEventListener("resize", updateMainPadding);

    setupHeaderCompact();
    setupNavToggle();
    setupReveal();
    setupLineFloat();

    // modal bindings
    bindModalTriggersDelegation();
    bindModalTriggersDirect();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
