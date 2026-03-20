(function(){

const id = new URLSearchParams(location.search).get('id');

fetch('./products.json')
.then(r=>r.json())
.then(data=>{

const product = data.products.find(p=>p.id===id) || data.products[0];

document.getElementById('product-image').src = product.image;
document.getElementById('product-title').textContent = product.name;

document.getElementById('product-summary').textContent =
product.desc + "，適合日常補養使用。";

document.getElementById('product-sizes').textContent =
product.sizes.join(' / ');

document.getElementById('product-package').textContent =
product.package;

document.getElementById('product-line').href =
`https://lin.ee/sHZW7NkR?text=${encodeURIComponent(`我想了解${product.name}搭配`)}`;

document.getElementById('product-ingredients').innerHTML =
product.ingredients.map(i=>`<li>${i}</li>`).join('');

document.getElementById('product-uses').innerHTML =
product.uses.map(i=>`<li>${i}</li>`).join('');

});

})();
