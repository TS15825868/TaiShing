"use strict";
/* Web v12.0 — Hamburger A (desktop also uses hamburger) */
(function(){
  const btn = document.querySelector('.menu-toggle, .hamburger, .nav-toggle, .menu-btn, button[aria-label*="選單"], button[aria-label*="menu"]');
  const panel = document.querySelector('.mobile-menu, .nav-panel, .menu-panel, .site-nav, .menu, nav ul');
  const overlay = document.querySelector('.menu-overlay, .nav-overlay, .overlay');
  if(!btn || !panel) return;
  const open = () => { panel.classList.add('open'); if(overlay) overlay.classList.add('open'); btn.setAttribute('aria-expanded','true'); };
  const close = () => { panel.classList.remove('open'); if(overlay) overlay.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
  btn.addEventListener('click',(e)=>{e.preventDefault(); panel.classList.contains('open')?close():open();});
  if(overlay) overlay.addEventListener('click', close);
  panel.addEventListener('click',(e)=>{ if(e.target.closest('a')) close(); });
  window.addEventListener('keydown',(e)=>{ if(e.key==='Escape') close(); });
})();
