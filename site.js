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

let text = p.name + "\n\n"

text += p.description + "\n\n"

if(p.size){
text += "規格：" + p.size + "\n"
}

if(p.ingredients){
text += "\n成分：\n" + p.ingredients.join("、")
}

if(p.price){

text += "\n\n優惠：\n"

text += "單罐 $" + p.price.single + "\n"

if(p.price.two){
text += "2罐 $" + p.price.two + "\n"
}

if(p.price.three_avg){
text += "3罐以上平均 $" + p.price.three_avg
}

}

alert(text)

}



function toggleMenu(){

document.getElementById("drawer")
.classList.toggle("open")

}

function closeMenu(){

document.getElementById("drawer")
.classList.remove("open")

}



document.addEventListener("DOMContentLoaded",loadProducts)
