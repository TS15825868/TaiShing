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
   - ✅ Modal content sections reordered to match TOC order (missing sections skipped)
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
    let tocToggleBtn = modal.querySelector(".modal-toc-toggle");

    if (!tocToggleBtn && closeBtn && closeBtn.parentElement) {
      tocToggleBtn = document.createElement("button");
      tocToggleBtn.type = "button";
      tocToggleBtn.className = "modal-toc-toggle";
      tocToggleBtn.setAttribute("aria-label", "顯示目錄");
      tocToggleBtn.setAttribute("aria-pressed", "false");
      tocToggleBtn.textContent = "目錄";
      closeBtn.parentElement.insertBefore(tocToggleBtn, closeBtn);
    }

    const LINE_URL = "https://lin.ee/sHZW7NkR";

    // ✅ 你指定的固定章節順序（TOC與內容都依此排序）
    const SECTION_ORDER = [
      {
        key: "spec",
        label: "容量／規格",
        match: /(容量|規格|重量|包裝|內容量|ml|cc|g|公克|斤|兩|盒|罐|包|份)/
      },
      {
        key: "ingredient",
        label: "成份",
        match: /(成份|成分|原料|配方|內容物|藥材|漢方)/
      },
      {
        key: "audience",
        label: "適合族群/適用對象",
        match: /(適合族群|適用對象|誰適合|推薦對象|適合對象|對象)/
      },
      {
        key: "usage",
        label: "使用方式/使用方向",
        match: /(使用方式|建議使用方式|使用方向|吃法|用法|怎麼吃|沖泡|料理|大略說明)/
      },
      {
        key: "storage",
        label: "保存方式",
        match: /(保存方式|保存|存放|冷藏|常溫|賞味|有效期限)/
      },
      {
        key: "cooperate",
        label: "合作方式與報價",
        match: /(合作方式|報價|合作|經銷|批發|零售|MOQ|出貨|運費|付款|條件|價格|詢價)/
      },
      {
        key: "faq",
        label: "常見問題",
        match: /(常見問題|FAQ|Q&A)/i
      },
      {
        key: "consult",
        label: "先聊聊狀況",
        match: /(先聊聊狀況|聊聊狀況|再評估|評估是否適用|LINE|諮詢)/
      }
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

    // === Helpers for modal content ordering ===
    function getSectionKeyFromText(text) {
      const t = (text || "").trim();
      for (const s of SECTION_ORDER) {
        if (s.match.test(t)) return s.key;
      }
      return null;
    }

    // ✅ 把「標題 + 其下內容」做成 block，依你的順序重排（缺少略過）
    function reorderModalContentBySections(wrapper) {
      const root = wrapper; // wrapper is .modal-page
      const headings = Array.from(root.querySelectorAll("h2, h3")).filter(
        (h) => (h.textContent || "").trim().length > 0
      );
      if (!headings.length) return;

      // block: heading + nodes until next heading
      const blocks = [];
      for (let i = 0; i < headings.length; i++) {
        const h = headings[i];
        const startNode = h;
        const endNode = headings[i + 1] || null;

        const nodes = [];
        let cur = startNode;

        while (cur && cur !== endNode) {
          const next = cur.nextSibling;
          nodes.push(cur);
          cur = next;
        }

        const key = getSectionKeyFromText(h.textContent || "");
        blocks.push({ key, heading: h, nodes });
      }

      // Determine what to treat as "preface": nodes before the first heading in DOM flow
      // We'll keep them in place at top (e.g., hero image, intro copy)
      const firstHeading = headings[0];
      const preface = [];
      let cur = firstHeading.previousSibling;
      // collect backward then reverse
      while (cur) {
        const prev = cur.previousSibling;
        preface.push(cur);
        cur = prev;
      }
      preface.reverse();

      // Remove preface nodes and all blocks nodes from root (detach)
      preface.forEach((n) => n.parentNode === root && root.removeChild(n));
      blocks.forEach((b) => b.nodes.forEach((n) => n.parentNode && n.parentNode.removeChild(n)));

      // Group blocks by section key, preserve original order within each key
      const byKey = new Map();
      SECTION_ORDER.forEach((s) => byKey.set(s.key, []));
      const unknown = [];

      blocks.forEach((b) => {
        if (b.key && byKey.has(b.key)) byKey.get(b.key).push(b);
        else unknown.push(b);
      });

      // Rebuild: preface + blocks in required order + unknown blocks at end (to keep completeness)
      const frag = document.createDocumentFragment();

      preface.forEach((n) => frag.appendChild(n));

      SECTION_ORDER.forEach((s) => {
        const list = byKey.get(s.key);
        if (!list || !list.length) return;

        // keep all blocks that belong to the section (完整呈現)
        list.forEach((b) => b.nodes.forEach((n) => frag.appendChild(n)));
      });

      // Append unknown blocks (still keep content complete)
      unknown.forEach((b) => b.nodes.forEach((n) => frag.appendChild(n)));

      root.appendChild(frag);
    }

    // ✅ TOC 依同一套分類與順序產生（缺少略過）
    function buildToc(wrapper) {
      const headings = Array.from(wrapper.querySelectorAll("h2[id], h3[id]")).filter(
        (h) => (h.textContent || "").trim().length > 0
      );
      if (!headings.length) {
        tocEl.innerHTML = "";
        return;
      }

      // For each section key, pick the first heading occurrence (for TOC jump)
      const firstHeadingByKey = {};
      SECTION_ORDER.forEach((s) => (firstHeadingByKey[s.key] = null));

      headings.forEach((h) => {
        const k = getSectionKeyFromText(h.textContent || "");
        if (k && !firstHeadingByKey[k]) firstHeadingByKey[k] = h;
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

        wrapper
          .querySelectorAll(".line-float, .site-header, .site-footer, script, noscript")
          .forEach((el) => el.remove());

        wrapper.querySelectorAll(".reveal, .reveal-up").forEach((el) => {
          el.classList.add("is-visible");
        });

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

        // Ensure IDs exist + unique
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

        // ✅ 重排彈窗內容：依你指定的 8 項順序（完整、缺少略過）
        reorderModalContentBySections(wrapper);

        // Inject
        bodyEl.innerHTML = "";
        bodyEl.appendChild(wrapper);

        // ✅ TOC 依相同順序產生
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

    // Inner links
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

    // Fade out TOC when scroll down inside modal
    bodyEl.addEventListener(
      "scroll",
      () => {
        const y = bodyEl.scrollTop || 0;
        modal.classList.toggle("is-body-scrolled", y > 56);
      },
      { passive: true }
    );

    // "目錄" button to bring back TOC temporarily
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

          const firstLink = tocEl ? tocEl.querySelector("a") : null;
          if (firstLink) {
            try {
              firstLink.focus({ preventScroll: true });
            } catch (_) {
              firstLink.focus();
            }
          }
        }
      });
      setTocToggleState();
    }

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
