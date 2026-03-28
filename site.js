let DATA = {};

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("data.json");
  DATA = await res.json();

  renderHeader();
  renderFloatingCTA();
  renderPage();
  scrollCTA();
});

/* HEADER */
function renderHeader(){
  document.getElementById("header").innerHTML = `
  <header class="header">
    <div class="logo" onclick="go('index.html')">${DATA.brand.name}</div>
    <div class="menu-btn" onclick="toggleMenu()">☰</div>
  </header>

  <nav id="menu">
    <a href="index.html">首頁</a>
    <a href="products.html">產品</a>
    <a href="recommend.html">怎麼選</a>
    <a href="guide.html">使用方式</a>
    <a href="recipes.html">料理</a>
    <a href="knowledge.html">觀點</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">聯絡</a>
  </nav>
  `;
}

function toggleMenu(){
  const m = document.getElementById("menu");
  m.classList.toggle("show");
}

function go(url){ location.href = url }

/* LINE */
function goLINE(text){
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
  window.open(url);
}

/* 浮動CTA */
function renderFloatingCTA(){
  document.body.insertAdjacentHTML("beforeend",`
    <div class="line-float" onclick="goLINE('我想了解適合我的方式')">
      LINE
    </div>
  `);
}

/* 滾動CTA */
function scrollCTA(){
  window.addEventListener("scroll",()=>{
    if(window.scrollY > 400){
      document.body.classList.add("show-cta");
    }
  });
}

/* 主渲染 */
function renderPage(){
  const page = document.body.dataset.page;
  const el = document.getElementById("content");

  if(page==="index"){
    el.innerHTML = `
      <h1>${DATA.brand.slogan}</h1>
      <p>${DATA.brand.intro}</p>

      ${DATA.home.sections.map(s=>`
        <div class="block">
          <h2>${s.title}</h2>
          <p>${s.text}</p>
        </div>
      `).join("")}

      <button onclick="goLINE('幫我推薦適合的')">讓我幫你選</button>
    `;
  }

  if(page==="products"){
    el.innerHTML = DATA.products.map(p=>`
      <div class="card" onclick="goLINE('我想了解【${p.name}】')">
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
        <p class="scene">${p.scene}</p>
        <ul>${p.usage.map(u=>`<li>${u}</li>`).join("")}</ul>
        <button>了解更多</button>
      </div>
    `).join("");
  }

  if(page==="recommend"){
    el.innerHTML = DATA.recommend.map(r=>`
      <div class="card" onclick="goLINE('我想找${r.title}')">
        <h2>${r.title}</h2>
        <p>${r.desc}</p>
        <button>推薦我</button>
      </div>
    `).join("");
  }

  if(page==="recipes"){
    el.innerHTML = DATA.recipes.map(r=>`
      <div class="card">
        <h2>${r.title}</h2>
        <p>${r.desc}</p>
      </div>
    `).join("");
  }

  if(page==="knowledge"){
    el.innerHTML = DATA.knowledge.map(k=>`
      <div class="block">
        <h2>${k.title}</h2>
        <p>${k.text}</p>
      </div>
    `).join("");
  }

  if(page==="faq"){
    el.innerHTML = DATA.faq.map(f=>`
      <div class="faq">
        <h3>${f.q}</h3>
        <p>${f.a}</p>
      </div>
    `).join("");
  }

  if(page==="contact"){
    el.innerHTML = `
      <h1>${DATA.contact.title}</h1>
      <p>${DATA.contact.desc}</p>
      <button onclick="goLINE('我要諮詢')">LINE 諮詢</button>
    `;
  }
}
