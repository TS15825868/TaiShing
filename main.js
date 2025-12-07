/* =========================================
   main.js — C 文青精品風格互動核心
   ========================================= */

/* 1. 動態調整 Main Padding（避免 fixed header 遮住內容） */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");
  if (!header || !main) return;

  const headerHeight = header.offsetHeight;
  main.style.paddingTop = headerHeight + "px";
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);

/* 2. Scroll Reveal（淡入上滑動畫） */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal, .reveal-up");
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(revealOnScroll);
});
window.addEventListener("load", revealOnScroll);

/* 3. 平滑捲動（全站） */
document.documentElement.style.scrollBehavior = "smooth";

/* 4. 按鈕點擊微互動（精品回饋感） */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(
    "a, button, .btn-outline-gold, .btn-line-strong, .btn-primary, .btn-primary-light, .btn-soft"
  );
  if (!btn) return;

  btn.classList.add("btn-pressed");

  setTimeout(() => {
    btn.classList.remove("btn-pressed");
  }, 180);
});
