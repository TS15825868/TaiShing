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

    let lastScrollY = window.pageYOffset || window.scrollY || 0;

    function onScroll() {
      const currentY = window.pageYOffset || window.scrollY || 0;

      if (currentY > 40) {
        header.classList.add("is-compact");
      } else {
        header.classList.remove("is-compact");
      }

      lastScrollY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach((el) => observer.observe(el));
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
      toast.textContent = "正在前往 LINE 諮詢…";
      document.body.appendChild(toast);
    }

    btn.addEventListener("click", function () {
      toast.classList.add("is-visible");
      setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 2100);
    });

    document.body.appendChild(btn);

    function updatePosition() {
      const footer = document.querySelector(".site-footer");
      if (!footer) return;

      const btnRect = btn.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      const overlap = btnRect.bottom > footerRect.top;
      if (overlap) {
        btn.classList.add("is-compact");
      } else {
        btn.classList.remove("is-compact");
      }
    }

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    updatePosition();
  }

  function setupNavToggle() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!navToggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
    }

    navToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      nav.classList.toggle("is-open");
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        if (nav.classList.contains("is-open")) {
          closeNav();
        }
      }
    });

    var links = nav.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
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

        closeNav();

        if (sameOriginRef) {
          window.history.back();
        } else {
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
