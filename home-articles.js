(function(){

const container=document.getElementById("article-list");

if(!container || typeof ARTICLES==="undefined") return;

const latest=ARTICLES.slice(0,3);

let html="";

latest.forEach(a=>{

html+=`
<a href="articles/${a.url}" class="product-card">

<h3>${a.title}</h3>

<p>${a.tags ? a.tags.join(" · ") : "龜鹿知識"}</p>

</a>
`;

});

container.innerHTML=html;

})();
