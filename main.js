/* =========================
   TaiShing - main.js
   - Mobile nav toggle
   - Product modal (no page change)
   ========================= */

(function () {
  "use strict";

  // -------------------------
  // 1) Mobile Nav Toggle
  // -------------------------
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    // Click outside to close (mobile)
    document.addEventListener("click", (e) => {
      if (!siteNav.classList.contains("is-open")) return;
      const clickedInside = siteNav.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside) {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  // -------------------------
  // 2) Reveal animation (optional)
  // -------------------------
  const revealEls = document.querySelectorAll(".reveal, .reveal-up");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add("is-visible");
            io.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // -------------------------
  // 3) Product Modal
  // -------------------------
  const PRODUCT_MAP = {
    guilu: {
      title: "仙加味 龜鹿膏",
      img: "images/guilu-main.jpg",
      meta: [
        "規格：100 ± 5 g／罐",
        "型態：濃縮膏體（適合固定在家每日取用）"
      ],
      desc: [
        "以「日常可持續」為出發點，適合想建立固定補養節奏、願意每天留一小段時間給自己的人。",
        "若你作息較不穩、或晚上使用後影響入睡，可改安排在白天或下午，重點是穩定與可持續。"
      ]
    },
    drink: {
      title: "仙加味 龜鹿飲",
      img: "images/guilu-drink.jpg",
      meta: [
        "包裝：單包／10 包入袋",
        "型態：飲品（外出、出差、忙碌節奏更方便）"
      ],
      desc: [
        "適合工作節奏快、常在外奔波或出差，希望「帶得走也帶得住節奏」的人。",
        "建議先從每日 1 包為主，依生活與體感再調整頻率。"
      ]
    },
    soup: {
      title: "仙加味 龜鹿湯塊",
      img: "images/guilu-soup-block.jpg",
      meta: [
        "規格：4 兩／半斤／1 斤（盒裝規格依你現行販售為準）",
        "型態：入湯／沖泡（適合家裡本來就會煮湯）"
      ],
      desc: [
        "一塊入鍋，適合用「一鍋湯」讓全家一起補養的家庭型態。",
        "建議先從 1–2 塊測試風味與濃度，再依鍋量與人數調整。"
      ]
    },
    powder: {
      title: "仙加味 鹿茸粉",
      img: "images/product-lurong-powder.jpg",
      meta: [
        "規格：75 g／罐",
        "型態：可融入早餐、飲品或簡單膳食"
      ],
      desc: [
        "適合習慣用早餐／飲品安排補養的人，讓補養自然融入日常。",
        "若晚上使用後精神較好、影響入睡，可改到白天或下午使用。"
      ]
    },
    antler: {
      title: "鹿角原料",
      img: "images/antler-raw.jpg",
      meta: [
        "用途：中藥房／中醫診所／餐飲品牌／家庭自煉",
        "可依用途討論等級、重量、切製方式"
      ],
      desc: [
        "提供專業用途的鹿角原料方案，可依配方、鍋具條件與使用情境協助評估。",
        "建議先告訴我們用途、預估用量與期望型態，再提供較合適的方案方向。"
      ]
    }
  };

  function ensureModal() {
    let modal = document.getElementById("productModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "productModal";
    modal.className = "modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="modal__backdrop" data-close="1"></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-label="產品介紹">
        <button class="modal__close" type="button" aria-label="關閉" data-close="1">✕</button>
        <div class="modal__body">
          <div class="modal__media">
            <img class="modal__img" src="" alt="">
          </div>
          <div class="modal__content">
            <div class="modal__kicker">PRODUCT</div>
            <h3 class="modal__title"></h3>
            <ul class="modal__meta"></ul>
            <div class="modal__desc"></div>

            <div class="modal__actions">
              <a class="btn-primary modal__line" href="https://lin.ee/sHZW7NkR" target="_blank" rel="noopener">LINE 詢問</a>
              <button class="btn-outline modal__ok" type="button" data-close="1">我知道了</button>
            </div>

            <p class="modal__note">
              本頁資訊為日常補養選品參考，不涉及醫療診斷或治療；如有治療中或特殊狀況，建議先與專業醫師討論。
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  let lastActiveEl = null;

  function openProductModal(key) {
    const data = PRODUCT_MAP[key];
    if (!data) return;

    const modal = ensureModal();
    const img = modal.querySelector(".modal__img");
    const title = modal.querySelector(".modal__title");
    const meta = modal.querySelector(".modal__meta");
    const desc = modal.querySelector(".modal__desc");

    img.src = data.img;
    img.alt = data.title;

    title.textContent = data.title;

    meta.innerHTML = "";
    (data.meta || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      meta.appendChild(li);
    });

    desc.innerHTML = "";
    (data.desc || []).forEach((p) => {
      const para = document.createElement("p");
      para.textContent = p;
      desc.appendChild(para);
    });

    lastActiveEl = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // focus close button
    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById("productModal");
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastActiveEl && typeof lastActiveEl.focus === "function") {
      lastActiveEl.focus();
    }
    lastActiveEl = null;
  }

  // Delegated click for modal triggers
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".js-product-modal");
    if (trigger) {
      const key = trigger.getAttribute("data-product");
      if (key) {
        e.preventDefault();
        openProductModal(key);
      }
      return;
    }

    const modal = document.getElementById("productModal");
    if (!modal) return;

    // Close actions
    const closeHit = e.target.closest("[data-close='1']");
    if (closeHit && modal.classList.contains("is-open")) {
      e.preventDefault();
      closeModal();
    }
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const modal = document.getElementById("productModal");
    if (modal && modal.classList.contains("is-open")) {
      e.preventDefault();
      closeModal();
    }
  });
})();
