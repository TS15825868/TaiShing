document.addEventListener("DOMContentLoaded",()=>{

  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menuOverlay");

  if(menuBtn && menu){
    menuBtn.addEventListener("click",()=>{
      menu.classList.add("active");
    });
  }

  window.closeMenu = function(){
    if(menu){
      menu.classList.remove("active");
    }
  }

});
