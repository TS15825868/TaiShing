(function(){

if(!location.pathname.includes("/articles/")) return;

const main=document.querySelector("main");

if(!main) return;

const articles=[

{
title:"什麼是龜鹿",
url:"what-is-guilu.html",
category:"knowledge"
},

{
title:"龜鹿怎麼吃",
url:"how-to-eat-guilu.html",
category:"eat"
},

{
title:"鹿茸粉怎麼吃",
url:"lurong-how.html",
category:"eat"
},

{
title:"鹿茸牛奶",
url:"lurong-milk.html",
category:"drink"
},

{
title:"鹿茸咖啡",
url:"lurong-coffee.html",
category:"drink"
},

{
title:"鹿茸茶",
url:"lurong-tea.html",
category:"drink"
},

{
title:"龜鹿雞湯",
url:"guilu-chicken-soup.html",
category:"recipe"
},

{
title:"龜鹿燉排骨",
url:"guilu-pork-ribs.html",
category:"recipe"
},

{
title:"龜鹿藥膳湯",
url:"guilu-herbal-soup.html",
category:"recipe"
}

];

const current=location.pathname.split("/").pop();

let html=`<section class="section">

<h2 class="center">相關閱讀</h2>

<div class="product-grid">`;

articles.forEach(a=>{

if(a.url!==current){

html+=`

<a href="${a.url}" class="product-card">

<h3>${a.title}</h3>

</a>

`;

}

});

html+=`</div></section>`;

main.insertAdjacentHTML("beforeend",html);

})();
