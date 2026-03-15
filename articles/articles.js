const ARTICLES = [

{
title:"什麼是龜鹿",
url:"what-is-guilu.html",
category:"knowledge",
tags:["龜鹿","龜鹿文化"]
},

{
title:"龜鹿怎麼吃",
url:"how-to-eat-guilu.html",
category:"eat",
tags:["龜鹿","食用方式"]
},

{
title:"鹿茸粉怎麼吃",
url:"lurong-how.html",
category:"drink",
tags:["鹿茸","飲品"]
},

{
title:"鹿茸牛奶",
url:"lurong-milk.html",
category:"drink",
tags:["鹿茸","牛奶"]
},

{
title:"鹿茸咖啡",
url:"lurong-coffee.html",
category:"drink",
tags:["鹿茸","咖啡"]
},

{
title:"鹿茸茶",
url:"lurong-tea.html",
category:"drink",
tags:["鹿茸","茶"]
},

{
title:"龜鹿雞湯",
url:"guilu-chicken-soup.html",
category:"recipe",
tags:["龜鹿","雞湯"]
},

{
title:"龜鹿燉排骨",
url:"guilu-pork-ribs.html",
category:"recipe",
tags:["龜鹿","排骨"]
},

{
title:"龜鹿藥膳湯",
url:"guilu-herbal-soup.html",
category:"recipe",
tags:["龜鹿","藥膳"]
}

];


/* =========================
文章工具
========================= */

/* 取得文章 */

function getArticle(url){

return ARTICLES.find(a=>a.url===url);

}


/* 上一篇 */

function getPrevArticle(index){

if(index>0) return ARTICLES[index-1];

return null;

}


/* 下一篇 */

function getNextArticle(index){

if(index<ARTICLES.length-1) return ARTICLES[index+1];

return null;

}


/* 同分類文章 */

function getRelatedArticles(article){

return ARTICLES.filter(a=>

a.category===article.category &&
a.url!==article.url

).slice(0,3);

}


/* 分類文章 */

function getCategoryArticles(category){

return ARTICLES.filter(a=>a.category===category);

}
