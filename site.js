// ===== menu =====
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

// 點外面關閉
document.addEventListener("click", function(e){
  const menu = document.getElementById("menu");
  const btn = document.querySelector(".menu-btn");

  if(!menu || !btn) return;

  if(!menu.contains(e.target) && !btn.contains(e.target)){
    menu.classList.remove("active");
  }
});

// ===== products =====
let productsData = [];
let currentIndex = 0;

fetch("data/products.json")
.then(res=>res.json())
.then(data=>{
  productsData = data;
  renderProducts(data);
});

function renderProducts(data){
  const el = document.getElementById("product-list");
  if(!el) return;

  el.innerHTML = data.map((p,i)=>`
    <div class="product-card" onclick="openModal(${i})">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
    </div>
  `).join("");
}

// ===== modal =====
function openModal(index){
  currentIndex = index;
  const p = productsData[index];

  document.getElementById("modal").style.display="flex";

  document.getElementById("modal-body").innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.image}">
    <p>${p.desc}</p>

    <h3>適合這樣的你</h3>
    <ul>${p.target.map(t=>`<li>${t}</li>`).join("")}</ul>

    <h3>使用方式</h3>
    <ul>${p.usage.map(u=>`<li>${u}</li>`).join("")}</ul>

    <div style="margin-top:15px;text-align:center;">
      <a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent(p.lineText)}"
      class="btn btn-line">
      LINE詢問
      </a>
    </div>

    <div style="margin-top:10px;text-align:center;">
      <button onclick="prevProduct()">← 上一個</button>
      <button onclick="nextProduct()">下一個 →</button>
    </div>
  `;
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}

function prevProduct(){
  currentIndex = (currentIndex - 1 + productsData.length) % productsData.length;
  openModal(currentIndex);
}

function nextProduct(){
  currentIndex = (currentIndex + 1) % productsData.length;
  openModal(currentIndex);
}
