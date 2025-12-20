(() => {
  const LINE_URL = "https://lin.ee/sHZW7NkR";
  const floatBtn = document.querySelector(".line-float-btn");
  const toast = document.querySelector(".line-toast");

  function setNightMode() {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const h = new Date().getHours();
    const isNightHours = (h >= 19 || h < 6);
    if (floatBtn) {
      floatBtn.classList.toggle("is-night", prefersDark || isNightHours);
    }
  }

  function setCompactMode() {
    if (!floatBtn) return;
    const footer = document.querySelector("footer");
    const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 140);
    let footerVisible = false;
    if (footer) {
      const r = footer.getBoundingClientRect();
      footerVisible = r.top < window.innerHeight && r.bottom > 0;
    }
    floatBtn.classList.toggle("is-compact", nearBottom || footerVisible);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-show"), 2400);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {}
    // fallback
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  }

  function onConsultClick(e) {
    const a = e.currentTarget;
    const product = a.getAttribute("data-product") || "此商品";
    const url = window.location.href;
    const payload = `商品：${product}\n頁面：${url}`;
    // Copy first (best effort), then open LINE
    copyText(payload).then((ok) => {
      showToast(ok ? `已複製「${product}」資訊，貼到 LINE 即可` : `請把「${product}」名稱貼到 LINE`);
      window.open(LINE_URL, "_blank", "noopener");
    });
    e.preventDefault();
  }

  function wireConsultButtons() {
    document.querySelectorAll(".line-consult-trigger").forEach((el) => {
      el.addEventListener("click", onConsultClick);
    });
  }

  // Floating button default behavior
  if (floatBtn) {
    floatBtn.addEventListener("click", (e) => {
      // Keep default open, but add a tiny UX nudge
      // (no preventDefault)
    });
  }

  wireConsultButtons();
  setNightMode();
  setCompactMode();

  window.addEventListener("scroll", () => {
    setCompactMode();
  }, { passive: true });

  window.addEventListener("resize", () => {
    setCompactMode();
  });

  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", setNightMode);
  }

  // refresh night mode hourly (simple + light)
  setInterval(setNightMode, 60 * 60 * 1000);
})();
