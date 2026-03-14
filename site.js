const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");

menuBtn.addEventListener("click", () => {

menuOverlay.classList.toggle("show");

});

menuOverlay.addEventListener("click", (e) => {

if(e.target === menuOverlay){
menuOverlay.classList.remove("show");
}

});