
document.addEventListener('click',e=>{
  const btn=e.target.closest('.video-load-btn');
  if(!btn)return;
  const holder=btn.closest('.video-placeholder');
  if(holder.dataset.loaded==='1')return;
  holder.dataset.loaded='1';
  const id=holder.dataset.id;
  holder.innerHTML=`<iframe class="video-iframe" src="https://www.tiktok.com/embed/v2/${id}?autoplay=1" allow="autoplay;fullscreen"></iframe>`;
});
