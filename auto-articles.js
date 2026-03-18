const fs = require("fs");

/* =========================
50篇（中文標題 + 英文slug）
========================= */

const topics = [

{title:"龜鹿是什麼",slug:"what-is-guilu"},
{title:"龜鹿膏怎麼吃",slug:"guilu-gao-how"},
{title:"龜鹿飲什麼時候喝",slug:"guilu-drink-time"},
{title:"龜鹿湯塊怎麼用",slug:"guilu-block-how"},
{title:"鹿茸粉怎麼吃",slug:"lurong-powder-how"},

{title:"龜鹿怎麼搭配",slug:"guilu-combination"},
{title:"龜鹿日常怎麼吃",slug:"guilu-daily-use"},
{title:"龜鹿早餐搭配",slug:"guilu-breakfast"},
{title:"龜鹿晚上可以吃嗎",slug:"guilu-night"},
{title:"龜鹿怎麼選",slug:"guilu-choose"},

{title:"龜鹿飲保存方式",slug:"guilu-drink-storage"},
{title:"龜鹿膏保存方式",slug:"guilu-gao-storage"},
{title:"龜鹿料理有哪些",slug:"guilu-recipes"},
{title:"龜鹿雞湯做法",slug:"guilu-chicken-soup"},
{title:"龜鹿排骨湯怎麼煮",slug:"guilu-pork-soup"},

{title:"鹿茸粉加咖啡",slug:"lurong-coffee"},
{title:"鹿茸粉加牛奶",slug:"lurong-milk"},
{title:"鹿茸粉加茶",slug:"lurong-tea"},
{title:"龜鹿補養方式",slug:"guilu-health"},
{title:"龜鹿飲用方式整理",slug:"guilu-drink-guide"},

{title:"龜鹿產品差別",slug:"guilu-difference"},
{title:"龜鹿膏適合誰",slug:"guilu-gao-for-who"},
{title:"龜鹿飲適合誰",slug:"guilu-drink-for-who"},
{title:"龜鹿湯塊怎麼煮",slug:"guilu-block-cooking"},
{title:"鹿茸粉怎麼搭配",slug:"lurong-combination"},

{title:"龜鹿雞湯多久喝一次",slug:"guilu-chicken-frequency"},
{title:"龜鹿湯塊比例怎麼抓",slug:"guilu-block-ratio"},
{title:"龜鹿日常補養習慣",slug:"guilu-daily-habit"},
{title:"龜鹿料理快速上手",slug:"guilu-cooking-fast"},
{title:"龜鹿補養入門",slug:"guilu-beginner"},

{title:"龜鹿飲什麼時間喝最好",slug:"guilu-drink-best-time"},
{title:"龜鹿膏可以加熱嗎",slug:"guilu-gao-heat"},
{title:"龜鹿湯塊怎麼保存",slug:"guilu-block-storage"},
{title:"鹿茸粉可以天天喝嗎",slug:"lurong-daily"},
{title:"龜鹿適合什麼族群",slug:"guilu-group"},

{title:"龜鹿膏一天吃多少",slug:"guilu-gao-dose"},
{title:"龜鹿飲怎麼保存",slug:"guilu-drink-save"},
{title:"龜鹿湯塊可以冷凍嗎",slug:"guilu-block-freeze"},
{title:"鹿茸粉保存方式",slug:"lurong-storage"},
{title:"龜鹿料理推薦",slug:"guilu-food-recommend"},

{title:"龜鹿雞湯懶人做法",slug:"guilu-chicken-easy"},
{title:"龜鹿排骨湯做法",slug:"guilu-pork-recipe"},
{title:"鹿茸粉咖啡怎麼泡",slug:"lurong-coffee-how"},
{title:"鹿茸粉牛奶比例",slug:"lurong-milk-ratio"},
{title:"鹿茸粉茶怎麼搭",slug:"lurong-tea-how"},

{title:"龜鹿日常飲食搭配",slug:"guilu-diet"},
{title:"龜鹿補養節奏",slug:"guilu-routine"},
{title:"龜鹿飲與膏差別",slug:"guilu-drink-vs-gao"},
{title:"龜鹿湯塊與膏差別",slug:"guilu-block-vs-gao"},
{title:"鹿茸粉與龜鹿差別",slug:"lurong-vs-guilu"}

];

/* =========================
建立文章
========================= */

function createArticle(item){

const {title, slug} = item;

const html = `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}｜仙加味</title>
<meta name="description" content="${title}完整整理與日常搭配方式">
<link rel="stylesheet" href="../site.css">
</head>

<body>

<header class="header">
<a href="../index.html" class="logo">
<img src="../images/logo-seal.png">
<span>仙加味</span>
</a>
<div class="menu-btn">☰</div>
</header>

<div id="menuOverlay" class="menu-overlay"></div>

<main class="section" style="max-width:800px;">

<h1>${title}</h1>

<p>${title}可以從日常飲食角度建立補養節奏。</p>

<h2>怎麼做比較好？</h2>
<p>建議從少量開始，依生活習慣調整。</p>

<h2>日常搭配</h2>
<p>可搭配龜鹿膏、龜鹿飲或鹿茸粉。</p>

<div style="margin:40px 0;text-align:center;">
<a href="https://lin.ee/sHZW7NkR" class="btn btn-dark">LINE詢問</a>
</div>

</main>

<a class="floating-line" href="https://lin.ee/sHZW7NkR">LINE詢問</a>

<script src="../articles-data.js"></script>
<script src="../site.js"></script>

</body>
</html>`;

fs.writeFileSync(`articles/${slug}.html`, html);

return {
title,
url: `${slug}.html`
};

}

/* 執行 */

const articles = topics.map(createArticle);

fs.writeFileSync("articles-data.js",
`const ARTICLES = ${JSON.stringify(articles,null,2)};`
);

console.log("✅ 50篇（英文URL）已完成");
