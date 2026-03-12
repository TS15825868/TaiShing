async function loadProducts(){

const res = await fetch("products.json")
const data = await res.json()

const grid = document.getElementById("productGrid")

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



function openProduct(id){

fetch("products.json")

.then(res=>res.json())

.then(data=>{

const p = data.products.find(x=>x.id===id)

alert(

p.name + "\n\n" +
p.description + "\n\n" +
"規格：" + (p.size||"")

)

})

}


document.addEventListener("DOMContentLoaded",loadProducts)



function toggleMenu(){

document.getElementById("drawer")
.classList.toggle("open")

}

function closeMenu(){

document.getElementById("drawer")
.classList.remove("open")

}
