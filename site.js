(function(){

window.openLine = function(text){
  window.open("https://lin.ee/sHZW7NkR?text="+encodeURIComponent(text));
};

function toggleMenu(force){
  const m=document.getElementById('menuOverlay');
  if(!m)return;
  const open=typeof force==='boolean'?force:!m.classList.contains('active');
  m.classList.toggle('active',open);
  document.body.style.overflow=open?'hidden':'';
}
window.toggleMenu=toggleMenu;

document.addEventListener('DOMContentLoaded',()=>{

  const m=document.getElementById('menuOverlay');

  if(m){
    m.innerHTML=`
    <a href="index.html">首頁</a>
    <a href="choose.html">怎麼選龜鹿</a>
    <a href="combo.html">套餐推薦</a>
    <a href="how-to-use.html">怎麼使用</a>
    <a href="articles.html">龜鹿知識</a>
    <a href="faq.html">FAQ</a>
    <a href="product.html">產品總覽</a>
    <a href="https://lin.ee/sHZW7NkR">LINE詢問</a>
    `;
  }

  document.querySelector('.menu-btn')?.addEventListener('click',toggleMenu);

});

})();
