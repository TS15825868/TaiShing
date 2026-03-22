document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu-btn");
  const menuOverlay = document.getElementById("menuOverlay");

  if(menuBtn){
    menuBtn.addEventListener("click", ()=>{
      menuOverlay.classList.add("active");
    });
  }

  window.closeMenu = function(){
    menuOverlay.classList.remove("active");
  }

  if(menuOverlay){
    menuOverlay.addEventListener("click", (e)=>{
      if(e.target === menuOverlay){
        closeMenu();
      }
    });
  }

});
