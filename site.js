
function openModal(t,txt){
document.getElementById('modal').style.display='flex';
document.getElementById('modalTitle').innerText=t;
document.getElementById('modalText').innerText=txt;
}
function closeModal(){document.getElementById('modal').style.display='none'}

document.addEventListener('input',e=>{
if(e.target.id==='recipeSearch'){
let v=e.target.value.toLowerCase()
document.querySelectorAll('.recipe').forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(v)?'block':'none'
})
}
})
