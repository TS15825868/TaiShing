const data = {
  "guilu-gao":{
    name:"龜鹿膏",
    image:"images/guilu-gao-100g.jpg",
    desc:"適合日常補養，建立穩定節奏。",
    spec:"100g / 罐｜$2000",
    ingredients:["龜板萃取物","鹿角萃取物","粉光蔘","枸杞","紅棗","黃耆"]
  },

  "guilu-drink":{
    name:"龜鹿飲",
    image:"images/guilu-drink.jpg",
    desc:"方便快速補充。",
    spec:"180cc / 包 $200｜30cc / 罐 $100",
    ingredients:["水","龜板萃取物","鹿角萃取物"]
  },

  "guilu-block":{
    name:"龜鹿湯塊",
    image:"images/guilu-block.jpg",
    desc:"適合燉湯進補。",
    spec:"600g $8000｜300g $4000｜75g $2000",
    ingredients:["龜板萃取物","鹿角萃取物"]
  },

  "lurong-powder":{
    name:"鹿茸粉",
    image:"images/lurong.jpg",
    desc:"可加入飲品使用。",
    spec:"75g / 罐 $2000",
    ingredients:["鹿茸"]
  }
};

const params = new URLSearchParams(location.search);
const id = params.get("id") || "guilu-gao";
const p = data[id];

document.getElementById("product-image").src = p.image;
document.getElementById("product-title").innerText = p.name;
document.getElementById("product-desc").innerText = p.desc;
document.getElementById("product-spec").innerText = p.spec;

const ul = document.getElementById("product-ingredients");
p.ingredients.forEach(i=>{
  const li = document.createElement("li");
  li.innerText = i;
  ul.appendChild(li);
});

document.getElementById("btn-order").href =
  `https://lin.ee/sHZW7NkR?text=我要購買${p.name}`;

document.getElementById("btn-line").href =
  `https://lin.ee/sHZW7NkR?text=幫我搭配${p.name}`;
