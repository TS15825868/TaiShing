"use strict";
/* Web v8.0.1 — Stable hamburger for original header */
(function(){
  const btn=document.querySelector('main .nav-toggle') || document.querySelector('.nav-toggle');
  const nav=document.querySelector('main .site-nav') || document.querySelector('.site-nav');
  if(!btn || !nav) return;

  // Create overlay if not present
  let overlay=document.querySelector('.nav-overlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.className='nav-overlay';
    document.body.appendChild(overlay);
  }

  const open=()=>{ nav.classList.add('open'); overlay.classList.add('open'); btn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
  const close=()=>{ nav.classList.remove('open'); overlay.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };

  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',(e)=>{ e.preventDefault(); nav.classList.contains('open') ? close() : open(); });
  overlay.addEventListener('click', close);
  nav.addEventListener('click',(e)=>{ const a=e.target.closest('a'); if(a && window.matchMedia('(max-width: 900px)').matches) close(); });
  window.addEventListener('keydown',(e)=>{ if(e.key==='Escape') close(); });
})();
