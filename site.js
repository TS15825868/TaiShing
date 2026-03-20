document.addEventListener('DOMContentLoaded',()=>{

  const menu = document.getElementById('menuOverlay');

  if(menu){
    menu.innerHTML = `
      <div class="menu-full">

        <div onclick="toggleMenu()" style="font-size:22px;cursor:pointer;">✕</div>

        <div class="menu-block">
          <a href="index.html">首頁</a>
          <a href="brand.html">品牌</a>
        </div>

        <div class="menu-block">
          <a href="guilu-series.html">龜鹿系列</a>
          <a href="choose.html">怎麼選</a>
        </div>

        <div class="menu-block">
          <a href="faq.html">FAQ</a>
        </div>

        <div class="menu-block">
          <a href="https://lin.ee/sHZW7NkR">LINE詢問</a>
        </div>

      </div>
    `;
  }

  const btn = document.querySelector('.menu-btn');

  if(btn){
    btn.addEventListener('click',toggleMenu);
  }

});

function toggleMenu(){
  document.getElementById('menuOverlay').classList.toggle('active');
}
