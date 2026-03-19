(function(){

function getFile(){
  return location.pathname.split('/').pop();
}

// ===== 中文標題 =====
function zhTitle(file){
  const map = {

    "guilu-gao-how.html":"龜鹿膏怎麼吃",
    "guilu-gao-dose.html":"龜鹿膏吃多少",
    "guilu-gao-storage.html":"龜鹿膏保存方式",
    "guilu-gao-for-who.html":"龜鹿膏適合誰",
    "what-is-guilu.html":"什麼是龜鹿",

    "guilu-drink-guide.html":"龜鹿飲怎麼喝",
    "guilu-drink-time.html":"龜鹿飲什麼時候喝",
    "guilu-drink-storage.html":"龜鹿飲保存方式",
    "guilu-drink-for-who.html":"龜鹿飲適合誰",

    "guilu-block-how.html":"龜鹿湯塊怎麼煮",
    "guilu-block-storage.html":"龜鹿湯塊保存方式",

    "lurong-coffee.html":"鹿茸粉怎麼搭咖啡",
    "lurong-milk.html":"鹿茸粉怎麼搭牛奶",
    "lurong-tea.html":"鹿茸粉怎麼搭茶"
  };

  return map[file] || "補養知識";
}

// ===== 商品對應（自動推薦）=====
function getProductByFile(file){
  if(file.includes("gao")) return "guilu-gao";
  if(file.includes("drink")) return "guilu-drink";
  if(file.includes("block")) return "guilu-block";
  if(file.includes("lurong")) return "lurong-powder";
  return null;
}

// ===== 主流程 =====
document.addEventListener("DOMContentLoaded", ()=>{

  const file = getFile();
  const h1 = document.querySelector("h1");
  const main = document.querySelector("main");

  // 🔥 強制中文標題
  if(h1){
    h1.textContent = zhTitle(file);
  }

  // 🔥 自動商品推薦
  const productId = getProductByFile(file);

  let productBlock = "";

  if(productId){
    productBlock = `
    <div class="info-card center">

      <h2>推薦搭配</h2>

      <a href="../product.html?id=${productId}" class="btn btn-dark">
        查看相關產品
      </a>

    </div>
    `;
  }

  // 🔥 成交 CTA（全站統一）
  const cta = `
  <section class="cta" style="margin-top:60px">

    <h2>不確定怎麼搭配？</h2>

    <p style="margin-bottom:20px;">
      告訴我們你的需求，幫你配好最適合的組合
    </p>

    <a href="https://lin.ee/sHZW7NkR?text=${encodeURIComponent('幫我搭配適合的龜鹿產品')}"
    class="btn btn-line">
      👉 免費幫我推薦
    </a>

  </section>
  `;

  // 🔥 插入
  if(main){
    main.insertAdjacentHTML("beforeend", productBlock + cta);
  }

});

})();
