function toggleMenu(open){
  const d = document.getElementById('drawer');
  const o = document.getElementById('overlay');
  if(!d || !o) return;
  const willOpen = (typeof open === 'boolean') ? open : !d.classList.contains('open');
  if(willOpen){
    d.classList.add('open');
    o.classList.add('open');
    document.body.classList.add('menu-open');
    d.setAttribute('aria-hidden', 'false');
  }else{
    d.classList.remove('open');
    o.classList.remove('open');
    document.body.classList.remove('menu-open');
    d.setAttribute('aria-hidden', 'true');
  }
}

function normalizeLegacyHeader(){
  document.querySelectorAll('.topnav').forEach(el => {
    el.setAttribute('aria-hidden', 'true');
  });

  const drawer = document.getElementById('drawer');
  if(!drawer) return;

  if(!drawer.querySelector('.drawer-scroll')){
    const top = drawer.querySelector('.drawer-top');
    const scroll = document.createElement('div');
    scroll.className = 'drawer-scroll';
    Array.from(drawer.children).forEach(child => {
      if(child !== top) scroll.appendChild(child);
    });
    drawer.appendChild(scroll);
  }

  drawer.querySelectorAll('a[href="usage.html"]').forEach(a => {
    a.setAttribute('href', 'guilu-howto-eat.html');
  });

  drawer.querySelectorAll('summary').forEach(summary => {
    const t = summary.textContent.trim();
    if(t === '產品') summary.textContent = '產品';
    if(t === '龜鹿知識') summary.textContent = '龜鹿知識';
    if(t === '品牌') summary.textContent = '品牌';
    if(t === '客服') summary.textContent = '客服';
  });
}

function markCurrentPage(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if(!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return;
    const clean = href.split('#')[0].split('?')[0];
    if(clean === path || (path === '' && clean === 'index.html')){
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
      const details = a.closest('details');
      if(details) details.open = true;
    }
  });
}

function ensureLineFloat(){
  if(document.body.classList.contains('no-line-float')) return;
  if(!document.querySelector('.line-float')){
    const a = document.createElement('a');
    a.className = 'line-float';
    a.href = 'line.html';
    a.setAttribute('aria-label', 'LINE 詢問');
    a.innerHTML = '<span class="line-float__text">LINE</span>';
    document.body.appendChild(a);
  }
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') toggleMenu(false);
});

document.addEventListener('click', (e)=>{
  if(e.target && e.target.id === 'overlay') toggleMenu(false);
});

document.addEventListener('click', (e)=>{
  const d = document.getElementById('drawer');
  if(!d || !d.classList.contains('open')) return;
  const link = e.target.closest('a');
  if(link && d.contains(link)) toggleMenu(false);
});

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.video-load');
  if(!btn) return;
  const wrap = btn.closest('.video-embed');
  if(!wrap) return;
  const videoId = wrap.getAttribute('data-video-id');
  if(!videoId) return;
  wrap.innerHTML = '<iframe class="video-frame" src="https://www.tiktok.com/embed/v2/' + videoId + '" allowfullscreen loading="lazy"></iframe>';
});

document.addEventListener('DOMContentLoaded', ()=>{
  normalizeLegacyHeader();
  markCurrentPage();
  ensureLineFloat();
});
