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