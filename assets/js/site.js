/* Web v7.4 — Single JS (site.js) | Updated 2026-03-04
   說明：合併現有腳本；以後只覆蓋此檔，不新增 JS。
*/


/* ===== BEGIN assets/js/tcm-render.js ===== */
(function(){
  function youtubeEmbed(url){
    try{
      if(!url) return null;
      const u = new URL(url);
      let id = null;
      if(u.hostname.includes("youtu.be")) id = u.pathname.replace("/","").trim();
      else if(u.hostname.includes("youtube.com")) id = u.searchParams.get("v");
      if(!id) return null;
      return "https://www.youtube.com/embed/" + id;
    }catch(e){ return null; }
  }

  function tiktokInfo(url){
    try{
      if(!url) return null;
      const u = new URL(url);
      if(!u.hostname.includes("tiktok.com")) return null;
      // pattern: /@user/video/123...
      const m = u.pathname.match(/\/video\/(\d+)/);
      if(!m) return null;
      return { id: m[1], cite: url };
    }catch(e){ return null; }
  }

  function ensureTikTokScript(){
    if(document.documentElement.dataset.tiktokEmbedLoaded) return;
    document.documentElement.dataset.tiktokEmbedLoaded = "1";
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(s);
  }

  const listEl = document.getElementById("tcm-video-list");
  const emptyEl = document.getElementById("tcm-empty");
  const jumpEl = document.getElementById("tcmJump");
  const videos = (window.TCM_VIDEOS || []).slice().reverse(); // 最新在最上

  if(!listEl || !emptyEl || !jumpEl) return;

  if(!videos.length){
    emptyEl.style.display = "block";
    return;
  }

  const jump = document.createElement("select");
  jump.className = "tcm-jump";
  const opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = "影片快速跳轉（最新在最上）";
  jump.appendChild(opt0);

  videos.forEach((v, idx)=>{
    const cardId = "tcm-video-" + idx;

    const card = document.createElement("article");
    card.className = "tcm-card";
    card.id = cardId;

    const h = document.createElement("h3");
    h.className = "tcm-card-title";
    h.textContent = v.title || "影片";

    const meta = document.createElement("p");
    meta.className = "xjw-muted";
    meta.textContent = [v.doctor, v.platform].filter(Boolean).join("｜");

    const media = document.createElement("div");
    media.className = "video-wrap";

    const yt = youtubeEmbed(v.url);
    const tk = tiktokInfo(v.url);

    if(yt){
      const iframe = document.createElement("iframe");
      iframe.src = yt;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      media.appendChild(iframe);
    }else if(tk){
      // TikTok embed（同時提供「開啟原影片」避免 iOS/Safari 內嵌限制）
      ensureTikTokScript();
      const bq = document.createElement("blockquote");
      bq.className = "tiktok-embed";
      bq.setAttribute("cite", tk.cite);
      bq.setAttribute("data-video-id", tk.id);
      bq.style.maxWidth = "720px";
      bq.style.minWidth = "325px";
      const sec = document.createElement("section");
      bq.appendChild(sec);
      media.appendChild(bq);

      const open = document.createElement("a");
      open.href = v.url;
      open.target = "_blank";
      open.rel = "noopener";
      open.className = "tcm-open-link";
      open.textContent = "開啟原影片";
      media.appendChild(open);
    }else{
      media.classList.add("video-wrap--link");
      const a = document.createElement("a");
      a.href = v.url || "#";
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "開啟原影片";
      media.appendChild(a);
    }

    const tags = (v.tags || []).map(t=>String(t)).filter(Boolean);
    const tagRow = document.createElement("div");
    tagRow.className = "tcm-tags";
    tags.forEach(t=>{
      const s = document.createElement("span");
      s.className = "tcm-tag";
      s.textContent = "#" + t;
      tagRow.appendChild(s);
    });

    card.appendChild(h);
    if(meta.textContent) card.appendChild(meta);
    card.appendChild(media);
    if(tags.length) card.appendChild(tagRow);

    listEl.appendChild(card);

    const opt = document.createElement("option");
    opt.value = "#" + cardId;
    opt.textContent = v.title || ("影片 " + (idx+1));
    jump.appendChild(opt);
  });

  jump.addEventListener("change", ()=>{
    if(!jump.value) return;
    const el = document.querySelector(jump.value);
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
    jump.value = "";
  });

  jumpEl.innerHTML = "";
  jumpEl.appendChild(jump);

})();
/* ===== END assets/js/tcm-render.js ===== */

/* ===== BEGIN assets/js/tcm-videos.js ===== */
// 合作中醫師影片清單（可自行增減/替換）
// 支援：TikTok（抖音/國際版 tiktok.com 連結）與 YouTube 連結
// ✅ 請把你的實際影片連結貼在 url；越新越放後面（頁面會自動「最新在最上」）
window.TCM_VIDEOS = [
  // 範例（請改成你的影片連結）：
  // { title:"入門觀念｜先從生活作息與需求出發", doctor:"合作中醫師", platform:"TikTok", url:"https://www.tiktok.com/@xxxx/video/1234567890", tags:["入門"] },
  // { title:"補養是一種節奏｜日常如何安排更好做到", doctor:"合作中醫師", platform:"TikTok", url:"https://www.tiktok.com/@xxxx/video/1234567891", tags:["節奏"] },
];

/* ===== END assets/js/tcm-videos.js ===== */

/* ===== BEGIN assets/js/unit-normalize.js ===== */

(function () {
  "use strict";
  const weightRegex = /(\d{1,5})\s*(公克|克|g|G)\b/g;
  function normalizeText(text) {
    return text.replace(weightRegex, function (_, num) {
      return String(num) + "g";
    });
  }
  const SKIP = new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA"]);
  function walk(node){
    if(node.nodeType===3){
      node.nodeValue = normalizeText(node.nodeValue);
      return;
    }
    if(node.nodeType===1 && !SKIP.has(node.tagName)){
      for(let i=0;i<node.childNodes.length;i++){
        walk(node.childNodes[i]);
      }
    }
  }
  function run(){
    walk(document.body);
  }
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",run);
  }else{run();}
})();

/* ===== END assets/js/unit-normalize.js ===== */

/* ===== BEGIN assets/js/xjw-funnel.js ===== */

(function(){
  "use strict";
  var LINE_URL = 'https://lin.ee/sHZW7NkR';
  document.addEventListener("click", function(e){
    var el = e.target.closest("[data-line-cta]");
    if(!el) return;
    e.preventDefault();
    window.open(LINE_URL, "_blank");
  });
})();

/* ===== END assets/js/xjw-funnel.js ===== */
