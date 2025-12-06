/* =========================================
   main.js — C 文青精品風格互動核心
   ========================================= */

/* -----------------------------------------
   1. 動態調整 Main Padding（避免 header 遮住內容）
   ----------------------------------------- */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");
  if (!header || !main) return;

  const headerHeight = header.offsetHeight;
  main.style.paddingTop = headerHeight + "px";
}

// 初始與 resize 時更新
window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);


/* -----------------------------------------
   2. Scroll Reveal（精品淡入上滑效果）
   ----------------------------------------- */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal, .reveal-up");

  const triggerBottom = window.innerHeight * 0.88; 
  // 讓畫面更精品：稍微提前出現，不突兀

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

// 使用 scroll + load 監聽
window.addEventListener("scroll", () => {
  window.requestAnimationFrame(revealOnScroll);
});
window.addEventListener("load", revealOnScroll);


/* -----------------------------------------
   3. 平滑捲動（增強精品感）
   ----------------------------------------- */

document.documentElement.style.scrollBehavior = "smooth";


/* -----------------------------------------
   4. 按鈕點擊微互動（縮放效果）
   ----------------------------------------- */

document.addEventListener("click", (e) => {
  const btn = e.target.closest("a, button, .btn-outline-gold, .btn-line-strong");

  if (!btn) return;

  btn.classList.add("btn-pressed");

  setTimeout(() => {
    btn.classList.remove("btn-pressed");
  }, 180);
});


/* =========================================
   完成 — 全站互動核心已啟動
   ========================================= */
