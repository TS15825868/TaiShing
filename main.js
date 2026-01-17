/* =========================================================
   TaiShing Site - main.js (FINAL FULL)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- layout helpers ---------- */
  function setMainPaddingTop() {
    const header = document.querySelector(".site-header");
    const main = document.querySelector(".site-main");
    if (!header || !main) return;
    main.style.paddingTop = `${header.offsetHeight + 18}px`;
  }

  function setupCompactHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("header--compact", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- reveal ---------- */
  function setupReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-up");
    if (!targets.length) return;

    const force = () => {
      const vh = window.innerHeight;
      targets.forEach(el => {
        if (el.getBoundingClientRect().top < vh * 0.95) {
          el.classList.add("is-visible");
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "80px" });

    targets.forEach(el => io.observe(el));
    force();
    window.addEventListener("load", force);
    setTimeout(force, 250);
  }

  /* ---------- unified nav ---------- */
  function setupUnifiedNav() {
    const ul = document.querySelector(".site-nav ul");
    if (!ul) return;

    const items = [
      ["index.html", "首頁"],
      ["index.html#all-products", "產品總覽"],
      ["guide.html", "依需求挑選"],
      ["doctor_tiktok.html", "中醫觀點"],
      ["about.html", "關於我們"],
      ["faq.html", "常見問題"],
      ["contact.html", "聯絡我們"]
    ];

    const path = location.pathname.split("/").pop() || "index.html";
    const hash = location.hash;

    ul.innerHTML = items.map(([href, label]) => {
      let active = "";
      if (
        (href === path) ||
        (href.includes("#") && path === "index.html" && hash === "#all-products")
      ) active = " nav-link--active";
      return `<li><a class="nav-link${active}" href="${href}">${label}</a></li>`;
    }).join("");
  }

  function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", e => {
      e.stopPropagation();
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
    });

    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
    });

    window.addEventListener("scroll", () => {
      if (window.innerWidth <= 768) close();
    }, { passive: true });
  }

  /* ---------- product modal ---------- */
  function setupProductModal() {
    const modal = ensureModal();
    const body = modal.querySelector(".modal-body");
    const toc = modal.querySelector(".modal-toc");
    const openPage = modal.querySelector(".modal-openpage");
    const closeBtn = modal.querySelector(".modal-close");

    let scrollY = 0;

    function openModal(trigger) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      modal.classList.add("is-open");
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }

    async function load(href, title) {
      body.innerHTML = "<p>載入中…</p>";
      openPage.href = href;

      const res = await fetch(href, { cache: "no-store" });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const main = doc.querySelector("main") || doc.body;

      const wrapper = document.createElement("div");
      wrapper.className = "modal-page";
      wrapper.innerHTML = main.innerHTML;

      wrapper.querySelectorAll(".site-header,.site-footer,.line-float,script").forEach(e => e.remove());
      wrapper.querySelectorAll(".reveal,.reveal-up").forEach(e => e.classList.add("is-visible"));

      body.innerHTML = "";
      body.appendChild(wrapper);

      buildTOC(wrapper);
      body.scrollTop = 0;
    }

    function buildTOC(container) {
      toc.classList.add("modal-toc--compact");
      toc.innerHTML = "";

      container.querySelectorAll("h2,h3").forEach(h => {
        if (!h.id) h.id = h.textContent.trim();
        const a = document.createElement("a");
        a.className = "modal-toc-link";
        a.textContent = h.textContent.trim();
        a.href = "#" + h.id;
        toc.appendChild(a);
      });
    }

    document.addEventListener("click", e => {
      const a = e.target.closest("a.js-product-modal");
      if (!a) return;
      e.preventDefault();
      load(a.getAttribute("href"), a.textContent.trim());
      openModal(a);
    });

    closeBtn.addEventListener("click", closeModal);
    modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

    body.addEventListener("scroll", () => {
      modal.classList.toggle("is-scrolled", body.scrollTop > 40);
    });
  }

  function ensureModal() {
    let el = document.getElementById("productModal");
    if (el) return el;

    el = document.createElement("div");
    el.id = "productModal";
    el.className = "modal";
    el.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-dialog">
        <div class="modal-head">
          <div class="modal-toc"></div>
          <div class="modal-head-right">
            <a class="modal-openpage" target="_blank">開啟完整頁</a>
            <button class="modal-close">×</button>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>`;
    document.body.appendChild(el);
    return el;
  }

  function init() {
    setMainPaddingTop();
    setupUnifiedNav();
    setupNavToggle();
    setupCompactHeader();
    setupReveal();
    setupProductModal();

    window.addEventListener("resize", setMainPaddingTop);
    window.addEventListener("load", setMainPaddingTop);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
