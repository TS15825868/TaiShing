/* =========================================================
   TaiShing Site - main.js (Final)
   - Header padding-top auto fix
   - Compact header on scroll
   - Reveal animations
   - Auto inject Floating LINE button (All pages)
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

  function setupReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-up");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-visible"));
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
      { threshold: 0.12 }
    );

    targets.forEach(el => io.observe(el));
  }

  function injectLineFloat() {
    const LINE_URL = "https://lin.ee/sHZW7NkR";
    if (document.querySelector(".line-float-btn")) return;

    const btn = document.createElement("a");
    btn.href = LINE_URL;
    btn.className = "line-float-btn";
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.setAttribute("aria-label", "LINE 諮詢");
    btn.innerHTML = `
   <img src="images/line-float-icon.png" alt="LINE" class="line-float-img">
    `;

    let toast = document.querySelector(".line-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "line-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    document.body.appendChild(btn);

    try {
      const h = new Date().getHours();
      if (h >= 19 || h <= 6) btn.classList.add("is-night");
    } catch (_) {}

    const footer = document.querySelector(".site-footer");
    const updateCompact = () => {
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const nearFooter = viewportBottom > (footerTop - 120);
      btn.classList.toggle("is-compact", nearFooter);
    };

    updateCompact();
    window.addEventListener("scroll", updateCompact, { passive: true });
    window.addEventListener("resize", updateCompact);

    btn.addEventListener("click", () => {
      if (!toast) return;
      toast.textContent = "正在前往 LINE 諮詢…";
      toast.classList.add("is-show");
      setTimeout(() => toast.classList.remove("is-show"), 1200);
    });
  }


  function setupNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
    }

    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });

    var links = nav.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        // 點選選單項目後自動收合（含同頁錨點）
        if (nav.classList.contains("is-open")) {
          closeNav();
        }
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

        const sameOriginRef =
          document.referrer && document.referrer.startsWith(window.location.origin);

        // 先把手機選單收起
        closeNav();

        if (sameOriginRef) {
          // 有上一頁而且在同一個網站 → 回上一頁
          window.history.back();
        } else {
          // 沒有上一頁或從外部進來 → 統一回首頁產品區
          window.location.href = "index.html#all-products";
        }
      });
    });
  }

  function init() {
    setMainPaddingTop();
    setupBackLinks();
    setupNavToggle();
    setupCompactHeader();
    setupReveal();
    injectLineFloat();
    window.addEventListener("resize", setMainPaddingTop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
