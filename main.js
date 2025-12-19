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

    // 返回上一頁按鈕點擊時，也一併收合選單
    var backLinks = document.querySelectorAll(".back-link");
    backLinks.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) {
          closeNav();
        }
        // 仍交由原本的 window.history.back() 處理導頁
      });
    });

    // 點擊選單區域以外時，自動收合三條線選單（桌機與手機皆適用）
    function handleOutsideClose(event) {
      if (!nav.classList.contains("is-open")) return;

      var clickInsideNav = nav.contains(event.target);
      var clickOnToggle = toggle.contains(event.target);

      if (!clickInsideNav && !clickOnToggle) {
        closeNav();
      }
    }

    document.addEventListener("click", handleOutsideClose);
    document.addEventListener("touchstart", handleOutsideClose, { passive: true });

    // 手機或桌機只要開始捲動畫面，也自動收合選單
    window.addEventListener("scroll", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      }
    }, { passive: true });
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

    // 返回上一頁按鈕點擊時，也一併收合選單
    var backLinks = document.querySelectorAll(".back-link");
    backLinks.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) {
          closeNav();
        }
        // 仍交由原本的 window.history.back() 處理導頁
      });
    });

    // 點擊選單區域以外時，自動收合三條線選單（桌機與手機皆適用）
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;

      var clickInsideNav = nav.contains(event.target);
      var clickOnToggle = toggle.contains(event.target);

      if (!clickInsideNav && !clickOnToggle) {
        closeNav();
      }
    });
  }

  function init() {
    setMainPaddingTop();
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
