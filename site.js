function toggleMenu(){
  document.getElementById("drawer").classList.toggle("open")
}

async function loadProducts(){

  const res = await fetch("products.json")
  const data = await res.json()

  const grid = document.getElementById("productGrid")

  if(!grid) return

  data.products.forEach(p=>{

    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <button class="btn" onclick="openProduct('${p.id}')">
      查看
      </button>
    `

    grid.appendChild(card)

  })

}

async function openProduct(id){

  const res = await fetch("products.json")
  const data = await res.json()

  const p = data.products.find(x=>x.id===id)

  const modal = document.getElementById("productModal")
  const body = document.getElementById("modalBody")

  body.innerHTML = `
    <h2>${p.name}</h2>
    <p>${p.description}</p>

    <h4>成分</h4>
    <ul>
    ${p.ingredients.map(i=>`<li>${i}</li>`).join("")}
    </ul>

    <h4>使用方式</h4>
    <ul>
    ${p.usage.map(i=>`<li>${i}</li>`).join("")}
    </ul>
  `

  modal.classList.add("show")

}

function closeModal(){
  document.getElementById("productModal").classList.remove("show")
}

function recommendProduct(){

  const use = document.getElementById("useType").value
  const habit = document.getElementById("habitType").value
  const drink = document.getElementById("drinkType").value

  const result = document.getElementById("recommendResult")

  let recommend = ""

  if(use === "eat"){
    recommend = "龜鹿膏"
  }
  else if(use === "drink"){
    recommend = "龜鹿飲"
  }
  else if(use === "cook"){
    recommend = "龜鹿湯塊"
  }
  else if(use === "mix"){
    recommend = "鹿茸粉 或 龜鹿調飲粉"
  }

  if(!use){
    recommend = "請先選擇使用方式"
  }

  result.innerHTML = `
    <div class="card">
      <h3>推薦型態</h3>
      <p style="font-size:22px;font-weight:600;margin-top:10px">
      ${recommend}
      </p>

      <a class="btn" href="guilu-series.html">
      查看產品
      </a>
    </div>
  `

}

document.addEventListener("DOMContentLoaded",loadProducts)
