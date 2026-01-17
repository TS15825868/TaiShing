/* =========================================================
   TaiShing Site - main.js (Final)
   - Modal content: section-level reorder (prevents empty boxes)
   - TOC order: 容量/規格 -> 成份 -> 適用對象/族群 -> 建議使用方式(使用方向) -> 保存方式 -> 合作方式與報價 -> 常見問題 -> 先聊聊狀況
   - Skip empty sections (both TOC and body)
   - Robust fetch URL + file:// fallback
   ========================================================= */
(function(){
  "use strict";

  const LINE_URL = "https://lin.ee/sHZW7NkR";

  const SECTION_ORDER = [
    { key:"spec", label:"容量／規格", match:/(容量|規格|重量|包裝|內容量|ml|cc|g|公克|斤|兩|盒|罐|包|份)/ },
    { key:"ingredient", label:"成份", match:/(成份|成分|原料|配方|內容物|藥材|漢方)/ },
    { key:"audience", label:"適用對象／族群", match:/(適用對象|適合族群|誰適合|推薦對象|適合對象|對象|族群)/ },
    { key:"usage", label:"建議使用方式（使用方向）", match:/(建議使用方式|使用方式|使用方向|吃法|用法|怎麼吃|沖泡|料理|大略說明)/ },
    { key:"storage", label:"保存方式", match:/(保存方式|保存|存放|冷藏|常溫|賞味|有效期限)/ },
    { key:"cooperate", label:"合作方式與報價", match:/(合作方式|報價|合作|經銷|批發|零售|MOQ|出貨|運費|付款|條件|價格|詢價)/ },
    { key:"faq", label:"常見問題", match:/(常見問題|FAQ|Q&A)/i },
    { key:"consult", label:"先聊聊狀況", match:/(先聊聊狀況|聊聊狀況|再評估|評估是否適用|諮詢)/ }
  ];

  /* =========================================================
     ✅ 內建產品內容（避免 GitHub Pages / WebView fetch 失敗導致彈窗空白）
     - modal 優先使用此資料渲染
     - 仍保留「開啟完整頁」作為備援
     ========================================================= */
  const PRODUCT_DATA = {
    "guilu.html": {
      title: "仙加味 龜鹿膏",
      kicker: "龜鹿膏",
      images: [
        { src: "images/guilu-main.jpg", alt: "仙加味 龜鹿膏" }
      ],
      introHtml: `
        <p>以<strong>全龜板</strong>與<strong>鹿角</strong>為基底，搭配粉光蔘、枸杞、紅棗與黃耆，依家族熬膠工法慢火收膏。質地濃稠、風味厚實，適合希望建立固定補養節奏、想觀察一段時間變化的人。</p>
        <p>使用上不需特別調味或沖泡，<strong>每日一至兩小匙</strong>即可。若正在接受治療或長期服用藥物，可先與我們聊聊狀況，再一起評估是否適合。</p>
      `,
      sections: {
        ingredient: `全龜板、鹿角、粉光蔘、枸杞、紅棗、黃耆`,
        audience: `<ul>
          <li>想把補養變成固定習慣的人</li>
          <li>希望從日常飲食補充風味厚度與濃度的人</li>
          <li>想先觀察一罐或一個月狀態變化的人</li>
        </ul>`,
        usage: `<p>每日一至兩小匙，不需沖泡，直接內服即可。若當天搭配龜鹿飲或湯塊，則可先維持一匙，觀察作息與精神變化。</p>`,
        faq: `<p>想先了解份量、時機、搭配方式，可先從 FAQ 看：<a href="faq.html#faq-guilu">前往龜鹿膏 FAQ</a></p>`,
        consult: `<p>不確定適不適合？可以先聊聊狀況，再一起評估是否適用龜鹿補養。</p>`
      }
    },

    "guilu-drink.html": {
      title: "仙加味 龜鹿飲",
      kicker: "龜鹿飲",
      images: [
        { src: "images/guilu-drink.jpg", alt: "仙加味 龜鹿飲（單包）" },
        { src: "images/product-guilu-drink-10pack.jpg", alt: "仙加味 龜鹿飲 10 包一袋" }
      ],
      introHtml: `
        <p>把龜鹿補養濃縮進一包，<strong>常溫即可飲用</strong>，也可以隔水加溫至微溫。適合作息忙碌、常在外奔波，又希望維持補養節奏的人。</p>
        <p>配方承襲家族龜鹿熬煮工法，以全龜板與鹿角為核心，搭配粉光蔘、枸杞、紅棗與黃耆，調整為較容易入口的飲品型態，適合當作每天固定的小段補養時間。</p>
      `,
      sections: {
        spec: `<ul>
          <li>單包：每包 180 cc（以外包裝標示為準）</li>
          <li>10 包一袋：180 cc × 10 包</li>
        </ul>
        <p>多數客人會先以「一袋 10 包」作為一個觀察週期，規劃成 10 天或 2 週內陸續飲用，再依體感與作息調整。</p>`,
        ingredient: `<p>水、全龜板、鹿角、粉光蔘、枸杞、紅棗、黃耆。（實際內容請以產品外包裝標示為準）</p>
        <p>以龜鹿與漢方基底為主軸，風味偏濃厚、溫順，適合習慣飲用漢方風味飲品的族群。</p>`,
        audience: `<ul>
          <li>工作節奏快、通勤時間長，較少時間能在家熬煮的人</li>
          <li>常出差、跑外務，希望補養能「帶著走」的人</li>
          <li>想用飲品型態補充龜鹿，不需自己調膏、沖泡的人</li>
        </ul>`,
        usage: `<ul>
          <li>一般建議：每日 1 包，可依個人狀況與作息調整頻率。</li>
          <li>飲用溫度：可常溫飲用，亦可隔水稍微加溫至溫熱，不建議直接大火煮沸。</li>
          <li>時間點：空腹或飯後皆可；若晚間飲用後精神較好，建議改在白天或下午飲用。</li>
          <li>若同時搭配龜鹿膏或湯塊，可先維持「其中一種為主軸」，再討論如何分工安排。</li>
        </ul>`,
        storage: `<ul>
          <li>未開封：請置於陰涼乾燥處，避免陽光直射與高溫環境。</li>
          <li>開封後：建議當日飲用完畢；未喝完請冷藏保存並儘速飲用。</li>
          <li>請放在孩童不易拿取處，避免誤飲。</li>
        </ul>`,
        faq: `<p>像是「每天適合喝幾包」、「與龜鹿膏怎麼分工」、「出差、旅遊時怎麼安排」，我們在 FAQ 中有整理：<a href="faq.html#faq-guilu-drink">前往龜鹿飲 FAQ</a></p>`,
        consult: `<p>不確定該選膏還是飲？可以先聊聊你的作息，我們再一起看適合哪一種。</p>`
      }
    },

    "soup.html": {
      title: "仙加味 龜鹿湯塊",
      kicker: "龜鹿湯塊",
      images: [
        { src: "images/guilu-soup-block.jpg", alt: "仙加味 龜鹿湯塊" }
      ],
      introHtml: `
        <p><strong>一鍋湯就能兼顧風味與補養，全家共享。</strong>把龜鹿熬膠濃縮成一塊湯底，省去長時間顧爐火的過程，一塊即可沖泡或入湯。</p>
        <p>適合平常就有熬雞湯、排骨湯習慣，希望順手就能兼顧家人補養，讓餐桌上的一鍋湯，不只是好喝，也有穩定補養的角色。</p>
      `,
      sections: {
        spec: `<p>湯塊尺寸皆為相同配方與大小，差別只在包裝容量與一次備用的塊數：</p>
        <ul>
          <li><strong>小盒（4 兩 / 半斤）</strong>：常見為 8 塊裝或 16 塊裝</li>
          <li><strong>大盒（1 斤）</strong>：32 塊裝</li>
        </ul>
        <p>可依家中成員人數、平常熬湯頻率選擇較合適容量；也可先透過 LINE 與我們討論。</p>`,
        ingredient: `<p>全龜板萃取、鹿角萃取。（實際內容請以產品外包裝標示為準）</p>`,
        audience: `<ul>
          <li>平常就會煮雞湯、排骨湯等，想「順便」兼顧補養的人</li>
          <li>希望家人一起喝，一鍋湯就能兼顧多位成員的族群</li>
          <li>不想長時間顧爐火，但又希望湯頭有深度與厚度的人</li>
        </ul>`,
        usage: `<h3 class="section-subtitle">日常飲用（單人或少數人）</h3>
        <ul>
          <li>將 1 塊湯塊放入保溫瓶或馬克杯中，加入熱水溶解後分次飲用。</li>
          <li>可視個人喜歡的濃度，調整水量或湯塊數量。</li>
        </ul>
        <h3 class="section-subtitle">家庭燉湯（多人共享）</h3>
        <ul>
          <li>作為雞湯、排骨湯等湯底使用。</li>
          <li>建議先從 1～2 塊開始，依鍋子大小、家人接受度與風味濃度再微調。</li>
          <li>可搭配紅棗、枸杞或家中習慣使用的食材一起熬煮。</li>
        </ul>
        <h3 class="section-subtitle">頻率建議</h3>
        <ul>
          <li>多數家庭會以每週 1～2 次湯品為主，視家人狀況與作息彈性安排。</li>
          <li>若與龜鹿膏、龜鹿飲一起搭配使用，建議先以其中一種作為主要補養，再由我們協助調整整體節奏。</li>
        </ul>`,
        storage: `<ul>
          <li>請置於陰涼乾燥處，避免陽光直射與高溫潮濕環境。</li>
          <li>開封後若短期內無法用畢，建議密封保存，減少受潮機會。</li>
          <li>請放在孩童不易拿取處，避免誤食。</li>
        </ul>`,
        faq: `<p>不同鍋具、家中成員數與飲食習慣，適合的湯塊數量會不太一樣。我們在 FAQ 裡整理了常見比例與調整方向：<a href="faq.html#faq-soup">前往龜鹿湯塊 FAQ</a></p>`,
        consult: `<p>想讓全家一起補？你家平常怎麼煮湯，我們再一起看要怎麼加湯塊比較順手。</p>`
      }
    },

    "lurong.html": {
      title: "仙加味 鹿茸粉",
      kicker: "鹿茸粉",
      images: [
        { src: "images/product-lurong-powder.jpg", alt: "仙加味 鹿茸粉" }
      ],
      introHtml: `
        <p><strong>讓補養融入早餐、飲品與三餐料理，吃的方式不改，補養就開始。</strong></p>
        <p>鹿茸粉取自鹿茸研磨細粉，不需另開步驟，加在日常飲食中就能持續補充。適合生活節奏快速，或想用更輕鬆的方式補養的人，不必熬、不必泡，只要每天照常吃飯喝飲料，就能慢慢調整狀態。</p>
      `,
      sections: {
        spec: `<ul><li>每罐 75 g</li></ul><p>容量易攜、份量好掌握，一罐能支撐一段觀察期，適合新手嘗試。</p>`,
        ingredient: `<p>鹿茸細粉（實際以產品外包裝標示為準）。</p>`,
        audience: `<ul>
          <li>不想額外安排補養步驟，但願意每天照常吃喝的人</li>
          <li>平時早餐喝牛奶、豆漿、優酪乳的人</li>
          <li>希望用飲食調整生活節奏，不想改變作息的人</li>
          <li>喜歡補養融入三餐，而非額外添加補品的人</li>
        </ul>`,
        usage: `<h3 class="section-subtitle">加在飲品裡</h3>
        <ul><li>1 匙加入牛奶、豆漿、優酪乳或果汁中混合飲用</li></ul>
        <h3 class="section-subtitle">加在餐食裡</h3>
        <ul><li>拌入粥品、湯品或溫熱餐食中</li></ul>
        <h3 class="section-subtitle">頻率建議</h3>
        <ul>
          <li>建議每日 1～2 匙，可依個人狀況調整</li>
          <li>搭配其他龜鹿產品時，可透過 LINE 協助安排整體節奏</li>
        </ul>`,
        storage: `<ul>
          <li>請存放於陰涼乾燥處，避免陽光照射與潮濕</li>
          <li>開封後請確實密封，盡速使用完畢</li>
          <li>請置於孩童不易拿取處</li>
        </ul>`,
        faq: `<p>關於鹿茸粉如何搭配三餐、與其他補養品怎麼分工，可先到 FAQ：<a href="faq.html#faq-lurong">前往鹿茸粉 FAQ</a></p>`,
        consult: `<p>想補，但擔心吃錯方式或搭配不順？先聊聊也可以。</p>`
      }
    },

    "antler.html": {
      title: "鹿角原料",
      kicker: "原料供應",
      images: [
        { src: "images/antler-raw.jpg", alt: "鹿角原料" }
      ],
      introHtml: `
        <p>龜鹿補養的核心基底，由四代鹿角家族嚴選挑料，提供專業使用者安心的原料來源。</p>
        <p>鹿角原料適用於龜鹿膏、龜鹿湯、養身湯品與各類補養配方，對需要長期使用原料的中藥房、中醫診所、餐飲品牌與家庭自煉者來說，更在意「來源穩不穩、品質合不合適」。</p>
      `,
      sections: {
        spec: `<p>依實際需求提供不同重量與切製方式，常見合作方式包含：</p>
        <ul>
          <li>依斤兩計價，提供整支或裁切後的鹿角段</li>
          <li>依配方需求預先切段或特定厚度</li>
          <li>可協助評估試用批與長期供貨批的配置</li>
        </ul>
        <p>具體規格會依用途與鍋具條件調整，建議先透過 LINE 與我們討論再決定。</p>`,
        ingredient: `<p>鹿角（實際內容物以外包裝或合約標示為準）。</p>`,
        audience: `<ul>
          <li>需要穩定龜鹿配方原料來源的中藥房</li>
          <li>規劃長期補養門診或客製處方的中醫診所</li>
          <li>開發龜鹿湯品、養身鍋物或季節性湯品的餐飲品牌</li>
          <li>有明確配方，習慣自行熬煮龜鹿膏、龜鹿湯的家庭自煉者</li>
        </ul>
        <p>若你已經有固定配方，也可把鍋具大小、預估使用量與預期風味告訴我們，會更容易一起抓到合適的等級與切製方式。</p>`,
        usage: `<ul>
          <li>作為龜鹿膏、龜鹿湯的鹿角來源，搭配全龜板與其他漢方食材使用</li>
          <li>作為養身雞湯、火鍋湯底或季節性補養湯品的基底原料之一</li>
          <li>配合既有配方，調整鹿角比例與切製方式，以便熬煮與出味</li>
        </ul>
        <p>每一家診所、每一個品牌都有自己的習慣配方與濃度偏好，我們會以「原料條件」與「實際熬煮經驗」為主，協助你找到較合適的搭配。</p>`,
        cooperate: `<p>鹿角原料的價格與供應方式，會依下列條件綜合評估：</p>
        <ul>
          <li>預估單次與年度用量</li>
          <li>需要的等級與分級標準</li>
          <li>切製方式（整支、段狀或客製尺寸）</li>
          <li>是否搭配其他龜鹿產品或長期合作方案</li>
        </ul>
        <p>若你目前還在規劃階段，也可以先告訴我們想法與方向，由我們提供幾個不同用量與等級的方案作為討論基礎。</p>`,
        faq: `<p>關於鹿角原料可以做什麼、能不能客製規格、價格怎麼抓，我們整理了一份 FAQ：<a href="faq.html#faq-antler">前往鹿角原料 FAQ</a></p>`,
        consult: `<p>商業合作・原料詢問：有配方、有想法，但還不確定怎麼抓用量？可以先聊聊狀況。</p>`
      }
    }
  };

  function setMainPaddingTop(){
    const header=document.querySelector('.site-header');
    const main=document.querySelector('.site-main');
    if(!header||!main) return;
    main.style.paddingTop=`${(header.offsetHeight||0)+18}px`;
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
    const close=()=>{nav.classList.remove('is-open');toggle.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
    if(!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',(e)=>{e.stopPropagation();const next=!nav.classList.contains('is-open');nav.classList.toggle('is-open',next);toggle.classList.toggle('is-open',next);toggle.setAttribute('aria-expanded',next?'true':'false');});
    document.addEventListener('click',(e)=>{ if(!nav.contains(e.target) && !toggle.contains(e.target)) close(); });
    window.addEventListener('scroll',()=>{ if(window.innerWidth<=768 && nav.classList.contains('is-open')) close(); },{passive:true});
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
    modal.innerHTML=
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
    // Always resolve relative href to absolute (prevents modal fetch failure on nested pages)
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
    // If the section only has a heading and nothing else, treat as empty
    const clone=section.cloneNode(true);
    // remove headings text
    clone.querySelectorAll('h1,h2,h3').forEach(h=>h.remove());
    // remove whitespace-only text nodes by reading textContent
    const txt=(clone.textContent||'').replace(/\s+/g,'').trim();
    // if has images/buttons/list, consider meaningful even if text is short
    const hasMedia=!!clone.querySelector('img,ul,ol,table,button,a');
    return hasMedia || txt.length>0;
  }

  function reorderSections(wrapper){
    const sections=Array.from(wrapper.querySelectorAll('section.section'));
    if(!sections.length) return;

    const hero=sections[0];

    // classify sections by key
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

    // remove all sections
    sections.forEach(sec=>sec.remove());

    const frag=document.createDocumentFragment();
    // keep hero always
    frag.appendChild(hero);

    // append ordered sections, skipping empty ones
    SECTION_ORDER.forEach(s=>{
      const list=keyed.get(s.key)||[];
      list.forEach(sec=>{ if(sectionHasMeaningfulContent(sec)) frag.appendChild(sec); });
    });
    // append others (still skip empty)
    others.forEach(sec=>{ if(sectionHasMeaningfulContent(sec)) frag.appendChild(sec); });

    wrapper.appendChild(frag);
  }

  function buildToc(modal, wrapper){
    const toc=modal.querySelector('.modal-toc');
    if(!toc) return;
    toc.innerHTML='';

    // Ensure headings have IDs
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

    // find the first section for each key
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
      a.className = s.key==='consult' ? 'modal-toc-link modal-toc-cta' : 'modal-toc-link';
      a.href = '#'+h.id;
      a.textContent = s.label;
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
      bodyEl.innerHTML='<div class="modal-loading"><div class="modal-loading-bar"></div><div class="modal-loading-bar"></div><div class="modal-loading-bar"></div></div>';
    }

    function showFetchError(href){
      const safe=href||'#';
      titleEl.textContent=titleEl.textContent||'產品介紹';
      tocEl.innerHTML='';
      bodyEl.innerHTML=
        '<div class="section" style="margin:0;">'+
          '<h2 class="section-title">目前無法載入產品內容</h2>'+
          '<p>若你是用「直接打開檔案（file://）」預覽，瀏覽器會阻擋跨檔案讀取，因此跳窗會失效。建議：</p>'+
          '<ul><li>上傳到 GitHub Pages / 任何網站環境再測試</li><li>或直接開啟完整頁查看內容</li></ul>'+
          '<a class="btn-primary" href="'+safe+'">開啟完整頁</a>'+
        '</div>';
    }

    // ✅ 用內建產品資料渲染彈窗（跳過空項目；TOC 與內文一致）
    function renderProductFromData(file, fallbackTitle){
      const data = PRODUCT_CONTENT[file];
      if(!data) return false;

      const pageTitle = (data.pageTitle || '').trim() || (fallbackTitle||'').trim() || '產品介紹';
      titleEl.textContent = pageTitle;

      const wrapper = document.createElement('div');
      wrapper.className = 'modal-page';

      // ---- Intro (hero) ----
      const intro = document.createElement('section');
      intro.className = 'section';
      intro.innerHTML =
        (data.kicker ? '<div class="section-kicker">'+escapeHtml(data.kicker)+'</div>' : '')+
        '<h1 class="page-title">'+escapeHtml(data.title||pageTitle)+'</h1>';

      // images
      if(Array.isArray(data.images) && data.images.length){
        if(data.images.length===1){
          intro.innerHTML +=
            '<div class="product-image-frame">'+
              '<img class="product-image" loading="lazy" src="'+escapeAttr(data.images[0].src)+'" alt="'+escapeAttr(data.images[0].alt||data.title||'')+'">'+
            '</div>';
        }else{
          intro.innerHTML += '<div class="product-image-row">'+
            data.images.map(im=>
              '<div class="product-image-frame">'+
                '<img class="product-image" loading="lazy" src="'+escapeAttr(im.src)+'" alt="'+escapeAttr(im.alt||data.title||'')+'">'+
              '</div>'
            ).join('')+
          '</div>';
        }
      }

      if(data.oneLiner){
        intro.innerHTML += '<p class="product-one-liner">'+data.oneLiner+'</p>';
      }

      if(Array.isArray(data.intro) && data.intro.length){
        intro.innerHTML += data.intro.map(p=>'<p>'+p+'</p>').join('');
      }

      wrapper.appendChild(intro);

      // ---- Sections (ordered) ----
      const presentKeys = [];
      SECTION_ORDER.forEach(s=>{
        const sec = (data.sections||{})[s.key];
        if(!sec) return;
        const html = (sec.html||'').trim();
        if(!html) return;
        presentKeys.push(s.key);

        const el = document.createElement('section');
        el.className = 'section';

        const id = 'sec-'+s.key;
        const heading = (sec.title||s.label||'').trim();
        el.innerHTML = '<h2 class="section-title" id="'+id+'">'+escapeHtml(heading)+'</h2>'+html;
        wrapper.appendChild(el);
      });

      // Inject
      bodyEl.innerHTML='';
      bodyEl.appendChild(wrapper);

      // TOC
      tocEl.innerHTML='';
      presentKeys.forEach((key)=>{
        const s = SECTION_ORDER.find(x=>x.key===key);
        if(!s) return;
        const a = document.createElement('a');
        a.className = 'modal-toc-link'+(key==='consult'?' modal-toc-cta':'');
        a.href = '#sec-'+key;
        a.textContent = s.label;
        tocEl.appendChild(a);
      });

      bodyEl.scrollTop = 0;
      return true;
    }

    function escapeHtml(str){
      return String(str||'')
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;');
    }

    function escapeAttr(str){
      return escapeHtml(str).replace(/\n/g,' ');
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
      const href=a.getAttribute('href')||'';
      if(!href.startsWith('#')) return;
      e.preventDefault();
      scrollToAnchor(href.slice(1));
    });

    bodyEl.addEventListener('scroll',()=>{
      modal.classList.toggle('is-body-scrolled', (bodyEl.scrollTop||0)>56);
      if(modal.classList.contains('is-toc-peek')){ modal.classList.remove('is-toc-peek'); setTocToggleState(false); }
    },{passive:true});

    function setTocToggleState(peek){
      if(!tocToggle) return;
      tocToggle.setAttribute('aria-pressed', peek?'true':'false');
      tocToggle.setAttribute('aria-label', peek?'收起目錄':'顯示目錄');
      tocToggle.textContent=peek?'收起':'目錄';
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

      // ✅ 優先用內建資料渲染（避免 fetch 在部分手機/APP WebView 失敗）
      try{
        const u=new URL(resolved, window.location.href);
        const file=(u.pathname||'').split('/').pop();
        if(file && PRODUCT_CONTENT[file]){
          renderProductFromData(file, fallbackTitle);
          return;
        }
      }catch(_){/* ignore */}

      // file:// preview fallback (fetch will fail)
      if(isFileProtocol()){
        showFetchError(resolved);
        return;
      }

      try{
        const res=await fetch(resolved, { cache:'no-store' });
        if(!res.ok) throw new Error('Fetch failed: '+res.status);
        const html=await res.text();
        const doc=new DOMParser().parseFromString(html,'text/html');

        const pageTitle=(doc.querySelector('title')?.textContent||'').trim();
        titleEl.textContent=pageTitle||fallbackTitle||'產品介紹';

        const main=doc.querySelector('main') || doc.querySelector('.site-main') || doc.body;
        const wrapper=document.createElement('div');
        wrapper.className='modal-page';
        wrapper.innerHTML=main.innerHTML;

        // remove fixed parts
        wrapper.querySelectorAll('.line-float,.site-header,.site-footer,script,noscript').forEach(el=>el.remove());
        wrapper.querySelectorAll('.reveal,.reveal-up').forEach(el=>el.classList.add('is-visible'));

        // convert back button in product pages
        wrapper.querySelectorAll('.back-link').forEach((a)=>{
          a.textContent='關閉';
          a.setAttribute('href','#');
          a.addEventListener('click',(ev)=>{ev.preventDefault(); closeModal();});
        });

        // reorder by section blocks (prevents empty section shells)
        reorderSections(wrapper);

        // build toc after reorder (skips empty sections)
        buildToc(modal, wrapper);

        bodyEl.innerHTML='';
        bodyEl.appendChild(wrapper);
        bodyEl.scrollTop=0;
      }catch(err){
        console.error(err);
        showFetchError(resolved);
      }
    }

    const PRODUCT_DETAIL_PAGES=new Set([
      'guilu.html','guilu-drink.html','soup.html','lurong.html','antler.html','guilu-line.html'
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
      btn.addEventListener('click',(e)=>{e.preventDefault(); window.location.href='index.html#all-products';});
    });
  }

  function init(){
    setMainPaddingTop();
    setupBackLinks();
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
