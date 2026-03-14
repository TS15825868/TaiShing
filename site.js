/* =========================
   漢堡選單
========================= */

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;

  menu.classList.toggle("active");
}


/* 點擊背景關閉 */

document.addEventListener("click", function (e) {

  const menu = document.getElementById("menu");
  const menuBtn = document.querySelector(".menu-btn");

  if (!menu) return;

  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    menu.classList.remove("active");
  }

});


/* 點選選單連結關閉 */

document.querySelectorAll(".menu-overlay a").forEach(link => {

  link.addEventListener("click", function () {

    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.remove("active");

  });

});


/* ESC 關閉選單 */

document.addEventListener("keydown", function (e) {

  const menu = document.getElementById("menu");
  if (!menu) return;

  if (e.key === "Escape") {
    menu.classList.remove("active");
  }

});



/* =========================
   Scroll Reveal
========================= */

function revealElements() {

  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const windowHeight = window.innerHeight;

  reveals.forEach(el => {

    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("show");
    }

  });

}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);
window.addEventListener("resize", revealElements);



/* =========================
   Header 滾動效果
========================= */

const header = document.querySelector(".header");

if (header) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

      header.style.background = "rgba(255,255,255,.9)";

    } else {

      header.style.background = "rgba(255,255,255,.75)";

    }

  });

}



/* =========================
   圖片 fallback
========================= */

document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", function () {

    if (this.dataset.fallbackApplied) return;

    this.dataset.fallbackApplied = true;

    this.src = "images/logo-seal.png";

    this.classList.add("img-placeholder");

  });

});
