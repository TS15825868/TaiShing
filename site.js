
const drawer=document.getElementById('drawer');
function toggleMenu(){drawer.classList.toggle('open')}
function closeMenu(){drawer.classList.remove('open')}
function openModal(id){document.getElementById(id)?.classList.add('open')}
function closeModal(id){document.getElementById(id)?.classList.remove('open')}
document.addEventListener('click',function(e){
  if(e.target.matches('#drawer a')) closeMenu();
  if(!e.target.closest('#drawer')&&!e.target.closest('.menu')) closeMenu();
  if(e.target.classList.contains('modal')) e.target.classList.remove('open');
  if(e.target.classList.contains('acc-q')) e.target.parentElement.classList.toggle('open');
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    closeMenu();
    document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
  }
});
function filterCards(inputId, wrapId){
  const q=(document.getElementById(inputId)?.value||'').toLowerCase();
  document.querySelectorAll(wrapId+' .filter-card').forEach(card=>{
    card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
}
