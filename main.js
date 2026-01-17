/* =========================================================
   TaiShing Site - main.js (Final)
   - Modal content: section-level reorder (prevents empty boxes)
   - TOC order: 容量/規格 -> 成份 -> 適用對象/族群 -> 建議使用方式(使用方向) -> 保存方式 -> 合作方式與報價 -> 常見問題 -> 先聊聊狀況
   - Skip empty sections (both TOC and body)
   - Robust fetch URL + file:// fallback
   - FIX: modal footer close button exists (.modal-foot/.modal-close-bottom)
   - FIX: remove "開啟完整頁" button in error UI
   ========================================================= */
(function(){
  "use strict";

  const LINE_URL = "https://lin.ee/sHZW7NkR";

  const SECTION_ORDER = [
    { key:"spec",       label:"容量／規格",                 match:/(容量|規格|重量|包裝|內容量|ml|cc|g|公克|斤|兩|盒|罐|包|份)/ },
    { key:"ingredient", label:"成份",                       match:/(成份|成分|原料|配方|內容物|藥材|漢方)/ },
    { key:"audience",   label:"適用對象／族群",             match:/(適用對象|適合族群|誰適合|推薦對象|適合對象|對象|族群)/ },
    { key:"usage",      label:"建議使用方式（使用方向）",   match:/(建議使用方式|使用方式|使用方向|吃法|用法|怎麼吃|沖泡|料理|大略說明)/ },
    { key:"storage",    label:"保存方式",                   match:/(保存方式|保存|存放|冷藏|常溫|賞味|有效期限)/ },
    { key:"cooperate",  label:"合作方式與報價",             match:/(合作方式|報價|合作|經銷|批發|零售|MOQ|出貨|運費|付款|條件|價格|詢價)/ },
    { key:"faq",        label:"常見問題",                   match:/(常見問題|FAQ|Q&A)/i },
    { key:"consult",    label:"先聊聊狀況",                 match:/(先聊聊狀況|聊聊狀況|再評估|評估是否適用|諮詢)/ }
  ];

  function setMainPaddingTop(){
    const header=document.querySelector('.site-header');
    const main=document.querySelector('.site-main');
    if(!header||!main) return;
    main.style.paddingTop = `${(header.offsetHeight||0)+18}px`;
  }

  function setupCompactHeader(){
    const header=document.querySelector('.site-header');
    if(!header) return;
    const onScroll=()=>header.classList.toggle('header--compact', window.scrollY>24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  function setupReveal(){
    const targets=document.querySelectorAll('.reveal,.reveal-up');
    if(!targets.length) return;
    const force=()=>{
      const vh=window.innerHeight||0;
      targets.forEach(el=>{ const r=el.getBoundingClientRect(); if(r.top<vh*0.95) el.classList.add('is-visible');});
    };
    if(!('IntersectionObserver' in window)){
      targets.forEach(el=>el.classList.add('is-visible'));
      return;
    }
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target);} });
    },{threshold:.12,rootMargin:'80px 0px 80px 0px'});
    targets.forEach(el=>io.observe(el));
    force();
    window.addEventListener('load', force);
    setTimeout(force,250);
  }

  function setupNavToggle(){
    const toggle=document.querySelector('.nav-toggle');
    const nav=document.querySelector('.site-nav');
    if(!toggle||!nav) return;

    const close=()=>{
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    };

    if(!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded','false');

    toggle.addEventListener('click',(e)=>{
      e.stopPropagation();
      const next=!nav.classList.contains('is-open');
      nav.classList.toggle('is-open',next);
      toggle.classList.toggle('is-open',next);
      toggle.setAttribute('aria-expanded',next?'true':'false');
    });

    document.addEventListener('click',(e)=>{
      if(!nav.contains(e.target) && !toggle.contains(e.target)) close();
    });

    window.addEventListener('scroll',()=>{
      if(window.innerWidth<=768 && nav.classList.contains('is-open')) close();
    },{passive:true});
  }

  // ------------------------------
  // ✅ 全站統一：漢堡選單順序（移除 LINE 項目）
  // - 由 JS 生成導覽列，避免每頁 HTML 都要同步修改
  // - 若頁面刻意沒有 nav（例如 dm.html），會自動略過
  // ------------------------------
  function setupUnifiedNav(){
    const navUl = document.querySelector('.site-nav ul');
    if(!navUl) return;

    const items = [
      { href: 'index.html',            label: '首頁',       key: 'home' },
      { href: 'index.html#all-products', label: '產品總覽', key: 'products' },
      { href: 'guide.html',            label: '依需求挑選', key: 'guide' },
      { href: 'faq.html',              label: '常見問題',   key: 'faq' },
      { href: 'tcm.html',              label: '中醫觀點',   key: 'tcm' },
      // 你目前 story.html 是品牌故事頁，但你想要顯示「關於我們」也可以
      // 若你另有 about.html，請把 href 改成 about.html
      { href: 'story.html',            label: '關於我們',   key: 'about' },
      { href: 'contact.html',          label: '聯絡我們',   key: 'contact' },
    ];

    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    navUl.innerHTML = items.map(it => {
      const isActive = (it.href.split('#')[0].toLowerCase() === path) || (path === '' && it.href.startsWith('index.html'));
      const cls = 'nav-link' + (isActive ? ' nav-link--active' : '');
      return `<li><a class="${cls}" href="${it.href}">${it.label}</a></li>`;
    }).join('');
  }

  function setupLineFloat(){
    let btn=document.querySelector('.line-float');
    if(!btn){
      btn=document.createElement('a');
      btn.href=LINE_URL;
      btn.className='line-float';
      btn.target='_blank';
      btn.rel='noopener';
      btn.setAttribute('aria-label','透過 LINE 聯絡我們');
      const img=document.createElement('img');
      img.src='images/line-float-icon.png';
      img.alt='LINE';
      btn.appendChild(img);
      document.body.appendChild(btn);
    }
  }

  function ensureProductModal(){
    let modal=document.getElementById('productModal');
    if(modal) return modal;

    modal=document.createElement('div');
    modal.id='productModal';
    modal.className='modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-hidden','true');

    // ✅ FIX：加入 modal-foot + 底部關閉按鈕
    modal.innerHTML =
      '<div class="modal-overlay" aria-hidden="true"></div>'+
      '<div class="modal-dialog" role="document">'+
        '<div class="modal-head">'+
          '<div class="modal-head-left">'+
            '<div class="modal-title">產品介紹</div>'+
            '<div class="modal-toc" aria-label="快速跳轉"></div>'+
          '</div>'+
          '<div class="modal-head-right">'+
            '<button type="button" class="modal-toc-toggle" aria-label="顯示目錄" aria-pressed="false">目錄</button>'+
            '<button type="button" class="modal-close" aria-label="關閉">×</button>'+
          '</div>'+
        '</div>'+
        '<div class="modal-body" tabindex="0"></div>'+
        '<div class="modal-foot">'+
          '<button type="button" class="modal-close-bottom" aria-label="關閉">關閉</button>'+
        '</div>'+
      '</div>';

    document.body.appendChild(modal);
    return modal;
  }

  function lockScroll(state){
    if(state){
      const y=window.scrollY||0;
      document.documentElement.dataset.modalScrollY=String(y);
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.body.style.position='fixed';
      document.body.style.top=`-${y}px`;
      document.body.style.left='0';
      document.body.style.right='0';
      document.body.style.width='100%';
    }else{
      const y=parseInt(document.documentElement.dataset.modalScrollY||'0',10)||0;
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.position='';
      document.body.style.top='';
      document.body.style.left='';
      document.body.style.right='';
      document.body.style.width='';
      window.scrollTo(0,y);
    }
  }

  function normalizeUrl(href){
    try{ return new URL(href, window.location.href).toString(); }catch(_){ return href; }
  }
  function isFileProtocol(){
    try{ return window.location.protocol === 'file:'; }catch(_){ return false; }
  }

  function getSectionKeyFromText(text){
    const t=(text||'').trim();
    for(const s of SECTION_ORDER){ if(s.match.test(t)) return s.key; }
    return null;
  }

  function sectionHasMeaningfulContent(section){
    if(!section) return false;
    const clone=section.cloneNode(true);
    clone.querySelectorAll('h1,h2,h3').forEach(h=>h.remove());
    const txt=(clone.textContent||'').replace(/\s+/g,'').trim();
    const hasMedia=!!clone.querySelector('img,ul,ol,table,button,a');
    return hasMedia || txt.length>0;
  }

  function reorderSections(wrapper){
    const sections=Array.from(wrapper.querySelectorAll('section.section'));
    if(!sections.length) return;

    const hero=sections[0];
    const keyed=new Map();
    SECTION_ORDER.forEach(s=>keyed.set(s.key,[]));
    const others=[];

    sections.forEach((sec,idx)=>{
      if(idx===0) return;
      const h=sec.querySelector('h2,h3');
      const key=getSectionKeyFromText(h?h.textContent:'');
      if(key && keyed.has(key)) keyed.get(key).push(sec);
      else others.push(sec);
    });

    sections.forEach(sec=>sec.remove());

    const frag=document.createDocumentFragment();
    frag.appendChild(hero);

    SECTION_ORDER.forEach(s=>{
      const list=keyed.get(s.key)||[];
      list.forEach(sec=>{ if(sectionHasMeaningfulContent(sec)) frag.appendChild(sec); });
    });

    others.forEach(sec=>{ if(sectionHasMeaningfulContent(sec)) frag.appendChild(sec); });

    wrapper.appendChild(frag);
  }

  function buildToc(modal, wrapper){
    const toc=modal.querySelector('.modal-toc');
    if(!toc) return;
    toc.innerHTML='';

    const used=new Set();
    const slugify=(text)=>{
      const base=(text||'').toString().trim().toLowerCase()
        .replace(/[^一-鿿\w\s-]+/g,'')
        .replace(/\s+/g,'-')
        .replace(/-+/g,'-')
        .replace(/^-|-$/g,'');
      return base||'section';
    };

    wrapper.querySelectorAll('h2,h3').forEach(h=>{
      const raw=(h.getAttribute('id')||'').trim();
      let id=raw||slugify(h.textContent);
      let n=1; let cand=id;
      while(used.has(cand) || wrapper.querySelector('#'+CSS.escape(cand))){
        n+=1; cand=id+'-'+n;
      }
      id=cand; used.add(id); h.id=id;
    });

    const firstByKey={};
    SECTION_ORDER.forEach(s=>firstByKey[s.key]=null);

    const sections=Array.from(wrapper.querySelectorAll('section.section'));
    sections.forEach((sec,idx)=>{
      if(idx===0) return;
      const h=sec.querySelector('h2,h3');
      const key=getSectionKeyFromText(h?h.textContent:'');
      if(key && !firstByKey[key] && sectionHasMeaningfulContent(sec)) firstByKey[key]=h;
    });

    SECTION_ORDER.forEach(s=>{
      const h=firstByKey[s.key];
      if(!h) return;
      const a=document.createElement('a');

      if(s.key==='consult'){
        a.className='modal-toc-link modal-toc-cta';
        a.href=LINE_URL;
        a.target='_blank';
        a.rel='noopener';
        a.textContent=s.label;
      }else{
        a.className='modal-toc-link';
        a.href='#'+h.id;
        a.textContent=s.label;
      }

      toc.appendChild(a);
    });
  }

  function setupProductModal(){
    const modal=ensureProductModal();
    const overlay=modal.querySelector('.modal-overlay');
    const dialog=modal.querySelector('.modal-dialog');
    const titleEl=modal.querySelector('.modal-title');
    const tocEl=modal.querySelector('.modal-toc');
    const bodyEl=modal.querySelector('.modal-body');
    const closeBtn=modal.querySelector('.modal-close');
    const closeBottomBtn=modal.querySelector('.modal-close-bottom');
    const tocToggle=modal.querySelector('.modal-toc-toggle');

    let lastFocus=null;

    function openModal(trigger){
      lastFocus=trigger||document.activeElement;
      modal.classList.remove('is-closing','is-body-scrolled','is-toc-peek');
      lockScroll(true);
      modal.setAttribute('aria-hidden','false');
      modal.classList.add('is-open');
      setTimeout(()=>{ if(closeBtn) closeBtn.focus(); },0);
    }

    function closeModal(){
      if(!modal.classList.contains('is-open') || modal.classList.contains('is-closing')) return;
      modal.classList.add('is-closing');
      setTimeout(()=>{
        modal.classList.remove('is-open','is-closing','is-body-scrolled','is-toc-peek');
        modal.setAttribute('aria-hidden','true');
        lockScroll(false);
        if(lastFocus && document.contains(lastFocus)){
          try{ lastFocus.focus({preventScroll:true}); }catch(_){ lastFocus.focus(); }
        }
      },200);
    }

    function setLoading(title){
      titleEl.textContent=title||'產品介紹';
      tocEl.innerHTML='';
      bodyEl.innerHTML =
        '<div class="section" style="margin:0;">'+
          '<h2 class="section-title">載入中…</h2>'+
          '<p>正在載入產品內容，請稍候。</p>'+
        '</div>';
    }

    function showFetchError(){
      titleEl.textContent=titleEl.textContent||'產品介紹';
      tocEl.innerHTML='';
      bodyEl.innerHTML =
        '<div class="section" style="margin:0;">'+
          '<h2 class="section-title">目前無法載入產品內容</h2>'+
          '<p>若你是用「直接打開檔案（file://）」預覽，瀏覽器會阻擋跨檔案讀取，因此跳窗會失效。</p>'+
          '<ul>'+
            '<li>請改用 GitHub Pages（或任何網站環境）再測試</li>'+
            '<li>或用本機開啟簡易伺服器（如 VSCode Live Server）</li>'+
          '</ul>'+
        '</div>';
    }

    function scrollToAnchor(id){
      const target=bodyEl.querySelector('#'+CSS.escape(id));
      if(!target) return;
      const top=target.getBoundingClientRect().top - bodyEl.getBoundingClientRect().top + bodyEl.scrollTop - 8;
      bodyEl.scrollTo({top, behavior:'smooth'});
    }

    tocEl.addEventListener('click',(e)=>{
      const a=e.target.closest('a');
      if(!a) return;
      if(a.classList.contains('modal-toc-cta')) return;
      const href=a.getAttribute('href')||'';
      if(!href.startsWith('#')) return;
      e.preventDefault();
      scrollToAnchor(href.slice(1));
    });

    bodyEl.addEventListener('scroll',()=>{
      modal.classList.toggle('is-body-scrolled', (bodyEl.scrollTop||0)>56);
      if(modal.classList.contains('is-toc-peek')){
        modal.classList.remove('is-toc-peek');
        setTocToggleState(false);
      }
    },{passive:true});

    function setTocToggleState(peek){
      if(!tocToggle) return;
      tocToggle.setAttribute('aria-pressed', peek?'true':'false');
      tocToggle.setAttribute('aria-label', peek?'收起目錄':'顯示目錄');
      tocToggle.textContent = peek ? '收起' : '目錄';
    }

    let peekTimer=null;
    if(tocToggle){
      tocToggle.addEventListener('click',(e)=>{
        e.preventDefault();e.stopPropagation();
        const next=!modal.classList.contains('is-toc-peek');
        modal.classList.toggle('is-toc-peek',next);
        setTocToggleState(next);
        if(peekTimer) clearTimeout(peekTimer);
        if(next){
          peekTimer=setTimeout(()=>{ modal.classList.remove('is-toc-peek'); setTocToggleState(false); },6000);
        }
      });
      setTocToggleState(false);
    }

    async function loadPage(href,fallbackTitle){
      const resolved=normalizeUrl(href);
      setLoading(fallbackTitle);

      if(isFileProtocol()){
        showFetchError();
        return;
      }

      try{
        const res=await fetch(resolved, { cache:'reload' });
        if(!res.ok) throw new Error('Fetch failed: '+res.status);
        const html=await res.text();
        const doc=new DOMParser().parseFromString(html,'text/html');

        const pageTitle=(doc.querySelector('title')?.textContent||'').trim();
        titleEl.textContent=pageTitle||fallbackTitle||'產品介紹';

        const main=doc.querySelector('main') || doc.querySelector('.site-main') || doc.body;
        const wrapper=document.createElement('div');
        wrapper.className='modal-page';
        wrapper.innerHTML=main.innerHTML;

        wrapper.querySelectorAll('.line-float,.site-header,.site-footer,script,noscript').forEach(el=>el.remove());
        wrapper.querySelectorAll('.reveal,.reveal-up').forEach(el=>el.classList.add('is-visible'));

        // 避免頁面內「返回」類 UI 干擾跳窗
        wrapper.querySelectorAll('.back-to-products, .back-link').forEach(el=>el.remove());

        reorderSections(wrapper);
        buildToc(modal, wrapper);

        bodyEl.innerHTML='';
        bodyEl.appendChild(wrapper);
        bodyEl.scrollTop=0;
      }catch(err){
        console.error(err);
        showFetchError();
      }
    }

    const PRODUCT_DETAIL_PAGES=new Set([
      'guilu.html','guilu-drink.html','soup.html','lurong.html','antler.html','dm.html','guilu-line.html'
    ]);

    function isInterceptCandidate(a){
      if(!a) return false;
      if(a.closest('.site-header,.site-nav,.site-footer')) return false;
      if(a.classList.contains('nav-link')) return false;

      const href=(a.getAttribute('href')||'').trim();
      if(!href) return false;
      if(href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')) return false;
      if(href.startsWith('#')) return false;

      const noQuery=href.split('?')[0];
      const noHash=noQuery.split('#')[0];
      const file=noHash.replace(/^\.\//,'').split('/').pop();
      return PRODUCT_DETAIL_PAGES.has(file);
    }

    if(!document.documentElement.dataset.productModalDelegated){
      document.documentElement.dataset.productModalDelegated='1';
      document.addEventListener('click',(e)=>{
        const a=e.target.closest('a');
        if(!a) return;
        if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;

        if(a.classList.contains('js-product-modal')){
          const href=a.getAttribute('href');
          if(!href) return;
          e.preventDefault();
          const title=a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent||'').trim() || '產品介紹';
          loadPage(href,title);
          openModal(a);
          return;
        }

        if(isInterceptCandidate(a)){
          const href=a.getAttribute('href');
          e.preventDefault();
          const title=a.getAttribute('aria-label') || a.getAttribute('title') || (a.textContent||'').trim() || '產品介紹';
          loadPage(href,title);
          openModal(a);
        }
      });
    }

    if(overlay) overlay.addEventListener('click', closeModal);
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(closeBottomBtn) closeBottomBtn.addEventListener('click', closeModal);
    if(dialog) dialog.addEventListener('click', (e)=>e.stopPropagation());

    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape' && modal.classList.contains('is-open')) closeModal();
    });

    bodyEl.addEventListener('click',(e)=>{
      const a=e.target.closest('a');
      if(!a) return;
      const href=a.getAttribute('href')||'';
      if(href.startsWith('#')){
        e.preventDefault();
        scrollToAnchor(href.slice(1));
      }
    });
  }

  function setupBackLinks(){
    document.querySelectorAll('.back-link').forEach((btn)=>{
      btn.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href='index.html#all-products';
      });
    });
  }

  function init(){
    setMainPaddingTop();
    setupBackLinks();
    setupUnifiedNav();
    setupNavToggle();
    setupCompactHeader();
    setupReveal();
    setupLineFloat();
    setupProductModal();

    window.addEventListener('resize', setMainPaddingTop);
    window.addEventListener('load', setMainPaddingTop);
    setTimeout(setMainPaddingTop,250);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
