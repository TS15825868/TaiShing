// main.js
// 台興山產・仙加味 主站通用腳本

document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupRevealOnScroll();
  setupBackLinks();
  setupSmoothAnchorScroll();
});

/**
 * 三條線選單切換（手機 & 小螢幕）
 * --------------------------------
 * .nav-toggle ＝ 右上角三條線按鈕
 * .site-nav   ＝ 導覽列 <nav>
 * .site-nav.is-open ⇒ 手機版展開
 */
function setupNavToggle() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!navToggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
  };

  // 點三條線 → 開／關選單
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    nav.classList.toggle("is-open");
  });

  // 點選單裡任一連結 → 自動關閉（避免停在展開狀態）
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // 點畫面其他地方 → 自動關閉
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  // 捲動畫面也順便收起（避免遮到內容）
  window.addEventListener(
    "scroll",
    () => {
      if (nav.classList.contains("is-open")) {
        closeNav();
      }
    },
    { passive: true }
  );
}

/**
 * 捲動顯示動畫（.reveal 元素）
 * ------------------------------
 * 進畫面才慢慢浮現
 */
function setupRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    // 舊瀏覽器：直接全部顯示
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

/**
 * 「← 返回上一頁」按鈕
 * --------------------
 * .back-link 會呼叫 history.back()
 * 並順便把手機選單收起
 */
function setupBackLinks() {
  const backButtons = document.querySelectorAll(".back-link");
  if (!backButtons.length) return;

  const nav = document.querySelector(".site-nav");

  backButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      // 先收選單
      if (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
      }
      // 再回上一頁
      window.history.back();
    });
  });
}

/**
 * 站內錨點平滑捲動（#all-products 等）
 * -----------------------------------
 */
function setupSmoothAnchorScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - headerHeight - 12;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
}
