/* =========================================
   Main.js — 精品版 Header & Nav 互動
   ========================================= */

/* Header 高度補 main padding（防遮擋） */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");
  if (!header || !main) return;
  main.style.paddingTop = header.offsetHeight + "px";
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);

/* =========================================
   1️⃣ Header 滾動縮小
   ========================================= */

let lastScrollY = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("header--compact");
  } else {
    header.classList.remove("header--compact");
  }
});

/* =========================================
   2️⃣ Scroll Reveal
   ========================================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal, .reveal-up");
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  requestAnimationFrame(revealOnScroll);
});
window.addEventListener("load", revealOnScroll);

/* =========================================
   Button 微互動
   ========================================= */

document.addEventListener("click", (e) => {
  const btn = e.target.closest("a, button");
  if (!btn) return;

  btn.classList.add("btn-pressed");
  setTimeout(() => btn.classList.remove("btn-pressed"), 160);
});
