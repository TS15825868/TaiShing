function toggleMenu(){

  const drawer = document.getElementById('drawer');
  const body = document.body;

  drawer.classList.toggle('open');

  // 鎖定背景滾動
  if(drawer.classList.contains('open')){
    body.classList.add('drawer-open');
    openOverlay();
  }else{
    body.classList.remove('drawer-open');
    closeOverlay();
  }

}


/* ===== Overlay 遮罩 ===== */

function openOverlay(){

  let overlay = document.querySelector('.drawer-overlay');

  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', closeMenu);
  }

  setTimeout(()=>{
    overlay.classList.add('open');
  },10);

}

function closeOverlay(){

  const overlay = document.querySelector('.drawer-overlay');

  if(overlay){
    overlay.classList.remove('open');
  }

}


/* ===== 關閉選單 ===== */

function closeMenu(){

  const drawer = document.getElementById('drawer');
  const body = document.body;

  drawer.classList.remove('open');
  body.classList.remove('drawer-open');

  closeOverlay();

}


/* ===== ESC 鍵關閉 ===== */

document.addEventListener('keydown', function(e){

  if(e.key === "Escape"){
    closeMenu();
  }

});
