document.addEventListener("DOMContentLoaded",()=>{

  document.getElementById("app-header").innerHTML = `
  <header>
    <a href="/xianjiawei/index.html">
      <img src="/xianjiawei/images/logo.png" class="logo">
    </a>
    <button class="menu-btn" onclick="toggleMenu()">☰</button>
  </header>

  <div id="menu" class="menu">
    <a href="/xianjiawei/index.html">首頁</a>
    <a href="/xianjiawei/products.html">產品</a>
    <a href="/xianjiawei/combo.html">怎麼搭配</a>
    <a href="/xianjiawei/recommend.html">幫我配</a>
    <a href="/xianjiawei/knowledge.html">怎麼使用</a>
    <a href="/xianjiawei/recipes.html">料理</a>
    <a href="/xianjiawei/videos.html">影片</a>
    <a href="/xianjiawei/faq.html">FAQ</a>
    <a href="/xianjiawei/contact.html">聯絡</a>
  </div>
  `;

});


function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}


/* Modal */
function openModal(p){

  document.getElementById("modal").classList.add("active");

  document.getElementById("modal").innerHTML = `
  <div class="modal-content">

    <div style="text-align:right">
      <button onclick="closeModal()">✕</button>
    </div>

    <div class="product-gallery">
      ${p.images.map(img=>`<img src="${img}">`).join("")}
    </div>

    <h2>${p.name}</h2>
    <p>${p.desc}</p>

    <p><b>規格：</b>${p.spec}</p>
    <p><b>成分：</b>${p.ingredient}</p>

    <ul>
      ${p.usage.map(u=>`<li>${u}</li>`).join("")}
    </ul>

    <a href="https://line.me/R/oaMessage/@762jybnm/?我要${p.name}"
    class="btn btn-primary">
    👉 LINE直接詢問
    </a>

  </div>
  `;

  setTimeout(initGallery,300);
}

function closeModal(){
  document.getElementById("modal").classList.remove("active");
}


/* Apple滑動判定 */
function initGallery(){

  const imgs = document.querySelectorAll(".product-gallery img");

  function update(){
    let center = window.innerWidth/2;

    imgs.forEach(img=>{
      const rect = img.getBoundingClientRect();
      const c = rect.left + rect.width/2;

      if(Math.abs(center - c) < 80){
        img.classList.add("active");
      }else{
        img.classList.remove("active");
      }
    });
  }

  document.querySelector(".product-gallery")
  ?.addEventListener("scroll",update);

  update();
}
