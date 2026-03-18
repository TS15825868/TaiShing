const fs = require("fs");
const path = require("path");

const outputDir = "./articles";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const topics = [
"龜鹿是什麼",
"龜鹿膏怎麼吃",
"龜鹿飲什麼時候喝",
"龜鹿湯塊怎麼用",
"鹿茸粉怎麼吃",
"龜鹿膏可以每天吃嗎",
"龜鹿飲適合什麼時候",
"龜鹿湯塊怎麼煮雞湯",
"鹿茸粉可以加咖啡嗎",
"龜鹿怎麼搭配",
"龜鹿飲外出怎麼帶",
"龜鹿膏保存方式",
"龜鹿湯塊保存方法",
"鹿茸粉保存方式",
"龜鹿飲要加熱嗎",
"龜鹿膏怎麼沖泡",
"龜鹿料理有哪些",
"龜鹿燉湯方法",
"龜鹿日常怎麼吃",
"龜鹿入門怎麼選",
"龜鹿膏與龜鹿飲差別",
"龜鹿飲與湯塊差別",
"龜鹿粉怎麼用",
"龜鹿早餐怎麼搭",
"龜鹿晚上可以吃嗎",
"龜鹿膏份量怎麼抓",
"龜鹿飲一次喝多少",
"龜鹿湯塊比例",
"鹿茸粉加牛奶",
"鹿茸粉加茶",
"龜鹿日常補養方式",
"龜鹿飲怎麼帶出門",
"龜鹿膏搭配茶",
"龜鹿膏搭配咖啡",
"龜鹿湯塊雞湯作法",
"龜鹿排骨湯作法",
"鹿茸粉咖啡比例",
"龜鹿產品怎麼挑",
"龜鹿膏適合族群",
"龜鹿飲適合族群",
"龜鹿湯塊適合族群",
"鹿茸粉適合族群",
"龜鹿飲30cc差別",
"龜鹿飲180cc差別",
"龜鹿膏與粉差別",
"龜鹿食用時間",
"龜鹿料理推薦",
"龜鹿飲用方式整理",
"龜鹿完整指南"
];

function template(title){

return `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${title}｜仙加味</title>
<meta name="description" content="${title}與日常飲食方式整理">

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

<main>

<article class="section">

<h1>${title}</h1>

<p>
${title}是許多人會關心的問題，以下整理常見方式。
</p>

<h2>怎麼使用</h2>
<p>可依日常飲食習慣調整。</p>

<h2>怎麼搭配</h2>
<p>可搭配龜鹿膏、龜鹿飲或湯塊。</p>

<h2>延伸建議</h2>
<p>建議從小量開始，找到適合自己的方式。</p>

<div style="margin-top:30px;text-align:center;">
<a href="../product.html?id=guilu-gao" class="btn">看龜鹿膏</a>
<a href="https://lin.ee/sHZW7NkR" class="btn btn-dark">LINE詢問</a>
</div>

</article>

</main>

<footer class="footer">
<div class="footer-bottom">© 仙加味</div>
</footer>

<script src="../site.js"></script>

</body>
</html>`;

}

topics.forEach((title,i)=>{

const fileName = title
.replaceAll(" ","-")
.replaceAll("？","")
.replaceAll("怎麼","")
.replaceAll("可以","")
.replaceAll("與","")
.replaceAll("、","")
.toLowerCase();

const filePath = path.join(outputDir, fileName + ".html");

fs.writeFileSync(filePath, template(title));

});

console.log("✅ 已生成文章完成！");
