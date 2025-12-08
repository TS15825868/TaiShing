/* =========================================
   Header 高度補正
   ========================================= */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");
  if (!header || !main) return;

  const h = header.offsetHeight;
  main.style.paddingTop = h + 12 + "px";
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);

/* =========================================
   滾動縮 header（Apple 感）
   ========================================= */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (window.scrollY > 60) {
    header.classList.add("header--compact");
  } else {
    header.classList.remove("header--compact");
  }
});
