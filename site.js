
function toggleMenu(force){
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('modal')) closeModal(e.target.id);
});
document.addEventListener('DOMContentLoaded', ()=>{
  const q = document.getElementById('guideSearch');
  if(q){
    q.addEventListener('input', ()=>{
      const k = q.value.trim().toLowerCase();
      document.querySelectorAll('.searchable-card').forEach(card=>{
        card.style.display = !k || card.innerText.toLowerCase().includes(k) ? '' : 'none';
      });
    });
  }
});
