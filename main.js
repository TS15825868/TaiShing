/* =========================================
   Main.js – 精品版穩定核心
   ========================================= */

/* Header 高度補 main（只算一次） */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");
  if (!header || !main) return;
  main.style.paddingTop = header.offsetHeight + "px";
}

/* Header scroll compact */
function handleHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add("header--compact");
  } else {
    header.classList.remove("header--compact");
  }
}

window.addEventListener("load", () => {
  adjustMainPadding();
  handleHeaderScroll();
});

window.addEventListener("resize", adjustMainPadding);
window.addEventListener("scroll", handleHeaderScroll);

/* 平滑捲動 */
document.documentElement.style.scrollBehavior = "smooth";
