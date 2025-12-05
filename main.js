/* ==========================================================
   main.js — 台興山產・仙加味 精品互動效果整合版
   ========================================================== */

/* ------------------------------------------
   01. Header 自動補上 padding-top
------------------------------------------- */
function adjustMainPadding() {
  const header = document.querySelector(".site-header");
  const main = document.querySelector(".site-main");

  if (!header || !main) return;

  const headerHeight = header.offsetHeight;
  main.style.paddingTop = headerHeight + "px";
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("resize", adjustMainPadding);


/* ------------------------------------------
   02. Header 捲動時變化（精品縮小 + 金色底線）
------------------------------------------- */
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


/* ------------------------------------------
   03. Scroll Reveal（進場動畫）
------------------------------------------- */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
      }
    });
  },
  {
    threshold: 0.15,        // 顯示區 15% 就觸發
    rootMargin: "0px 0px -20px 0px",
  }
);

// 套用 reveal 效果
document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


/* ------------------------------------------
   04. 精品按鈕按壓效果（微縮放 + 陰影）
------------------------------------------- */
function enhancePremiumButtons() {
  const buttons = document.querySelectorAll(".btn-premium");

  buttons.forEach((btn) => {
    // hover 時輕微浮起（CSS 已做，JS 補物理感）
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "translateY(-2px)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "translateY(0)";
    });

    // 按下的手感效果
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


/* ------------------------------------------
   05. 平滑捲動體驗（精品質感）
------------------------------------------- */
if ("scrollBehavior" in document.documentElement.style) {
  document.documentElement.style.scrollBehavior = "smooth";
}


/* ------------------------------------------
   06. 修正 iPhone 100vh 造成跳動問題
------------------------------------------- */
function fixIOSHeight() {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

  window.addEventListener("resize", appHeight);
  appHeight();
}

fixIOSHeight();
