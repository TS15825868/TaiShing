let products = [];

fetch("data/products.json")
.then(res => res.json())
.then(data => {
  products = data;
  renderProducts();
});

function renderProducts(){
  const container = document.getElementById("product-list");

  products.forEach(p => {
    container.innerHTML += `
    <div class="card" onclick="openProduct('${p.id}')">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
    </div>`;
  });
}

function openProduct(id){
  const p = products.find(x => x.id === id);
  const modal = document.getElementById("modal");

  modal.innerHTML = `
  <div class="modal-box">

    <div onclick="closeModal()" style="cursor:pointer;margin-bottom:10px;">✕ 關閉</div>

    <h2>${p.name}</h2>

    ${p.images.map(img => `<img src="${img}">`).join("")}

    <p>${p.desc}</p>

    <h4>成分</h4>
    <p>${p.ingredients.join("、")}</p>

    <h4>使用方式</h4>
    <p>${p.usage.join("<br>")}</p>

    <a href="https://lin.ee/sHZW7NkR" class="btn">LINE詢問</a>

  </div>
  `;

  modal.style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}
