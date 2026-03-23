(function(){

function toggleMenu(){
  const menu=document.getElementById('menuOverlay');
  menu.classList.toggle('active');
}

window.toggleMenu=toggleMenu;

document.addEventListener('DOMContentLoaded',()=>{

const menu=document.getElementById('menuOverlay');

menu.innerHTML=`
<a href="index.html">首頁</a>

<div class="menu-group">
  <div class="menu-title">了解</div>
  <a href="choose.html">怎麼選龜鹿</a>
  <a href="guilu-series.html">龜鹿系列</a>
</div>

<div class="menu-group">
  <div class="menu-title">使用</div>
  <a href="recipes.html">料理搭配</a>
  <a href="guilu-block.html">龜鹿湯塊</a>
</div>

<div class="menu-group">
  <div class="menu-title">品牌</div>
  <a href="brand.html">品牌故事</a>
  <a href="articles.html">龜鹿知識</a>
  <a href="faq.html">FAQ</a>
</div>

<div class="menu-group">
  <div class="menu-title">開始</div>
  <a href="combo.html">套餐整理</a>
</div>

<a href="https://lin.ee/sHZW7NkR" class="btn btn-line">
有需要再詢問 →
</a>
`;

});

})();
