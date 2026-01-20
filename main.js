/* =========================================
   main.js — TaiShing site global behaviors
   - Unified header nav (desktop + mobile hamburger)
   - Header compact on scroll
   - Reveal animations (IntersectionObserver)
   - Floating LINE button compact near footer
   - Product modal: open product detail pages in modal (no page change)
   ========================================= */

(() => {
  "use strict";

  // ✅ If JS is running, enable reveal-hide behavior (CSS uses .has-js scope)
  document.documentElement.classList.add("has-js");

  /* -----------------------------------------
     Helpers
  ----------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

  const getHeaderHeight = () => {
    const header = $(".site-header");
    return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  };

  const setMainTopPadding = () => {
    const main = $(".site-main");
    const headerH = getHeaderHeight();
    if (main) {
      // Keep your base padding but ensure header doesn't overlap
      // If the page already sets padding-top in CSS, we only adjust if needed
      const style = window.getComputedStyle(main);
      const pt = parseFloat(style.paddingTop || "0");
      if (pt < headerH + 20) {
        main.style.paddingTop = `${headerH + 24}px`;
      }
    }
  };

  /* -----------------------------------------
     1) Unified Navigation (all pages)
     - Mobile hamburger toggles .site-nav.is-open
     - Remove LINE item in hamburger (per your requirement)
     ----------------------------------------- */
  function setupUnifiedNav() {
    const navUl = $(".site-nav ul");
    const toggleBtn = $(".nav-toggle");
    const nav = $(".site-nav");

    if (!navUl || !toggleBtn || !nav) return;

    // ✅ Your required order (NO LINE in hamburger)
    const items = [
      { href: "index.html", label: "首頁", key: "home" },
      { href: "index.html#all-products", label: "產品總覽", key: "products" },
      { href: "guide.html", label: "依需求挑選", key: "guide" },
      { href: "faq.html", label: "常見問題", key: "faq" },
      { href: "tcm.html", label: "中醫觀點", key: "tcm" },
      { href: "about.html", label: "關於我們", key: "about" },
      { href: "contact.html", label: "聯絡我們", key: "contact" }
    ];

    const path = (location.pathname || "").toLowerCase();

    const isActive = (item) => {
      if (item.key === "home") {
        return /(^|\/)index\.html$/.test(path) || path.endsWith("/taishing/") || path.endsWith("/taishing");
      }
      if (item.key === "products") {
        return /(^|\/)index\.html$/.test(path) && location.hash === "#all-products";
      }
      if (item.key === "guide") return path.includes("guide.html");
      if (item.key === "faq") return path.includes("faq.html");
      if (item.key === "tcm") return path.includes("tcm.html");
      if (item.key === "about") return path.includes("about.html");
      if (item.key === "contact") return path.includes("contact.html");
      return false;
    };

    // Build nav items
    navUl.innerHTML = items
      .map((item) => {
        const active = isActive(item) ? "nav-link nav-link--active" : "nav-link";
        return `<li><a href="${item.href}" class="${active}">${item.label}</a></li>`;
      })
      .join("");

    // Hamburger toggle
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggleBtn.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    };

    const openNav = () => {
      nav.classList.add("is-open");
      toggleBtn.classList.add("is-open");
      toggleBtn.setAttribute("aria-expanded", "true");
    };

    toggleBtn.setAttribute("aria-expanded", "false");

    on(toggleBtn, "click", () => {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });

    // Click any nav link -> close mobile menu
    on(nav, "click", (e) => {
      const a = e.target && e.target.closest("a");
      if (!a) return;
      closeNav();
    });

    // Click outside -> close
    on(document, "click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const withinHeader = e.target.closest(".site-header");
      if (!withinHeader) closeNav();
    });

    // ESC -> close
    on(document, "keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* -----------------------------------------
     2) Header compact on scroll
     ----------------------------------------- */
  function setupHeaderCompact() {
    const header = $(".site-header");
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        if (y > 18) header.classList.add("header--compact");
        else header.classList.remove("header--compact");
        ticking = false;
      });
    };

    on(window, "scroll", onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------
     3) Reveal animations
     ----------------------------------------- */
  function setupReveal() {
    const els = $$(".reveal, .reveal-up");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

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

  /* -----------------------------------------
     4) Floating LINE button compact near footer
     ----------------------------------------- */
  function setupFloatingLine() {
    const floatBtn = $(".line-float");
    const footer = $(".site-footer");
    if (!floatBtn || !footer) return;

    const onScroll = () => {
      const footerTop = footer.getBoundingClientRect().top;
      const vh = window.innerHeight || 0;
      // When footer is close, compact button a bit
      if (footerTop < vh + 40) floatBtn.classList.add("is-compact");
      else floatBtn.classList.remove("is-compact");
    };

    on(window, "scroll", onScroll, { passive: true });
    on(window, "resize", onScroll);
    onScroll();
  }

  /* -----------------------------------------
     5) Product modal (no page change)
     - Links: .js-product-modal (or .card-link.js-product-modal)
     - Loads target HTML and injects <main> into modal
     - Builds TOC from headings with ids
     ----------------------------------------- */
  function setupProductModal() {
    const triggers = $$(".js-product-modal");
    if (!triggers.length) return;

    // Create modal skeleton once
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-overlay" aria-hidden="true"></div>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="產品詳細介紹">
        <div class="modal-head">
          <div class="modal-head-left">
            <div class="modal-title">載入中…</div>
            <div class="modal-toc" aria-label="內容目錄"></div>
          </div>
          <div class="modal-head-right">
            <button class="modal-toc-toggle" type="button" aria-label="顯示目錄">目錄</button>
            <button class="modal-close" type="button" aria-label="關閉">×</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-loading">
            <div>正在載入內容…</div>
            <div class="modal-loading-bar"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const overlay = $(".modal-overlay", modal);
    const closeBtn = $(".modal-close", modal);
    const tocToggle = $(".modal-toc-toggle", modal);
    const titleEl = $(".modal-title", modal);
    const tocEl = $(".modal-toc", modal);
    const bodyEl = $(".modal-body", modal);

    let lastFocus = null;
    let currentUrl = null;
    let peekTimer = null;

    const openModal = () => {
      lastFocus = document.activeElement;
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      modal.classList.add("is-open");
    };

    const closeModal = () => {
      modal.classList.add("is-closing");
      setTimeout(() => {
        modal.classList.remove("is-open", "is-closing", "is-body-scrolled", "is-toc-peek");
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
        bodyEl.scrollTop = 0;
        tocEl.innerHTML = "";
        titleEl.textContent = "載入中…";
        currentUrl = null;
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }, 180);
    };

    const setLoading = () => {
      bodyEl.innerHTML = `
        <div class="modal-loading">
          <div>正在載入內容…</div>
          <div class="modal-loading-bar"></div>
        </div>
      `;
      tocEl.innerHTML = "";
      titleEl.textContent = "載入中…";
    };

    const escapeHTML = (s) =>
      String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const buildTOC = (container) => {
      // Headings we care about
      const headings = $$("h2[id], h3[id]", container);
      if (!headings.length) return;

      const links = headings
        .map((h) => {
          const id = h.id;
          const text = (h.textContent || "").trim();
          if (!id || !text) return "";
          return `<a class="modal-toc-link" href="#${escapeHTML(id)}">${escapeHTML(text)}</a>`;
        })
        .filter(Boolean)
        .join("");

      // Add an extra CTA to LINE (optional, helpful)
      const lineCTA = `<a class="modal-toc-link modal-toc-cta" href="https://lin.ee/sHZW7NkR" target="_blank" rel="noopener">先聊聊狀況</a>`;

      tocEl.innerHTML = links ? links + lineCTA : lineCTA;
    };

    const normalizeImportedContent = (container) => {
      // Remove nested floating LINE button if present
      $$(".line-float", container).forEach((n) => n.remove());

      // Ensure reveal sections are visible inside modal
      $$(".reveal, .reveal-up", container).forEach((el) => {
        el.classList.add("is-visible");
      });

      // If any <a class="js-product-modal"> exists inside imported page, disable to prevent nested fetch loops
      $$(".js-product-modal", container).forEach((a) => {
        a.classList.remove("js-product-modal");
      });
    };

    const loadUrlIntoModal = async (url) => {
      currentUrl = url;
      setLoading();

      try {
        const res = await fetch(url, { credentials: "same-origin" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const htmlText = await res.text();
        const doc = new DOMParser().parseFromString(htmlText, "text/html");

        // Title from h1/page-title if exists
        const h1 = doc.querySelector("h1") || doc.querySelector(".page-title");
        const pageTitle = (h1 ? h1.textContent : doc.title || "").trim();
        titleEl.textContent = pageTitle || "產品詳細介紹";

        // Extract main content
        const main = doc.querySelector("main.site-main") || doc.querySelector("main");
        if (!main) {
          throw new Error("找不到產品內容區塊（main）");
        }

        const wrapper = document.createElement("div");
        wrapper.className = "modal-page";
        wrapper.innerHTML = main.innerHTML;

        normalizeImportedContent(wrapper);

        // Replace modal body
        bodyEl.innerHTML = "";
        bodyEl.appendChild(wrapper);

        // Build TOC based on headings with ids
        buildTOC(wrapper);

        // Smooth scroll inside modal for TOC links
        $$(".modal-toc-link", modal).forEach((a) => {
          on(a, "click", (e) => {
            const href = a.getAttribute("href") || "";
            if (!href.startsWith("#")) return; // external (LINE CTA)
            e.preventDefault();
            const id = href.slice(1);
            const target = wrapper.querySelector(`#${CSS.escape(id)}`);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        });
      } catch (err) {
        const msg = (err && err.message) ? err.message : "載入失敗";
        bodyEl.innerHTML = `
          <div class="section" style="margin:0;">
            <div class="section-kicker">LOAD ERROR</div>
            <h2 class="section-title" style="margin-top:6px;">無法載入產品內容</h2>
            <p>可能原因：檔案路徑錯誤、或你正在以「檔案（file://）」方式打開（瀏覽器會阻擋 fetch）。</p>
            <p><strong>錯誤訊息：</strong> ${escapeHTML(msg)}</p>
            <div class="contact-actions">
              <a class="btn-primary" href="${escapeHTML(url)}" target="_blank" rel="noopener">改用新分頁開啟原頁</a>
              <button class="btn-outline" type="button" id="modalTryClose">關閉</button>
            </div>
          </div>
        `;
        const btn = $("#modalTryClose", bodyEl);
        if (btn) on(btn, "click", closeModal);
        tocEl.innerHTML = "";
        titleEl.textContent = "載入失敗";
      }
    };

    // Modal scroll behavior: hide TOC when scrolled
    on(bodyEl, "scroll", () => {
      const y = bodyEl.scrollTop || 0;
      if (y > 80) modal.classList.add("is-body-scrolled");
      else modal.classList.remove("is-body-scrolled");
    });

    // TOC toggle (peek)
    on(tocToggle, "click", () => {
      modal.classList.add("is-toc-peek");
      clearTimeout(peekTimer);
      peekTimer = setTimeout(() => modal.classList.remove("is-toc-peek"), 2600);
    });

    // Close handlers
    on(closeBtn, "click", closeModal);
    on(overlay, "click", closeModal);
    on(document, "keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
    });

    // Intercept clicks
    triggers.forEach((a) => {
      on(a, "click", (e) => {
        // Allow normal new tab with meta/ctrl
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const href = a.getAttribute("href");
        if (!href) return;

        e.preventDefault();
        openModal();
        loadUrlIntoModal(href);
      });
    });
  }

  /* -----------------------------------------
     6) Back link support on product detail pages
     ----------------------------------------- */
  function setupBackLink() {
    $$(".back-link").forEach((btn) => {
      on(btn, "click", (e) => {
        e.preventDefault();
        if (history.length > 1) history.back();
        else location.href = "index.html#all-products";
      });
    });
  }

  /* -----------------------------------------
     Init
  ----------------------------------------- */
  function init() {
    setupUnifiedNav();
    setupHeaderCompact();
    setupReveal();
    setupFloatingLine();
    setupProductModal();
    setupBackLink();
    setMainTopPadding();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", () => {
    setMainTopPadding();
  });
})();
