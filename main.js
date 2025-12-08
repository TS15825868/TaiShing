/* =========================================
   Header 高度補正（唯一控制 padding-top）
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
   Apple 感 Header 縮高（安全版）
   ========================================= */

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const header = document.querySelector(".site-header");
      if (!header) return;

      if (window.scrollY > 60) {
        header.classList.add("header--compact");
      } else {
        header.classList.remove("header--compact");
      }

      ticking = false;
    });
    ticking = true;
  }
});
