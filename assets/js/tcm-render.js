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

  const listEl = document.getElementById("tcm-video-list");
  const emptyEl = document.getElementById("tcm-empty");
  const jumpEl = document.getElementById("tcmJump");
  const videos = (window.TCM_VIDEOS || []).slice().reverse();

  if(!listEl || !emptyEl || !jumpEl) return;

  if(!videos.length){
    emptyEl.style.display = "block";
    return;
  }

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

    const embed = youtubeEmbed(v.url);
    if(embed){
      const iframe = document.createElement("iframe");
      iframe.src = embed;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      media.appendChild(iframe);
    }else{
      media.classList.add("video-wrap--link");
      const a = document.createElement("a");
      a.href = v.url || "#";
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "btn btn-primary";
      a.textContent = "開啟原影片";
      media.appendChild(a);
    }

    const tags = document.createElement("p");
    tags.className = "tcm-tags";
    if(Array.isArray(v.tags) && v.tags.length){
      tags.textContent = v.tags.map(t => "#" + t).join("  ");
    }

    const open = document.createElement("a");
    open.href = v.url || "#";
    open.target = "_blank";
    open.rel = "noopener";
    open.className = "tcm-open";
    open.textContent = "開啟原影片";

    card.appendChild(h);
    if(meta.textContent) card.appendChild(meta);
    card.appendChild(media);
    if(tags.textContent) card.appendChild(tags);
    card.appendChild(open);
    listEl.appendChild(card);

    const opt = document.createElement("option");
    opt.value = "#" + cardId;
    opt.textContent = v.title || ("影片 " + (idx+1));
    jumpEl.appendChild(opt);
  });

  jumpEl.addEventListener("change", function(){
    if(!this.value) return;
    const el = document.querySelector(this.value);
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
  });
})();