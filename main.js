/* =========================================================
   太城網站 - main.js（最終版）
   - 頭部內邊距頂部自動修復
   - 滾動時保持緊湊的標題
   - 顯示動畫（✅ iOS/Safari首屏不再空白）
   - 浮動LINE按鈕助手（用.line-float，沒有才自動產生）
   - Mobile 漢堡選單：點外部或捲動自動收合
   ================================================================= */
（功能 （） {
  “使用嚴格模式”；

  function setMainPaddingTop() {
    const header = document.querySelector(".site-header");
    const main = document.querySelector("site-main");
    如果（!header || !main）則返回；
    const h = header.offsetHeight || 0;
    main.style.paddingTop = `${h + 18}px`;
  }

  function setupCompactHeader() {
    const header = document.querySelector(".site-header");
    如果 (!header) 返回；
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add("header--compact");
      否則 header.classList.remove("header--compact");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ✅ 修正：避免首屏元素先顯示，iOS/Safari IntersectionObserver 延遲導致空白
  函數 setupReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-up");
    如果 (!targets.length) 返回；

    function forceRevealAboveFold() {
      const vh = window.innerHeight || 0;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        如果 (r.top < vh * 0.95) el.classList.add("is-visible");
      });
    }

    如果 (!("IntersectionObserver" 在視窗中)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      返回;
    }

    const io = new IntersectionObserver(
      （條目）=>{
        entries.forEach((entry) => {
          如果 (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "80px 0px 80px 0px" }
    ）；

    targets.forEach((el) => io.observe(el));

    // 重新跑一次 + 載重後再補一次（更穩定）
    forceRevealAboveFold();
    window.addEventListener("load", forceRevealAboveFold);
    setTimeout(forceRevealAboveFold, 250);
  }

  // 使用現有的.line-float；沒有建立
  function setupLineFloat() {
    const LINE_URL = "https://lin.ee/sHZW7NkR";

    // 1.先找頁面上有沒有.line-float
    let btn = document.querySelector("line-float");

    // 2.如果沒有，就自動產生一顆 .line-float
    如果 (!btn) {
      btn = document.createElement("a");
      btn.href = LINE_URL;
      btn.className = "line-float";
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.setAttribute("aria-label", "透過LINE聯絡我們");

      const img = document.createElement("img");
      img.src = "images/line-float-icon.png";
      img.alt = "LINE";

      btn.appendChild(img);
      document.body.appendChild(btn);
    } 別的 {
      // 保險起見，確保屬性正確
      如果 (!btn.getAttribute("href")) btn.href = LINE_URL;
      如果 (!btn.getAttribute("target")) btn.target = "_blank";
      如果 (!btn.getAttribute("rel")) btn.rel = "noopener";
      if (!btn.getAttribute("aria-label")) {
        btn.setAttribute("aria-label", "透過LINE聯絡我們");
      }
    }

    // 3. toast 元件（如果不存在就建立一個）
    let toast = document.querySelector("line-toast");
    如果 (!toast) {
      toast = document.createElement("div");
      toast.className = "line-toast";
      toast.setAttribute("role", "status);
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    // 4.夜間模式類
    嘗試 {
      const h = new Date().getHours();
      如果 (h >= 19 || h <= 6) btn.classList.add("is-night");
    } 抓住 （_） {}

    // 5. 監控是否接近頁尾（縮小、內側用.is-compact）
    const footer = document.querySelector(".site-footer");
    const updateCompact = () => {
      如果 (!footer) 返回；
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const nearFooter = viewportBottom > footerTop - 120;
      btn.classList.toggle("is-compact", nearFooter);
    };

    updateCompact();
    window.addEventListener("scroll", updateCompact, { passive: true });
    window.addEventListener("resize", updateCompact);

    // 6. 點選時顯示提示文字
    btn.addEventListener("click", () => {
      如果 (!toast) 返回；
      toast.textContent = "正在前往 LINE 諮詢…";
      toast.classList.add("is-show");
      setTimeout(() => toast.classList.remove("is-show"), 1200);
    });
  }

  function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    如果 (!toggle || !nav) 返回；

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    // 預設狀態
    if (!toggle.hasAttribute("aria-expanded")) {
      toggle.setAttribute("aria-expanded", "false");
    }

    // 點漢堡：開 / 關
    toggle.addEventListener("click", function (e) {
      e.停止傳播();
      const next = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", next);
      toggle.classList.toggle("is-open", next);
      toggle.setAttribute("aria-expanded", next ? "true" : "false");
    });

    // 點選單項目後自動收合（含同屬性頁點）
    const links = nav.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        如果 (nav.classList.contains("is-open")) closeNav();
      });
    });

    // 點選「非 nav /非漢堡」的位置，自動收合
    document.addEventListener("click", function (e) {
      const clickInsideNav = nav.contains(e.target);
      const clickOnToggle = toggle.contains(e.target);
      如果 (!clickInsideNav && !clickOnToggle) 關閉導覽列();
    });

    // 手機版：開始捲動就自動收合
    window.addEventListener(
      “滾動”，
      功能 （） {
        如果 (window.innerWidth <= 768 && nav.classList.contains("is-open")) {
          關閉導航();
        }
      },
      { passive: true }
    ）；
  }

  // ------------------------------
  // ✅ 全站統一：漢堡選單順序 + 拿掉「LINE」項目
  // - 以JS產生選單，避免每頁HTML都要同步修改
  // - 仍保留各頁CTA /浮動LINE按鈕（不影響）
  // ------------------------------
  function setupUnifiedNav() {
    const navUl = document.querySelector(".site-nav ul");
    如果 (!navUl) 返回；

    // 你要的固定順序（全站一致）
    const items = [
      { href: "index.html", label: "首頁", key: "home" },
      { href: "index.html#all-products", label: "產品總覽", key: "產品" },
      { href: "guide.html", label: "依需求選擇", key: "guide" },
      { href: "doctor_tiktok.html", label: "中醫觀點", key: "tcm" },
      { href: "about.html", label: "關於我們", key: "關於" },
      { href: "faq.html", label: "常見問題", key: "faq" },
      { href: "contact.html", label: "聯絡我們", key: "contact" }
      // ❌ LINE：根據您的需求，從漢堡選單刪除
    ];

    const path = (window.location.pathname || "").split("/").pop() || "index.html";
    const hash = window.location.hash || "";

    function isActive(key) {
      如果 (key === "home") 回傳 path === "" || path === "index.html";
      如果 (key === "products") 回傳 (path === "" || path === "index.html") && hash === "#all-products";
      如果 (key === "guide") 回傳 path === "guide.html";
      如果 (key === "tcm") 回傳 path === "doctor_tiktok.html";
      如果 (key === "about") 回傳 path === "about.html";
      如果 (key === "faq") 回傳 path === "faq.html";
      如果 (key === "contact") 回傳 path === "contact.html";
      返回 false；
    }

    // 產生 HTML
    navUl.innerHTML = 項目
      .map((it) => {
        const active = isActive(it.key) ? " nav-link--active" : "";
        // 站內連結一律同分頁，不加target
        回傳 `<li><a href="${it.href}" class="nav-link${active}">${it.label}</a></li>`;
      })
      。加入（””）;
  }

  
  // ------------------------------
  // ✅ 產品「不換頁」彈跳窗：載入「詳細頁面」內容（不換頁）
  // - 觸發：.js-product-modal（連結href保留原始詳情頁，利於SEO/分享）
  // - 內容：抓取href頁面中的<main>（或.site-main）塞進彈窗
  // - 支援：Esc/背景/按鈕關閉、頁面內相關點在彈窗內捲動、快速跳轉目錄
  // ------------------------------
  函數 setupProductModalFromPages() {
    // ✅ 全站都要啟用「產品連結 -> 彈跳窗」的統一規則：
    // -即使某頁沒有.js-product-modal，也能攔截內容區域內指向產品詳情頁的鏈接
    // - 避免FAQ/故事頁等頁面因為沒有觸發類別而漏掉彈窗行為

    const modal = ensureProductModal();
    const overlay = modal.querySelector('.modal-overlay');
    const dialog = modal.querySelector('.modal-dialog');
    const titleEl = modal.querySelector('.modal-title');
    const tocEl = modal.querySelector('.modal-toc');
    const bodyEl = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');

    // 目錄中「先聊聊狀況」按鈕的 CTA 鏈接
    const LINE_URL = 'https://lin.ee/sHZW7NkR';

    let lastFocus = null; // 模態框關閉時要恢復焦點的元素
    let scrollY = 0;

    function focusRestore(el) {
      如果 (!el || !document.contains(el) || typeof el.focus !== 'function') 回傳;

      const isNaturallyFocusable = (
        el.matches('a[href], button, input, select, textarea, summary') ||
        el.hasAttribute('tabindex')
      ）；

      let madeTabbable = false;
      如果 (!isNaturallyFocusable) {
        el.setAttribute('tabindex', '-1');
        madeTabbable = true;
      }

      嘗試 {
        // 盡可能避免滾動跳躍
        el.focus({ preventScroll: true });
      } catch (e) {
        el.focus();
      }

      如果（已製作標籤頁）{
        // 保持 DOM 清理
        el.removeAttribute('tabindex');
      }
    }

    function lockScroll() {
      // 強大的滾動鎖定（尤其適用於 iOS/Safari）：將頁面凍結在當前滾動位置
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    }

    function unlockScroll() {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }

    function openModal(triggerEl) {
      // 優先選擇實際的點擊觸發事件（連結/卡片），而不是 document.activeElement。
      lastFocus = triggerEl || document.activeElement;
      modal.classList.remove('is-closing');
      modal.classList.remove('is-body-scrolled');
      lockScroll();
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      // 關閉焦點方便存取
      setTimeout(() => closeBtn && closeBtn.focus(), 0);
    }

    function closeModal() {
      如果 (!modal.classList.contains('is-open')) 回傳;
      如果 (modal.classList.contains('is-closing')) 回傳;

      // 淡出動畫
      modal.classList.add('is-closing');
      setTimeout(() => {
        modal.classList.remove('is-open');
        modal.classList.remove('is-closing');
        modal.classList.remove('is-body-scrolled');
        modal.setAttribute('aria-hidden', 'true');
        解鎖滾動條();

        // 將焦點恢復到觸發元素
        如果 (lastFocus) setTimeout(() => focusRestore(lastFocus), 0);
      }, 200);
    }

    函數 setLoading(titleText) {
      titleEl.textContent = titleText || '產品介紹'；
      tocEl.innerHTML = '';
      bodyEl.innerHTML = (
        '<div class="modal-loading">'
        + '<div class="modal-loading-bar"></div>'
        + '<div class="modal-loading-bar"></div>'
        + '<div class="modal-loading-bar"></div>'
        + '</div>'
      ）；
    }

    function buildToc(container) {
      const all = Array.from(container.querySelectorAll('h2[id], h3[id]'))
        .filter(h => (h.textContent || '').trim().length > 0);

      如果 (!all.length) {
        tocEl.innerHTML = '';
        返回;
      }

      // 喜歡一些實用的跳躍：規格 / 成分 / 吃法 / FAQ / 保存 / 注意
      const prefer = [
        { key: 'aud', re: /(適合|群|物件|誰適合|推薦物件)/ },
        { key: 'spec', re: /(規格|容量|重量|包裝|內容量)/ },
        { key: 'ing', re: /(成分|原料|配方|內容物)/ },
        { key: 'use', re: /(吃法|用法|用|怎麼吃|沖泡|料理)/ },
        { key: 'faq', re: /(常見問題|FAQ)/i },
        { key: 'keep', re: /(儲存|儲存|冷藏|保存方式)/ },
        { key: 'note', re: /(注意|提醒|不建議|不適合|禁止)/ },
        // 可選的類似 CTA 的標題；將轉換為 LINE 諮詢按鈕
        { key: 'chat', re: /(先聊聊狀況|再評估|評估是否適用|聊聊狀況)/ }
      ];

      const picked = [];
      const usedKeys = new Set();

      for (const h of all) {
        const t = (h.textContent || '').trim();
        for (const p of prefer) {
          如果 (usedKeys.has(p.key)) 繼續；
          如果 (p.re.test(t)) {
            pick.push(h);
            usedKeys.add(p.key);
            休息;
          }
        }
      }

      // 用前幾個標題填滿剩餘位置（保持整體順序）
      for (const h of all) {
        如果 (picked.includes(h)) 繼續；
        pick.push(h);
        如果 (picked.length >= 8) 則跳出循環；
      }

      const labelFor = (text) => {
        const t = (text || '').trim();
        if (/(先聊狀況|聊聊狀況|再評估|評估是否適用)/.test(t)) return '先聊狀況';
        if (/(適合|群體群體|物件|誰適合|推薦物件)/.test(t)) return '適合群體群體';
        if (/(吃法|用法|用|怎麼吃|沖泡|料理)/.test(t)) return '使用方式';
        if (/(常見問題|FAQ)/i.test(t)) return '常見問題';
        if (/(成分|原料|配方|內容物)/.test(t)) return '成分';
        if (/(規格|容量|重量|包裝|內容量)/.test(t)) return '規格';
        if (/(儲存|儲存|冷藏|儲存方式)/.test(t)) return '儲存';
        if (/(注意|提醒|不建議|不適合|禁忌)/.test(t)) return '注意';
        返回 t；
      };

      const frag = document.createDocumentFragment();
      picked.slice(0, 8).forEach(h => {
        const raw = (h.textContent || '').trim();
        const label = labelFor(raw);

        const a = document.createElement('a');
        a.className = 'modal-toc-link';

        // 將特定標題轉換為 LINE CTA 按鈕
        if (label === '先聊狀況') {
          a.classList.add('modal-toc-cta');
          a.href = LINE_URL;
          a.target = '_blank';
          a.rel = 'noopener';
        } 別的 {
          a.href = '#' + h.id;
        }

        a.textContent = 標籤;
        frag.appendChild(a);
      });

      tocEl.innerHTML = '';
      tocEl.appendChild(frag);
    }

    function scrollToAnchor(anchorId) {
      const target = bodyEl.querySelector('#' + CSS.escape(anchorId));
      如果 (!target) 返回；
      const top = target.getBoundingClientRect().top - bodyEl.getBoundingClientRect().top + bodyEl.scrollTop - 8;
      bodyEl.scrollTo({ top, behavior: 'smooth' });
    }

    // TOC 模式內快速跳轉（避免只改散列、不滾動）
    tocEl.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      如果（!link）返回；
      // CTA按鈕會開啟LINE；請勿攔截
      如果 (link.classList.contains('modal-toc-cta')) 回傳;
      const href = link.getAttribute('href') || '';
      如果 (!href.startsWith('#')) 回傳;
      e.preventDefault();
      scrollToAnchor(href.slice(1));
    });

    async function loadPageIntoModal(href, fallbackTitle) {
      設定載入(fallbackTitle);

      嘗試 {
        const res = await fetch(href, { cache: 'no-store' });
        如果 (!res.ok) 則拋出新的錯誤('獲取失敗：' + res.status);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // 標題
        const pageTitle = (doc.querySelector('title')?.textContent || '').trim();
        titleEl.textContent = 頁面標題 ||後備標題 || '產品介紹'；

        // 主要的
        const main = doc.querySelector('main') || doc.querySelector('.site-main') || doc.body;
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-page';
        wrapper.innerHTML = main.innerHTML;

        // 如有巢狀的浮動 LINE 按鈕或重複的包裝器，請移除。
        wrapper.querySelectorAll('.line-float, .site-header, .site-footer, script, noscript').forEach(el => el.remove());

        // ✅ 詳情頁大多數區塊使用 .reveal 動畫；在彈跳窗內沒有 IntersectionObserver 觸發，
        // 會導致「圖片/文字看不到」。在彈跳窗中直接強制顯示。
        wrapper.querySelectorAll('.reveal, .reveal-up').forEach(el => {
          el.classList.add('is-visible');
        });

        // ✅ 將詳情頁面內的「←回傳產品清單」在彈跳窗模式下修改為「關閉」並直接關閉彈窗
        wrapper.querySelectorAll('.back-link').forEach((a) => {
          a.textContent = '關閉';
          a.setAttribute('href', '#');
          a.setAttribute('role', 'button');
          a.classList.add('modal-close-link');
          a.addEventListener('click', (evt) => {
            evt.preventDefault();
            關閉模態框();
          });
        });

        // 確保標題存在 ID，以便目錄/錨點能夠可靠地工作。
        const used = new Set();
        const slugify = (text) => {
          const base = (text || '')
            .toString()
            。修剪（）
            .toLowerCase()
            // 保留中文/英文/數字，其他字元合併為“-”
            .replace(/[^\u4e00-\u9fff\w\s-]+/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          返回基底地址 || 'section'；
        };

        wrapper.querySelectorAll('h2, h3').forEach((h, idx) => {
          const rawId = (h.getAttribute('id') || '').trim();
          讓 id = rawId || slugify(h.textContent);
          // 保證唯一性
          令 n = 1；
          let candidate = id;
          while (used.has(candidate) || wrapper.querySelector('#' + CSS.escape(candidate))) {
            n += 1;
            候選人 = id + '-' + n;
          }
          id = 候選人；
          已使用.add(id);
          h.id = id;
        });

        // 注入
        bodyEl.innerHTML = '';
        bodyEl.appendChild(wrapper);
        建置目錄（包裝器）；

        // 如果 URL 中已經包含雜湊值，則捲動至該雜湊值。
        const hashIndex = href.indexOf('#');
        如果 (hashIndex > -1) {
          const anchorId = href.slice(hashIndex + 1);
          setTimeout(() => scrollToAnchor(anchorId), 60);
        } 別的 {
          bodyEl.scrollTop = 0;
        }
      } catch (err) {
        console.error(err);
        titleEl.textContent = FallbackTitle || '產品介紹'；
        tocEl.innerHTML = '';
        bodyEl.innerHTML = (
          '<div class="modal-error">'
          + '<p>目前無法載入產品內容。您可以修改用「開啟完整頁」檢視。 </p>'
          + '</div>'
        ）；
      }
    }

    // 觸發點擊（事件委託）
    // ✅ 全站「產品詳情頁」必要連結一律彈窗（但不動 header/nav/footer 的導頁）
    如果 (!document.documentElement.dataset.productModalDelegated) {
      document.documentElement.dataset.productModalDelegated = '1';

      // 點選頁面內容中的按鈕後，應以模態框形式開啟的產品詳情頁面
      const PRODUCT_DETAIL_PAGES = new Set([
        'guilu.html',
        'guilu-drink.html',
        'soup.html'，
        'antler.html'，
        'lurong.html'，
        'guilu-line.html'
      ]);

      const isInterceptCandidate = (a) => {
        如果 (!a) 返回 false；

        // 排除導航+頁尾（必要導頁行為不改）
        如果 (a.closest('.site-header, .site-nav, .site-footer')) 回傳 false;
        如果 (a.classList.contains('nav-link')) 回傳 false;

        const href = (a.getAttribute('href') || '').trim();
        如果 (!href) 返回 false；
        如果 (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) 回傳 false;
        如果 (href.startsWith('#')) 回傳 false; // 同一頁面的錨點保持不變

        // 規範化為檔案名稱（移除查詢/哈希值，以及開頭的 ./）
        const noQuery = href.split('?')[0];
        const noHash = noQuery.split('#')[0];
        const file = noHash.replace(/^\.\//, '').split('/').pop();

        返回 PRODUCT_DETAIL_PAGES.has(file);
      };

      document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        如果 (!a) 返回；

        // 允許按住 Cmd/Ctrl/Shift/Alt 鍵點擊以保持預設行為（新標籤頁/選擇）
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) 返回；

        // 1) 明確觸發器繼續運作
        如果 (a.classList.contains('js-product-modal')) {
          const href = a.getAttribute('href');
          如果 (!href) 返回；
          e.preventDefault();
          const title = a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent || '').trim() || '產品介紹';
          loadPageIntoModal(href, title);
          openModal(a);
          返回;
        }

        // 2) 內容中指向產品詳情頁面的任何內部連結 -> 模態框
        如果 (isInterceptCandidate(a)) {
          const href = a.getAttribute('href');
          e.preventDefault();
          const title = a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent || '').trim() || '產品介紹';
          loadPageIntoModal(href, title);
          openModal(a);
        }
      });
    }

    // 關閉處理程序
    如果 (overlay) overlay.addEventListener('click', closeModal);
    如果 (closeBtn) closeBtn.addEventListener('click', closeModal);

    // 停止對話框內的點擊冒泡
    if (dialog) dialog.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
      如果 (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    // 內部連結：對於哈希鏈接，請在模態框內捲動查看；外部連結會在新標籤頁中開啟。
    bodyEl.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      如果 (!a) 返回；
      const href = a.getAttribute('href') || '';

      如果 (href.startsWith('#')) {
        e.preventDefault();
        scrollToAnchor(href.slice(1));
        返回;
      }

      // 如果連結指向同一網站上的另一個產品/詳情頁面，則以模態視窗開啟。
      如果 (!href.startsWith('http') && (href.endsWith('.html') || href.includes('.html#'))) {
        e.preventDefault();
        loadPageIntoModal(href, a.textContent.trim() || '內容');
      }
    });

    // 當使用者在模態框內向下捲動時，淡出目錄（減少行動裝置上的頂部遮擋）
    bodyEl.addEventListener('scroll', () => {
      const y = bodyEl.scrollTop || 0;
      modal.classList.toggle('is-body-scrolled', y > 56);
    }, { passive: true });

    function ensureProductModal() {
      let existing = document.getElementById('productModal');
      如果（已存在）則返回已存在；

      const modalEl = document.createElement('div');
      modalEl.id = 'productModal';
      modalEl.className = 'modal';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.setAttribute('aria-hidden', 'true');

      modalEl.innerHTML = (
        '<div class="modal-overlay" aria-hidden="true"></div>'
        + '<div class="modal-dialog" role="document">'
          + '<div class="modal-head">'
            + '<div class="modal-head-left">'
              + '<div class="modal-title">產品介紹</div>'
              + '<div class="modal-toc" aria-label="快速跳轉"></div>'
            + '</div>'
            + '<div class="modal-head-right">'
              + '<button type="button" class="modal-close" aria-label="關閉">×</button>'
            + '</div>'
          + '</div>'
          + '<div class="modal-body" tabindex="0"></div>'
        + '</div>'
      ）；

      document.body.appendChild(modalEl);
      返回 modalEl；
    }
  }

function setupBackLinks() {
    const backButtons = document.querySelectorAll(".back-link");
    如果 (!backButtons.length) 返回；

    const nav = document.querySelector(".site-nav");

    function closeNav() {
      如果 (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
      }
    }

    backButtons.forEach((btn​​) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        關閉導航();
        window.location.href = "index.html#all-products";
      });
    });
  }

  function init() {
    setMainPaddingTop();
    setupBackLinks();
    setupUnifiedNav();
    setupNavToggle();
    setupCompactHeader();
    setupReveal();
    setupLineFloat();
    setupProductModalFromPages();

    window.addEventListener("resize", setMainPaddingTop);

    // ✅ 載入完成再補跑一次，避免首屏計算因字體/圖片造成偏差
    window.addEventListener("load", setMainPaddingTop);
    setTimeout(setMainPaddingTop, 250);
  }

  如果 (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } 別的 {
    初始化();
  }
})();
