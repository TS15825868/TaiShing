/* ==========================================================
   main.js — 台興山產・仙加味 精品互動效果整合版
   ========================================================== */

/* Header padding: avoid content hidden behind fixed header */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");

  if (!header || !main) return;

  const headerHeight = header.offsetHeight;
  main.style.paddingTop = headerHeight + "px";
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);

/* Header scroll state */
function handleHeaderScrollClass() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("site-header--scrolled");
  } else {
    header.classList.remove("site-header--scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScrollClass);
window.addEventListener("load", handleHeaderScrollClass);

/* Scroll Reveal */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* Premium button press feedback */
function enhancePremiumButtons() {
  const buttons = document.querySelectorAll(".btn-premium");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "translateY(-2px)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "";
    });
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.96)";
      btn.style.boxShadow = "var(--shadow-button-pressed)";
    });
    btn.addEventListener("mouseup", () => {
      btn.style.transform = "translateY(-2px)";
      btn.style.boxShadow = "var(--shadow-button)";
    });
  });
}

window.addEventListener("load", enhancePremiumButtons);

/* Smooth scroll if supported */
if ("scrollBehavior" in document.documentElement.style) {
  document.documentElement.style.scrollBehavior = "smooth";
}

/* iOS 100vh fix */
function fixIOSHeight() {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

  window.addEventListener("resize", appHeight);
  appHeight();
}

fixIOSHeight();
