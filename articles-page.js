(function(){

const culture=document.getElementById("culture-grid");
const product=document.getElementById("product-grid");
const recipe=document.getElementById("recipe-grid");

if(typeof ARTICLES==="undefined") return;

ARTICLES.forEach(a=>{

const card=`

<a href="articles/${a.url}" class="product-card">

<img src="${a.image}" loading="lazy">

<h3>${a.title}</h3>

<p>${a.summary || "龜鹿知識"}</p>

</a>

`;

if(a.category==="culture" && culture){
culture.insertAdjacentHTML("beforeend",card);
}

if(a.category==="product" && product){
product.insertAdjacentHTML("beforeend",card);
}

if(a.category==="recipe" && recipe){
recipe.insertAdjacentHTML("beforeend",card);
}

});

})();
