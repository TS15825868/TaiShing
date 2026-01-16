/* ===========================
   TaiShing main.js
   - Mobile hamburger
   - Reveal animation
   - Product modal (long content with TOC/spec/FAQ)
   =========================== */

(function () {
  "use strict";

  /* ---------------------------
     Config
  --------------------------- */
  const LINE_URL = "https://lin.ee/sHZW7NkR";

  /* ---------------------------
     Helpers
  --------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------------------
     Hamburger nav (mobile)
  --------------------------- */
  function initHamburger() {
    const toggle = $(".nav-toggle");
    const nav = $(".site-nav");
    if (!toggle || !nav) return;

    // Ensure aria
    toggle.setAttribute("aria-expanded", "false");

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openNav = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      if (isOpen) closeNav();
      else openNav();
    });

    // Close when clicking a link (mobile)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      closeNav();
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (e.target.closest(".site-nav") || e.target.closest(".nav-toggle")) return;
      closeNav();
    });
  }

  /* ---------------------------
     Reveal animations
  --------------------------- */
  function initReveal() {
    const revealEls = $$(".reveal, .reveal-up");
    if (!revealEls.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------------------
     Product modal data (long content)
  --------------------------- */
  const PRODUCT_MAP = {
    guilu: {
      title: "仙加味 龜鹿膏",
      img: "images/guilu-main.jpg",
      sectionsHtml: `
        <div class="modal-toc" role="navigation" aria-label="內容快速跳轉">
          <a href="#m-spec">規格</a>
          <a href="#m-features">產品特色</a>
          <a href="#m-how">建議食用方式</a>
          <a href="#m-faq">FAQ</a>
          <a href="#m-note">注意事項</a>
        </div>

        <section id="m-spec" class="modal-sec">
          <h4>規格</h4>
          <div class="modal-table-wrap" role="region" aria-label="規格表">
            <table class="modal-table">
              <tr><th>品名</th><td>仙加味 龜鹿膏</td></tr>
              <tr><th>規格</th><td>100 ± 5 g／罐</td></tr>
              <tr><th>型態</th><td>濃縮膏體（適合固定在家每日取用）</td></tr>
              <tr><th>建議族群</th><td>想建立固定補養節奏、願意持續觀察一段時間的人</td></tr>
            </table>
          </div>
        </section>

        <section id="m-features" class="modal-sec">
          <h4>產品特色（以日常補養角度敘述）</h4>
          <ul class="modal-list">
            <li>濃縮膏體：每日取用方便，較容易建立固定節奏。</li>
            <li>適合「一罐作為觀察期」：先穩定再談調整。</li>
            <li>若晚上使用後影響入睡，建議改到白天／下午。</li>
          </ul>
        </section>

        <section id="m-how" class="modal-sec">
          <h4>建議食用方式（非醫療）</h4>
          <ul class="modal-list">
            <li>初次使用：建議「少量、固定、觀察」；先每日 1 次開始。</li>
            <li>食用方式：可直接入口，或用溫開水攪勻飲用。</li>
            <li>時間安排：以不影響睡眠為原則，選你最容易固定的時段。</li>
          </ul>
        </section>

        <section id="m-faq" class="modal-sec">
          <h4>FAQ（快速理解）</h4>
          <div class="modal-faq">
            <details>
              <summary>Q：要吃多久才算一個觀察期？</summary>
              <p>A：建議以「一罐」作為一個觀察期，重點是節奏穩定，再回頭看精神、睡眠、食慾等體感變化。</p>
            </details>
            <details>
              <summary>Q：可以跟龜鹿飲一起用嗎？</summary>
              <p>A：可以，但建議先確立一個主軸：例如龜鹿膏做日常固定、龜鹿飲做外出備用，避免一次全上不易觀察。</p>
            </details>
            <details>
              <summary>Q：一定要早上吃嗎？</summary>
              <p>A：不一定。若晚上補養後精神較好影響入睡，建議改白天／下午。</p>
            </details>
          </div>
        </section>

        <section id="m-note" class="modal-sec">
          <h4>注意事項</h4>
          <p class="modal-muted">
            本頁為日常補養選品參考，不涉及醫療診斷或治療。若你正在接受治療、長期服用處方藥、孕期／備孕或重大疾病史，建議先與專業醫師討論。
          </p>
        </section>
      `,
    },

    drink: {
      title: "仙加味 龜鹿飲",
      img: "images/guilu-drink.jpg",
      sectionsHtml: `
        <div class="modal-toc" role="navigation" aria-label="內容快速跳轉">
          <a href="#m-spec">規格</a>
          <a href="#m-features">適用情境</a>
          <a href="#m-how">飲用建議</a>
          <a href="#m-faq">FAQ</a>
          <a href="#m-note">注意事項</a>
        </div>

        <section id="m-spec" class="modal-sec">
          <h4>規格</h4>
          <div class="modal-table-wrap" role="region" aria-label="規格表">
            <table class="modal-table">
              <tr><th>品名</th><td>仙加味 龜鹿飲</td></tr>
              <tr><th>包裝</th><td>單包／10 包入袋（依實際版本）</td></tr>
              <tr><th>型態</th><td>飲品（外出方便）</td></tr>
              <tr><th>建議族群</th><td>工作節奏快、常在外奔波或出差的人</td></tr>
            </table>
          </div>
        </section>

        <section id="m-features" class="modal-sec">
          <h4>適用情境</h4>
          <ul class="modal-list">
            <li>出差／旅遊：行程變動也能維持補養節奏。</li>
            <li>忙碌日：不必額外熬煮，降低執行門檻。</li>
            <li>與龜鹿膏分工：在家用膏、外出用飲，更好維持一致性。</li>
          </ul>
        </section>

        <section id="m-how" class="modal-sec">
          <h4>飲用建議（非醫療）</h4>
          <ul class="modal-list">
            <li>初次使用：可先從每日 1 包為主，觀察體感再調整。</li>
            <li>保存：未開封避免高溫直射；開封後建議當日飲用完畢。</li>
            <li>想喝溫的：可隔水微溫加熱，不建議大火煮沸。</li>
          </ul>
        </section>

        <section id="m-faq" class="modal-sec">
          <h4>FAQ</h4>
          <div class="modal-faq">
            <details>
              <summary>Q：龜鹿飲和龜鹿膏差別？</summary>
              <p>A：主要差在使用情境：膏適合固定在家每日取用；飲適合外出攜帶與忙碌節奏。</p>
            </details>
            <details>
              <summary>Q：一天要喝幾包？</summary>
              <p>A：多數人先從每日 1 包開始，依作息與體感調整。</p>
            </details>
          </div>
        </section>

        <section id="m-note" class="modal-sec">
          <h4>注意事項</h4>
          <p class="modal-muted">
            若你正在接受治療、長期使用處方藥或有特殊狀況，建議先與醫師討論，再安排日常補養會更安心。
          </p>
        </section>
      `,
    },

    soup: {
      title: "仙加味 龜鹿湯塊",
      img: "images/guilu-soup-block.jpg",
      sectionsHtml: `
        <div class="modal-toc" role="navigation" aria-label="內容快速跳轉">
          <a href="#m-spec">規格</a>
          <a href="#m-use">使用方式</a>
          <a href="#m-ratio">比例建議</a>
          <a href="#m-faq">FAQ</a>
          <a href="#m-note">注意事項</a>
        </div>

        <section id="m-spec" class="modal-sec">
          <h4>規格</h4>
          <div class="modal-table-wrap" role="region" aria-label="規格表">
            <table class="modal-table">
              <tr><th>品名</th><td>仙加味 龜鹿湯塊</td></tr>
              <tr><th>規格</th><td>4 兩／半斤／1 斤（依實際版本）</td></tr>
              <tr><th>型態</th><td>入湯／沖泡</td></tr>
              <tr><th>建議族群</th><td>平常就煮湯、想用一鍋湯照顧全家的人</td></tr>
            </table>
          </div>
        </section>

        <section id="m-use" class="modal-sec">
          <h4>使用方式（非醫療）</h4>
          <ul class="modal-list">
            <li>沖泡：熱水沖泡成湯飲。</li>
            <li>入湯：雞湯、排骨湯、牛腱等料理一起熬煮作為湯底。</li>
          </ul>
        </section>

        <section id="m-ratio" class="modal-sec">
          <h4>比例建議（可從保守開始）</h4>
          <ul class="modal-list">
            <li>建議先從 1–2 塊／一鍋湯開始，試風味與濃度後再調整。</li>
            <li>家人共用：可用「同鍋共享」但頻率依家中狀況調整。</li>
          </ul>
        </section>

        <section id="m-faq" class="modal-sec">
          <h4>FAQ</h4>
          <div class="modal-faq">
            <details>
              <summary>Q：小盒/大盒配方有差嗎？</summary>
              <p>A：通常差在數量與容量；若你是同配方同塊大小，就依使用頻率選擇。</p>
            </details>
          </div>
        </section>

        <section id="m-note" class="modal-sec">
          <h4>注意事項</h4>
          <p class="modal-muted">
            若家中成員有孕期／備孕、治療中或特殊狀況，建議先與醫師討論再安排，較安心。
          </p>
        </section>
      `,
    },

    powder: {
      title: "仙加味 鹿茸粉",
      img: "images/product-lurong-powder.jpg",
      sectionsHtml: `
        <div class="modal-toc" role="navigation" aria-label="內容快速跳轉">
          <a href="#m-spec">規格</a>
          <a href="#m-how">使用方式</a>
          <a href="#m-faq">FAQ</a>
          <a href="#m-note">注意事項</a>
        </div>

        <section id="m-spec" class="modal-sec">
          <h4>規格</h4>
          <div class="modal-table-wrap" role="region" aria-label="規格表">
            <table class="modal-table">
              <tr><th>品名</th><td>仙加味 鹿茸粉</td></tr>
              <tr><th>規格</th><td>75 g／罐</td></tr>
              <tr><th>型態</th><td>粉末（可融入早餐/飲品/粥品）</td></tr>
            </table>
          </div>
        </section>

        <section id="m-how" class="modal-sec">
          <h4>使用方式（非醫療）</h4>
          <ul class="modal-list">
            <li>可直接入口或以溫水送服。</li>
            <li>可加入牛奶、豆漿、紅棗茶、早餐飲品或粥品。</li>
            <li>晚上使用若影響入睡，建議改白天/下午。</li>
          </ul>
        </section>

        <section id="m-faq" class="modal-sec">
          <h4>FAQ</h4>
          <div class="modal-faq">
            <details>
              <summary>Q：一天份量大概多少？</summary>
              <p>A：多數人先從每日 1 次、少量開始，依體感再調整。</p>
            </details>
          </div>
        </section>

        <section id="m-note" class="modal-sec">
          <h4>注意事項</h4>
          <p class="modal-muted">
            若你正在治療中或有固定處方藥，建議先與醫師討論再安排補養會更安全。
          </p>
        </section>
      `,
    },

    antler: {
      title: "鹿角原料",
      img: "images/antler-raw.jpg",
      sectionsHtml: `
        <div class="modal-toc" role="navigation" aria-label="內容快速跳轉">
          <a href="#m-spec">用途/服務</a>
          <a href="#m-process">建議提供資訊</a>
          <a href="#m-faq">FAQ</a>
          <a href="#m-note">提醒</a>
        </div>

        <section id="m-spec" class="modal-sec">
          <h4>用途 / 服務</h4>
          <div class="modal-table-wrap" role="region" aria-label="用途表">
            <table class="modal-table">
              <tr><th>適用對象</th><td>中藥房／中醫診所／餐飲品牌／家庭自煉</td></tr>
              <tr><th>可討論項目</th><td>等級、重量、切製方式、用途情境</td></tr>
              <tr><th>合作方式</th><td>依用量與處理方式報價（建議先溝通用途）</td></tr>
            </table>
          </div>
        </section>

        <section id="m-process" class="modal-sec">
          <h4>建議先提供的資訊（溝通會更快）</h4>
          <ul class="modal-list">
            <li>用途：做膏／做湯／餐飲料理／其他配方</li>
            <li>預估用量與希望的處理方式（切片/切段等）</li>
            <li>鍋具條件與配方習慣（若有）</li>
          </ul>
        </section>

        <section id="m-faq" class="modal-sec">
          <h4>FAQ</h4>
          <div class="modal-faq">
            <details>
              <summary>Q：價格怎麼計算？</summary>
              <p>A：通常依重量、等級、處理方式與數量報價。先提供用途與用量，會比較好給你合適方案。</p>
            </details>
            <details>
              <summary>Q：可客製切製方式嗎？</summary>
              <p>A：可以。用途講清楚，實際使用會更順利，也較好掌握成本。</p>
            </details>
          </div>
        </section>

        <section id="m-note" class="modal-sec">
          <h4>提醒</h4>
          <p class="modal-muted">
            本彈窗為「原料用途溝通」資訊整理，不涉及醫療診斷或治療；若為臨床使用情境，仍以醫師專業判斷為準。
          </p>
        </section>
      `,
    },
  };

  /* ---------------------------
     Modal DOM (create once)
  --------------------------- */
  let lastActiveEl = null;

  function ensureModal() {
    let modal = $("#productModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "productModal";
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal__backdrop" data-modal-close></div>
      <div class="modal__panel" role="document">
        <button class="modal__close" type="button" aria-label="關閉彈窗" data-modal-close>×</button>

        <div class="modal__head">
          <div class="modal__media">
            <img class="modal__img" src="" alt="">
          </div>
          <div class="modal__headtext">
            <h3 class="modal__title"></h3>
            <div class="modal__meta"></div>
          </div>
        </div>

        <div class="modal__content">
          <div class="modal__desc"></div>
          <div class="modal__actions">
            <a class="btn-line-strong modal__line" href="${LINE_URL}" target="_blank" rel="noopener">加入 LINE 諮詢</a>
            <button class="btn-soft modal__ok" type="button" data-modal-close>我知道了</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close handlers (backdrop/close/ok)
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.hasAttribute("data-modal-close")) closeModal();
    });

    // Prevent click-through
    const panel = $(".modal__panel", modal);
    if (panel) {
      panel.addEventListener("click", (e) => e.stopPropagation());
    }

    // ESC + focus trap basic
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();

      // Basic focus trap
      if (e.key === "Tab") {
        const focusables = $$(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]',
          modal
        ).filter((el) => el.offsetParent !== null);

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    return modal;
  }

  function closeModal() {
    const modal = $("#productModal");
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Restore focus
    if (lastActiveEl && typeof lastActiveEl.focus === "function") {
      lastActiveEl.focus();
    }
    lastActiveEl = null;
  }

  function openProductModal(key) {
    const data = PRODUCT_MAP[key];
    if (!data) return;

    const modal = ensureModal();
    const img = $(".modal__img", modal);
    const title = $(".modal__title", modal);
    const meta = $(".modal__meta", modal);
    const desc = $(".modal__desc", modal);
    const panel = $(".modal__panel", modal);
    const content = $(".modal__content", modal);

    img.src = data.img;
    img.alt = data.title;
    title.textContent = data.title;

    meta.innerHTML = "";
    desc.innerHTML = data.sectionsHtml || "";

    // Reset scroll
    if (panel) panel.scrollTop = 0;
    if (content) content.scrollTop = 0;

    lastActiveEl = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeBtn = $(".modal__close", modal);
    if (closeBtn) closeBtn.focus();
  }

  function initProductModal() {
    const triggers = $$(".js-product-modal");
    if (!triggers.length) return;

    triggers.forEach((a) => {
      a.addEventListener("click", (e) => {
        const key = a.getAttribute("data-product");
        if (!key) return;
        e.preventDefault();
        openProductModal(key);
      });
    });
  }

  /* ---------------------------
     Boot
  --------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initHamburger();
    initReveal();
    initProductModal();
  });
})();
