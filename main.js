/* =========================================================
   TaiShing Site - main.js (Final)
   - Header padding-top auto fix
   - Compact header on scroll
   - Reveal animations（✅ iOS/Safari 首屏不再空白）
   - Floating LINE button helper（用既有 .line-float，沒有才自動生成）
   - Mobile 漢堡選單：點外面 or 捲動自動收合
   - Product modal: load product pages into modal (no page change)
   - Modal: ✕ / ESC / overlay close, scroll lock, fade out, focus restore
   - Modal TOC: horizontal scroll, fade out on scroll, "目錄" button to bring back
   - ✅ TOC order unified across all products
   - ✅ Modal content sections reordered to match TOC order (missing skipped)
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

    forceRevealAboveFold();
    window.addEventListener("load", forceRevealAboveFold);
    setTimeout(forceRevealAboveFold, 250);
  }

  // 使用現有 .line-float；沒有才建立
  function setupLineFloat() {
    const LINE_URL = "https://lin.ee/sHZW7NkR";

    let btn = document.querySelector(".line-float");

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
      if (!btn.getAttribute("href")) btn.href = LINE_URL;
      if (!btn.getAttribute("target")) btn.target = "_blank";
      if (!btn.getAttribute("rel")) btn.rel = "noopener";
      if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "透過 LINE 聯絡我們");
    }

    let toast = document.querySelector(".line-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "line-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    try {
      const h = new Date().getHours();
      if (h >= 19 || h <= 6) btn.classList.add("is-night");
    } catch (_) {}

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

    btn.addEventListener("click", () => {
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

    if (!toggle.hasAttribute("aria-expanded")) toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const next = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", next);
      toggle.classList.toggle("is-open", next);
      toggle.setAttribute("aria-expanded", next ? "true" : "false");
    });

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) closeNav();
      });
    });

    document.addEventListener("click", function (e) {
      const clickInsideNav = nav.contains(e.target);
      const clickOnToggle = toggle.contains(e.target);
      if (!clickInsideNav && !clickOnToggle) closeNav();
    });

    window.addEventListener(
      "scroll",
      function () {
        if (window.innerWidth <= 768 && nav.classList.contains("is-open")) closeNav();
      },
      { passive: true }
    );
  }

  // ✅ 全站統一：漢堡選單順序 + 拿掉「LINE」項目
  function setupUnifiedNav() {
    const navUl = document.querySelector(".site-nav ul");
    if (!navUl) return;

    const items = [
      { href: "index.html", label: "首頁", key: "home" },
      { href: "index.html#all-products", label: "產品總覽", key: "products" },
      { href: "guide.html", label: "依需求挑選", key: "guide" },
      { href: "doctor_tiktok.html", label: "中醫觀點", key: "tcm" },
      { href: "about.html", label: "關於我們", key: "about" },
      { href: "faq.html", label: "常見問題", key: "faq" },
      { href: "contact.html", label: "聯絡我們", key: "contact" }
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

    navUl.innerHTML = items
      .map((it) => {
        const active = isActive(it.key) ? " nav-link--active" : "";
        return `<li><a href="${it.href}" class="nav-link${active}">${it.label}</a></li>`;
      })
      .join("");
  }

  function setupProductModalFromPages() {
    const modal = ensureProductModal();
    const overlay = modal.querySelector(".modal-overlay");
    const dialog = modal.querySelector(".modal-dialog");
    const titleEl = modal.querySelector(".modal-title");
    const tocEl = modal.querySelector(".modal-toc");
    const bodyEl = modal.querySelector(".modal-body");
    const closeBtn = modal.querySelector(".modal-close");
    const tocToggleBtn = modal.querySelector(".modal-toc-toggle");

    const LINE_URL = "https://lin.ee/sHZW7NkR";

    // ✅ 你指定的固定順序（TOC與內容都依此排序；缺少就略過但順序不變）
    const SECTION_ORDER = [
      { key: "spec", label: "容量／規格", match: /(容量|規格|重量|包裝|內容量|ml|cc|g|公克|斤|兩|盒|罐|包|份)/ },
      { key: "ingredient", label: "成份", match: /(成份|成分|原料|配方|內容物|藥材|漢方)/ },
      { key: "audience", label: "適合族群\/適用對象", match: /(適合族群|適用對象|誰適合|推薦對象|適合對象|對象)/ },
      { key: "usage", label: "使用方式\/建議使用方式\/使用方向", match: /(使用方式|建議使用方式|使用方向|吃法|用法|怎麼吃|沖泡|料理|大略說明)/ },
      { key: "storage", label: "保存方式", match: /(保存方式|保存|存放|冷藏|常溫|賞味|有效期限)/ },
      { key: "cooperate", label: "合作方式與報價", match: /(合作方式|報價|合作|經銷|批發|零售|MOQ|出貨|運費|付款|條件|價格|詢價)/ },
      { key: "faq", label: "常見問題", match: /(常見問題|FAQ|Q&A)/i },
      { key: "consult", label: "先聊聊狀況", match: /(先聊聊狀況|聊聊狀況|再評估|評估是否適用|一對一|諮詢)/ }
    ];

    let lastFocus = null;
    let scrollY = 0;

    function focusRestore(el) {
      if (!el || !document.contains(el) || typeof el.focus !== "function") return;

      const isNaturallyFocusable =
        el.matches("a[href], button, input, select, textarea, summary") || el.hasAttribute("tabindex");

      let madeTabbable = false;
      if (!isNaturallyFocusable) {
        el.setAttribute("tabindex", "-1");
        madeTabbable = true;
      }

      try {
        el.focus({ preventScroll: true });
      } catch (e) {
        el.focus();
      }

      if (madeTabbable) el.removeAttribute("tabindex");
    }

    function lockScroll() {
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }

    function unlockScroll() {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }

    function openModal(triggerEl) {
      lastFocus = triggerEl || document.activeElement;
      modal.classList.remove("is-closing", "is-body-scrolled", "is-toc-peek");
      lockScroll();
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("is-open");
      setTimeout(() => closeBtn && closeBtn.focus(), 0);
    }

    function closeModal() {
      if (!modal.classList.contains("is-open") || modal.classList.contains("is-closing")) return;

      modal.classList.add("is-closing");
      setTimeout(() => {
        modal.classList.remove("is-open", "is-closing", "is-body-scrolled", "is-toc-peek");
        modal.setAttribute("aria-hidden", "true");
        unlockScroll();
        if (lastFocus) setTimeout(() => focusRestore(lastFocus), 0);
      }, 200);
    }

    function setLoading(titleText) {
      titleEl.textContent = titleText || "產品介紹";
      tocEl.innerHTML = "";
      bodyEl.innerHTML =
        '<div class="modal-loading">' +
        '<div class="modal-loading-bar"></div>' +
        '<div class="modal-loading-bar"></div>' +
        '<div class="modal-loading-bar"></div>' +
        "</div>";
    }

    function getSectionKeyFromText(text) {
      const t = (text || "").trim();
      for (const s of SECTION_ORDER) {
        if (s.match.test(t)) return s.key;
      }
      return null;
    }

    // ✅ 正確重排：以「整個 .section」為單位搬移（修正你現在看到的空白框問題）
    function reorderModalSections(wrapper) {
      const sections = Array.from(wrapper.querySelectorAll("section.section"));
      if (!sections.length) return;

      const sectionInfo = sections.map((sec) => {
        const h = sec.querySelector("h2, h3");
        const key = h ? getSectionKeyFromText(h.textContent || "") : null;
        return { sec, key, hasHeading: !!h };
      });

      // Preface：放最前面（通常是產品主視覺那段，沒有 h2/h3 或不屬於 8 類）
      const preface = [];
      const keyed = new Map();
      SECTION_ORDER.forEach((s) => keyed.set(s.key, []));

      const unknown = [];

      sectionInfo.forEach((it) => {
        if (it.key && keyed.has(it.key)) {
          keyed.get(it.key).push(it.sec);
        } else if (!it.hasHeading) {
          // 沒有 h2/h3 的 section（通常是第一段主視覺），保留在最上面
          preface.push(it.sec);
        } else {
          unknown.push(it.sec);
        }
      });

      const frag = document.createDocumentFragment();

      // 1) preface 原順序
      preface.forEach((sec) => frag.appendChild(sec));

      // 2) 依你指定的 8 項順序（缺少略過）
      SECTION_ORDER.forEach((s) => {
        const list = keyed.get(s.key) || [];
        list.forEach((sec) => frag.appendChild(sec));
      });

      // 3) 未分類但有內容的 section 仍保留（完整性）
      unknown.forEach((sec) => frag.appendChild(sec));

      // 重新塞回 wrapper（只針對 section；其他像 back-to-products 保留在後面）
      const tailNodes = [];
      Array.from(wrapper.children).forEach((child) => {
        if (child.matches && child.matches("section.section")) return;
        tailNodes.push(child);
      });

      wrapper.innerHTML = "";
      wrapper.appendChild(frag);
      tailNodes.forEach((n) => wrapper.appendChild(n));
    }

    function ensureHeadingIds(wrapper) {
      const used = new Set();
      const slugify = (text) => {
        const base = (text || "")
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[^\u4e00-\u9fff\w\s-]+/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        return base || "section";
      };

      wrapper.querySelectorAll("h2, h3").forEach((h) => {
        const rawId = (h.getAttribute("id") || "").trim();
        let id = rawId || slugify(h.textContent);

        let n = 1;
        let candidate = id;
        while (used.has(candidate) || wrapper.querySelector("#" + CSS.escape(candidate))) {
          n += 1;
          candidate = id + "-" + n;
        }
        id = candidate;
        used.add(id);
        h.id = id;
      });
    }

    function buildToc(wrapper) {
      const firstHeadingByKey = {};
      SECTION_ORDER.forEach((s) => (firstHeadingByKey[s.key] = null));

      const sections = Array.from(wrapper.querySelectorAll("section.section"));
      sections.forEach((sec) => {
        const h = sec.querySelector("h2[id], h3[id]");
        if (!h) return;
        const key = getSectionKeyFromText(h.textContent || "");
        if (key && !firstHeadingByKey[key]) firstHeadingByKey[key] = h;
      });

      tocEl.innerHTML = "";

      SECTION_ORDER.forEach((s) => {
        const h = firstHeadingByKey[s.key];
        if (!h) return;

        const a = document.createElement("a");

        if (s.key === "consult") {
          a.className = "modal-toc-link modal-toc-cta";
          a.href = LINE_URL;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = s.label;
        } else {
          a.className = "modal-toc-link";
          a.href = "#" + h.id;
          a.textContent = s.label;
        }

        tocEl.appendChild(a);
      });
    }

    function scrollToAnchor(anchorId) {
      const target = bodyEl.querySelector("#" + CSS.escape(anchorId));
      if (!target) return;
      const top =
        target.getBoundingClientRect().top -
        bodyEl.getBoundingClientRect().top +
        bodyEl.scrollTop -
        8;
      bodyEl.scrollTo({ top, behavior: "smooth" });
    }

    tocEl.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      if (link.classList.contains("modal-toc-cta")) return;

      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;

      e.preventDefault();
      scrollToAnchor(href.slice(1));
    });

    async function loadPageIntoModal(href, fallbackTitle) {
      setLoading(fallbackTitle);

      try {
        const res = await fetch(href, { cache: "no-store" });
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const pageTitle = (doc.querySelector("title")?.textContent || "").trim();
        titleEl.textContent = pageTitle || fallbackTitle || "產品介紹";

        const main = doc.querySelector("main") || doc.querySelector(".site-main") || doc.body;
        const wrapper = document.createElement("div");
        wrapper.className = "modal-page";
        wrapper.innerHTML = main.innerHTML;

        // 移除不該出現在彈窗裡的元素
        wrapper
          .querySelectorAll(".line-float, .site-header, .site-footer, script, noscript")
          .forEach((el) => el.remove());

        // 彈窗內強制顯示 reveal（避免圖片/文字不出現）
        wrapper.querySelectorAll(".reveal, .reveal-up").forEach((el) => el.classList.add("is-visible"));

        // 詳情頁的「返回產品列表」在彈窗內改成「關閉」
        wrapper.querySelectorAll(".back-link").forEach((a) => {
          a.textContent = "關閉";
          a.setAttribute("href", "#");
          a.setAttribute("role", "button");
          a.classList.add("modal-close-link");
          a.addEventListener("click", (evt) => {
            evt.preventDefault();
            closeModal();
          });
        });

        // ✅ 1) 確保 h2/h3 都有 id
        ensureHeadingIds(wrapper);

        // ✅ 2) 依 8 項順序重排「整個 section」
        reorderModalSections(wrapper);

        // Inject
        bodyEl.innerHTML = "";
        bodyEl.appendChild(wrapper);

        // ✅ 3) 依同一套順序生成 TOC（缺少略過）
        buildToc(wrapper);

        const hashIndex = href.indexOf("#");
        if (hashIndex > -1) {
          const anchorId = href.slice(hashIndex + 1);
          setTimeout(() => scrollToAnchor(anchorId), 60);
        } else {
          bodyEl.scrollTop = 0;
        }
      } catch (err) {
        console.error(err);
        titleEl.textContent = fallbackTitle || "產品介紹";
        tocEl.innerHTML = "";
        bodyEl.innerHTML =
          '<div class="modal-error">' +
          "<p>目前無法載入產品內容。</p>" +
          "</div>";
      }
    }

    // 全站攔截產品詳情頁連結 -> modal（但不動 header/nav/footer）
    if (!document.documentElement.dataset.productModalDelegated) {
      document.documentElement.dataset.productModalDelegated = "1";

      const PRODUCT_DETAIL_PAGES = new Set([
        "guilu.html",
        "guilu-drink.html",
        "soup.html",
        "antler.html",
        "lurong.html",
        "guilu-line.html"
      ]);

      const isInterceptCandidate = (a) => {
        if (!a) return false;
        if (a.closest(".site-header, .site-nav, .site-footer")) return false;
        if (a.classList.contains("nav-link")) return false;

        const href = (a.getAttribute("href") || "").trim();
        if (!href) return false;
        if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
        if (href.startsWith("#")) return false;

        const noQuery = href.split("?")[0];
        const noHash = noQuery.split("#")[0];
        const file = noHash.replace(/^\.\//, "").split("/").pop();
        return PRODUCT_DETAIL_PAGES.has(file);
      };

      document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        if (a.classList.contains("js-product-modal")) {
          const href = a.getAttribute("href");
          if (!href) return;
          e.preventDefault();
          const title =
            a.getAttribute("aria-label") ||
            a.getAttribute("title") ||
            (a.textContent || "").trim() ||
            "產品介紹";
          loadPageIntoModal(href, title);
          openModal(a);
          return;
        }

        if (isInterceptCandidate(a)) {
          const href = a.getAttribute("href");
          e.preventDefault();
          const title =
            a.getAttribute("aria-label") ||
            a.getAttribute("title") ||
            (a.textContent || "").trim() ||
            "產品介紹";
          loadPageIntoModal(href, title);
          openModal(a);
        }
      });
    }

    if (overlay) overlay.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (dialog) dialog.addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    // 彈窗內 hash 滾動 / 站內 .html 仍在彈窗開
    bodyEl.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";

      if (href.startsWith("#")) {
        e.preventDefault();
        scrollToAnchor(href.slice(1));
        return;
      }

      if (!href.startsWith("http") && (href.endsWith(".html") || href.includes(".html#"))) {
        e.preventDefault();
        loadPageIntoModal(href, a.textContent.trim() || "內容");
      }
    });

    // 內文往下滑：TOC 淡出
    bodyEl.addEventListener(
      "scroll",
      () => {
        const y = bodyEl.scrollTop || 0;
        modal.classList.toggle("is-body-scrolled", y > 56);
      },
      { passive: true }
    );

    // 「目錄」按鈕：叫回 TOC
    let tocPeekTimer = null;

    function setTocToggleState() {
      if (!tocToggleBtn) return;
      const peek = modal.classList.contains("is-toc-peek");
      tocToggleBtn.setAttribute("aria-pressed", peek ? "true" : "false");
      tocToggleBtn.setAttribute("aria-label", peek ? "收起目錄" : "顯示目錄");
      tocToggleBtn.textContent = peek ? "收起" : "目錄";
    }

    if (tocToggleBtn) {
      tocToggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const next = !modal.classList.contains("is-toc-peek");
        modal.classList.toggle("is-toc-peek", next);
        setTocToggleState();

        if (tocPeekTimer) clearTimeout(tocPeekTimer);
        if (next) {
          tocPeekTimer = setTimeout(() => {
            modal.classList.remove("is-toc-peek");
            setTocToggleState();
          }, 6000);
        }
      });
      setTocToggleState();
    }

    // 一滾動就關掉 peek，避免遮擋
    bodyEl.addEventListener(
      "scroll",
      () => {
        if (modal.classList.contains("is-toc-peek")) {
          modal.classList.remove("is-toc-peek");
          setTocToggleState();
        }
      },
      { passive: true }
    );

    function ensureProductModal() {
      let existing = document.getElementById("productModal");
      if (existing) return existing;

      const modalEl = document.createElement("div");
      modalEl.id = "productModal";
      modalEl.className = "modal";
      modalEl.setAttribute("role", "dialog");
      modalEl.setAttribute("aria-modal", "true");
      modalEl.setAttribute("aria-hidden", "true");

      modalEl.innerHTML =
        '<div class="modal-overlay" aria-hidden="true"></div>' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-head">' +
        '<div class="modal-head-left">' +
        '<div class="modal-title">產品介紹</div>' +
        '<div class="modal-toc" aria-label="快速跳轉"></div>' +
        "</div>" +
        '<div class="modal-head-right">' +
        '<button type="button" class="modal-toc-toggle" aria-label="顯示目錄" aria-pressed="false">目錄</button>' +
        '<button type="button" class="modal-close" aria-label="關閉">×</button>' +
        "</div>" +
        "</div>" +
        '<div class="modal-body" tabindex="0"></div>' +
        "</div>";

      document.body.appendChild(modalEl);
      return modalEl;
    }
  }

  function setupBackLinks() {
    const backButtons = document.querySelectorAll(".back-link");
    if (!backButtons.length) return;

    const nav = document.querySelector(".site-nav");
    function closeNav() {
      if (nav && nav.classList.contains("is-open")) nav.classList.remove("is-open");
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
    window.addEventListener("load", setMainPaddingTop);
    setTimeout(setMainPaddingTop, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
