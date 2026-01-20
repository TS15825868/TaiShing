/* =====================================================
   台興山產・全站主控 JS（穩定版）
   - 漢堡只做開關，不動結構
   - 產品卡片 → fetch 產品頁 main 內容進 modal
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     漢堡選單（所有頁通用）
  =============================== */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  /* ===============================
     產品跳窗（Modal）
  =============================== */
  const modal = document.createElement("div");
  modal.className = "product-modal";
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <button class="modal-close" aria-label="關閉">×</button>
      <div class="modal-body">
        <p>載入中…</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalBody = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".modal-close");
  const backdrop = modal.querySelector(".modal-backdrop");

  function closeModal() {
    modal.classList.remove("is-open");
    modalBody.innerHTML = "<p>載入中…</p>";
  }

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* ===============================
     綁定所有產品卡
  =============================== */
  document.querySelectorAll(".js-product-modal").forEach(link => {
    link.addEventListener("click", async e => {
      e.preventDefault();

      const url = link.getAttribute("href");
      if (!url) return;

      modal.classList.add("is-open");

      try {
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const main = doc.querySelector("main");

        if (main) {
          modalBody.innerHTML = main.innerHTML;
        } else {
          modalBody.innerHTML = "<p>找不到產品內容</p>";
        }

      } catch (err) {
        modalBody.innerHTML = `
          <p>目前瀏覽器限制無法載入跳窗內容。</p>
          <p><a href="${url}">點此前往產品頁</a></p>
        `;
      }
    });
  });

});
