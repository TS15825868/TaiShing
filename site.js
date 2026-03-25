(function(){

function openLine(msg){
  window.open("https://lin.ee/sHZW7NkR?text=" + encodeURIComponent(msg));
}
window.openLine = openLine;

function toggleMenu(force){
  const m = document.getElementById('menuOverlay');
  if(!m) return;

  const open = typeof force === 'boolean'
    ? force
    : !m.classList.contains('active');

  m.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden':'';
}
window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded',()=>{

  const menu = document.getElementById('menuOverlay');

  if(menu){
    menu.innerHTML = `
      <a onclick="openLine('幫我搭配')">👉 直接幫我配</a>
      <a href="index.html">首頁</a>
      <a href="product.html">產品總覽</a>
      <a href="video.html">影片</a>
      <a href="faq.html">FAQ</a>
    `;
  }

  document.querySelector('.menu-btn')?.addEventListener('click',toggleMenu);

});

})();
