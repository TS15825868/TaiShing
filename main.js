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
      <span class="line-float-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false" role="img">
          <path d="M19.6 10.8c0-3.8-3.8-6.8-8.5-6.8S2.6 7 2.6 10.8c0 3.4 3 6.2 7 6.7.3.1.7.2.8.5.1.2.1.6.1.8 0 0-.1.7-.1.9-.1.2-.2.9.8.5 1-.4 5.4-3.2 7.4-5.5 1.4-1.5 2-3 2-4.9z"></path>
        </svg>
      </span>
      <span class="line-float-text">LINE 諮詢</span>
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

  function init() {
    setMainPaddingTop();
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
