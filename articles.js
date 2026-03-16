const ARTICLES = [

/* =========================
龜鹿文化
========================= */

{
title:"龜鹿是什麼",
url:"what-is-guilu.html",
category:"culture",
summary:"介紹龜板與鹿角在飲食文化中的來源與演變。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-01",
popular:true,
tags:["龜鹿","文化"]
},

{
title:"龜鹿文化的歷史",
url:"guilu-history.html",
category:"culture",
summary:"從傳統燉湯到現代飲食文化的龜鹿演變。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-02",
tags:["龜鹿","文化"]
},

{
title:"鹿茸是什麼",
url:"deer-antler-what.html",
category:"culture",
summary:"介紹鹿茸來源與鹿角差異。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-03",
popular:true,
tags:["鹿茸"]
},

{
title:"龜鹿飲食文化",
url:"guilu-food-culture.html",
category:"culture",
summary:"龜鹿食材在傳統飲食文化中的角色。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-04",
tags:["龜鹿","文化"]
},

{
title:"龜鹿文化在現代",
url:"guilu-modern.html",
category:"culture",
summary:"龜鹿從傳統藥膳到現代飲食的轉變。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-05",
tags:["龜鹿","文化"]
},

{
title:"龜鹿與養生飲食",
url:"guilu-health-food.html",
category:"culture",
summary:"龜鹿食材在日常飲食中的文化背景。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-06",
tags:["龜鹿"]
},

{
title:"鹿角與鹿茸差別",
url:"deer-antler-diff.html",
category:"culture",
summary:"鹿角與鹿茸在來源與用途上的差異。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-07",
tags:["鹿茸"]
},

/* =========================
產品
========================= */

{
title:"龜鹿膏怎麼吃",
url:"guilu-gao-how.html",
category:"product",
summary:"整理龜鹿膏的日常食用方式。",
image:"images/guilu-gao-100g.jpg",
date:"2024-01-08",
popular:true,
tags:["龜鹿膏"]
},

{
title:"龜鹿飲怎麼喝",
url:"guilu-drink-how.html",
category:"product",
summary:"龜鹿飲的飲用方式與搭配。",
image:"images/guilu-drink-180cc.jpg",
date:"2024-01-09",
tags:["龜鹿飲"]
},

{
title:"龜鹿湯塊怎麼用",
url:"guilu-block-how.html",
category:"product",
summary:"龜鹿湯塊適合燉湯料理。",
image:"images/guilu-block-75g.jpg",
date:"2024-01-10",
tags:["龜鹿湯塊"]
},

{
title:"鹿茸粉怎麼搭配",
url:"deer-powder-how.html",
category:"product",
summary:"鹿茸粉可以加入咖啡、牛奶或茶。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-11",
tags:["鹿茸粉"]
},

{
title:"龜鹿產品怎麼選",
url:"how-to-choose-guilu.html",
category:"product",
summary:"龜鹿膏、龜鹿飲與湯塊的差異。",
image:"images/hero-guilu-gao.jpg",
date:"2024-01-12",
tags:["龜鹿"]
},

/* =========================
料理
========================= */

{
title:"龜鹿雞湯",
url:"guilu-chicken-soup.html",
category:"recipe",
summary:"龜鹿湯塊搭配雞肉燉煮的料理。",
image:"images/guilu-block-75g.jpg",
date:"2024-01-13",
popular:true,
tags:["龜鹿料理"]
},

{
title:"龜鹿燉排骨",
url:"guilu-pork-ribs.html",
category:"recipe",
summary:"龜鹿湯塊搭配排骨燉湯。",
image:"images/guilu-block-75g.jpg",
date:"2024-01-14",
tags:["龜鹿料理"]
},

{
title:"龜鹿藥膳湯",
url:"guilu-herbal-soup.html",
category:"recipe",
summary:"龜鹿與藥膳食材搭配的燉湯。",
image:"images/guilu-block-75g.jpg",
date:"2024-01-15",
tags:["龜鹿料理"]
},

{
title:"鹿茸咖啡",
url:"deer-coffee.html",
category:"recipe",
summary:"鹿茸粉加入咖啡的飲品方式。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-16",
tags:["鹿茸"]
},

{
title:"鹿茸牛奶",
url:"deer-milk.html",
category:"recipe",
summary:"鹿茸粉加入牛奶的飲品方式。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-17",
tags:["鹿茸"]
},

{
title:"鹿茸茶飲",
url:"deer-tea.html",
category:"recipe",
summary:"鹿茸粉加入茶飲的飲用方式。",
image:"images/lurong-powder-75g.jpg",
date:"2024-01-18",
tags:["鹿茸"]
}

];

/* =========================
自動排序（最新文章）
========================= */

ARTICLES.sort((a,b)=>{
return new Date(b.date) - new Date(a.date);
});
