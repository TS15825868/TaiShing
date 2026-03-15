(function(){

if(!location.pathname.includes("/articles/")) return;

const current=location.pathname.split("/").pop();

const index=ARTICLES.findIndex(a=>a.url===current);

if(index===-1) return;

const article=ARTICLES[index];

const container=document.querySelector("article");

if(!container) return;


/* =========================
Breadcrumb
========================= */

const breadcrumb=`

<div class="breadcrumb">

<a href="../index.html">首頁</a>

<span>/</span>

<a href="../articles.html">龜鹿知識</a>

<span>/</span>

${article.title}

</div>

`;

container.insertAdjacentHTML("afterbegin",breadcrumb);


/* =========================
Tags
========================= */

if(article.tags && article.tags.length){

let tagHTML=`<div class="article-tags">`;

article.tags.forEach(tag=>{

tagHTML+=`<span>${tag}</span>`;

});

tagHTML+=`</div>`;

container.insertAdjacentHTML("beforeend",tagHTML);

}


/* =========================
Prev Next
========================= */

let navHTML=``;

if(index>0 || index<ARTICLES.length-1){

navHTML=`<div class="article-nav">`;

if(index>0){

navHTML+=`

<a class="prev" href="${ARTICLES[index-1].url}">

上一篇<br>

<strong>${ARTICLES[index-1].title}</strong>

</a>

`;

}

if(index<ARTICLES.length-1){

navHTML+=`

<a class="next" href="${ARTICLES[index+1].url}">

下一篇<br>

<strong>${ARTICLES[index+1].title}</strong>

</a>

`;

}

navHTML+=`</div>`;

container.insertAdjacentHTML("beforeend",navHTML);

}


/* =========================
相關文章推薦
========================= */

if(article.tags){

let related=ARTICLES.filter(a=>{

return a.url!==article.url &&
a.tags &&
a.tags.some(tag=>article.tags.includes(tag));

}).slice(0,3);

if(related.length){

let html=`

<h2 style="margin-top:60px">相關文章</h2>

<div class="product-grid">

`;

related.forEach(a=>{

html+=`

<a href="${a.url}" class="product-card">

<h3>${a.title}</h3>

<p>${a.summary||""}</p>

</a>

`;

});

html+=`</div>`;

container.insertAdjacentHTML("beforeend",html);

}

}


/* =========================
Article Schema
========================= */

const schema={

"@context":"https://schema.org",

"@type":"Article",

"headline":article.title,

"description":article.summary||"",

"author":{

"@type":"Organization",

"name":"仙加味"

},

"publisher":{

"@type":"Organization",

"name":"仙加味",

"logo":{

"@type":"ImageObject",

"url":"https://ts15825868.github.io/xianjiawei/images/logo-seal.png"

}

},

"mainEntityOfPage":location.href

};

const script=document.createElement("script");

script.type="application/ld+json";

script.text=JSON.stringify(schema);

document.head.appendChild(script);

})();
