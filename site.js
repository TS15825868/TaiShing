async function loadProducts(){

const res = await fetch("products.json")
const data = await res.json()

const grid = document.getElementById("productGrid")

if(!grid) return

data.products.forEach(p=>{

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

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

let html = ""

html += `<h2>${p.name}</h2>`

html += `<p>${p.description}</p>`

if(p.size){

html += `<h3>規格</h3>`

html += `<p>${p.size}</p>`

}

if(p.ingredients){

html += `<h3>成分</h3>`

html += `<p>${p.ingredients.join("、")}</p>`

}

html += `

<div style="margin-top:24px">

<a class="btn" href="https://lin.ee/sHZW7NkR" target="_blank">
LINE詢問
</a>

</div>

`

body.innerHTML = html

modal.style.display="flex"

}



function closeModal(){

document.getElementById("productModal").style.display="none"

}



function toggleMenu(){

document.getElementById("drawer").classList.toggle("open")

}



function closeMenu(){

document.getElementById("drawer").classList.remove("open")

}



document.addEventListener("DOMContentLoaded",loadProducts)
