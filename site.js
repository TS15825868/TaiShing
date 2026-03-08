
function toggleMenu(){
 document.getElementById("drawer").classList.toggle("open");
}
function searchCards(inputId, containerSelector){
 const q=document.getElementById(inputId).value.toLowerCase();
 document.querySelectorAll(containerSelector + " .card").forEach(c=>{
   c.style.display=c.innerText.toLowerCase().includes(q)?'block':'none';
 });
}
function openModal(id){
 document.getElementById(id).classList.add('open');
}
function closeModal(id){
 document.getElementById(id).classList.remove('open');
}
window.addEventListener('click', function(e){
 if(e.target.classList.contains('modal')) e.target.classList.remove('open');
});
