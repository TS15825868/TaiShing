
function toggleMenu(){
 document.getElementById("drawer").classList.toggle("open");
}
function searchCards(id){
 let q=document.getElementById(id).value.toLowerCase();
 document.querySelectorAll(".card").forEach(c=>{
   c.style.display=c.innerText.toLowerCase().includes(q)?'block':'none';
 })
}
