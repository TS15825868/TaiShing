(function(){

if(typeof ARTICLES==="undefined") return;

const container=document.getElementById("article-categories");

if(!container) return;

const categories={
culture:"龜鹿文化",
product:"龜鹿產品",
recipe:"龜鹿料理"
};

let html="";

Object.keys(categories).forEach(key=>{

html+=`

<a href="articles.html#${key}" class="product-card">

<h3>${categories[key]}</h3>

<p>查看相關文章</p>

</a>

`;

});

container.innerHTML=html;

})();
