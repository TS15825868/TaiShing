/* =========================================================
   TaiShing Site - main.js (FINAL FULL VERSION)
   ========================================================= */
(function () {
  "use strict";

  /* ================= Header spacing ================= */
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

  /* ================= Reveal ================= */
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
    }, { threshold: 0.12 });

    targets.forEach(el => io.observe(el));
    force();
    window.addEventListener("load", force);
    setTimeout(force, 250);
  }

  /* ================= LINE Float ================= */
  function setupLineFloat() {
    const LINE_URL = "https://lin.ee/sHZW7NkR";
    let btn = document.querySelector(".line-float");

    if (!btn) {
      btn = document.createElement("a");
      btn.className = "line-float";
      btn.href = LINE_URL;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.innerHTML = `<img src="images/line-float-icon.png" alt="LINE">`;
      document.body.appendChild(btn);
    }
  }

  /* ================= Nav ================= */
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

    ul.innerHTML = items.map(([href, label]) =>
      `<li><a class="nav-link" href="${href}">${label}</a></li>`
    ).join("");
  }

  function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", e => {
      e.stopPropagation();
      nav.classList.toggle("is-open");
    });

    document.addEventListener("click", () => nav.classList.remove("is-open"));
  }

  /* ================= Product Modal ================= */
  function setupProductModalFromPages() {
    const modal = ensureModal();
    const body = modal.querySelector(".modal-body");
    const title = modal.querySelector(".modal-title");
    const toc = modal.querySelector(".modal-toc");
    const openPage = modal.querySelector(".modal-openpage");
    const closeBtn = modal.querySelector(".modal-close");

    let scrollY = 0;

    function lock() {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    }

    function unlock() {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }

    function open(trigger) {
      modal.classList.add("is-open");
      lock();
      closeBtn.focus();
    }

    function close() {
      modal.classList.remove("is-open");
      unlock();
    }

    function buildTOC(wrapper) {
      toc.innerHTML = "";
      wrapper.querySelectorAll("h2[id], h3[id]").forEach(h => {
        const a = document.createElement("a");
        a.className = "modal-toc-link";
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        toc.appendChild(a);
      });
    }

    body.addEventListener("scroll", () => {
      modal.classList.toggle("is-scrolled", body.scrollTop > 40);
    }, { passive: true });

    document.addEventListener("click", async e => {
      const a = e.target.closest("a.js-product-modal");
      if (!a) return;
      e.preventDefault();

      openPage.href = a.href;
      title.textContent = "載入中…";
      body.innerHTML = "";

      const html = await fetch(a.href).then(r => r.text());
      const doc = new DOMParser().parseFromString(html, "text/html");
      const main = doc.querySelector("main");

      main.querySelectorAll(".site-header,.site-footer,.line-float").forEach(el => el.remove());
      main.querySelectorAll(".reveal,.reveal-up").forEach(el => el.classList.add("is-visible"));

      body.appendChild(main);
      title.textContent = doc.title;
      buildTOC(main);
      open(a);
    });

    closeBtn.addEventListener("click", close);
    modal.querySelector(".modal-overlay").addEventListener("click", close);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
    });
  }

  function ensureModal() {
    let m = document.getElementById("productModal");
    if (m) return m;

    m = document.createElement("div");
    m.id = "productModal";
    m.className = "modal";
    m.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-dialog">
        <div class="modal-head">
          <div class="modal-title">產品介紹</div>
          <div class="modal-toc modal-toc--compact"></div>
          <div class="modal-actions">
            <a class="modal-openpage" target="_blank">開啟完整頁</a>
            <button class="modal-close">×</button>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>`;
    document.body.appendChild(m);
    return m;
  }

  /* ================= Init ================= */
  function init() {
    setMainPaddingTop();
    setupCompactHeader();
    setupReveal();
    setupLineFloat();
    setupUnifiedNav();
    setupNavToggle();
    setupProductModalFromPages();
    window.addEventListener("resize", setMainPaddingTop);
    window.addEventListener("load", setMainPaddingTop);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
