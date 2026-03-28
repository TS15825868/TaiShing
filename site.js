document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initScroll();
  loadProducts();
});

/* 漢堡選單 */
function initMenu() {
  const menu = document.getElementById("menu");
  const btn = document.getElementById("menu-btn");
  if (!menu || !btn) return;

  menu.innerHTML = `
    <div class="menu-inner">
      <a href="index.html">首頁</a>
      <a href="products.html">龜鹿系列</a>
      <a href="guide.html">怎麼使用</a>
      <a href="recipes.html">料理搭配</a>
      <a href="brand.html">品牌故事</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">聯絡</a>
      <a href="knowledge.html">補養觀點</a>
      <a href="videos.html">日常影片</a>
      <a href="recommend.html">怎麼選</a>
    </div>
  `;

  btn.onclick = (event) => {
    event.stopPropagation();
    menu.classList.toggle("open");
  };

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      menu.classList.remove("open");
    }
  });
}

/* Scroll Reveal（含動態內容） */
function initScroll() {
  window.addEventListener("scroll", revealAll);
  revealAll();
}

function revealAll() {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}

/* 產品 */
function loadProducts() {
  const container =
    document.getElementById("product-scroll") ||
    document.getElementById("product-list");

  if (!container) return;

  fetch(`data.json?v=${Date.now()}`)
    .then((response) => response.json())
    .then((data) => renderProducts(data.products || []))
    .catch(() => {
      container.innerHTML = '<p class="empty">產品資料載入失敗，請稍後再試。</p>';
    });
}

function normalizeProduct(product) {
  const image = product.image || (Array.isArray(product.images) ? product.images[0] : "");
  const description = product.description || product.desc || "";
  const ingredients =
    product.ingredients ||
    (typeof product.ingredient === "string"
      ? product.ingredient.split("、").map((item) => item.trim()).filter(Boolean)
      : []);
  const usage = Array.isArray(product.usage) ? product.usage : [];
  const size = product.size || product.spec || "";

  return {
    ...product,
    image,
    description,
    ingredients,
    usage,
    size
  };
}

function renderProducts(products) {
  const container =
    document.getElementById("product-scroll") ||
    document.getElementById("product-list");

  if (!container) return;

  container.innerHTML = "";

  products.map(normalizeProduct).forEach((product) => {
    const card = document.createElement("div");
    card.className = "card reveal";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;

    card.onclick = () => openModal(product);
    container.appendChild(card);
  });

  revealAll();
}

/* Modal */
function openModal(product) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = "";

  const ingredients = product.ingredients || [];
  const usage = product.usage || [];

  content.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}">
    <p>${product.description}</p>

    <h4>成分</h4>
    <ul>${ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>

    <h4>使用方式</h4>
    <ul>${usage.map((item) => `<li>${item}</li>`).join("")}</ul>

    <p>${product.size}</p>

    <a class="btn-line" href="https://lin.ee/sHZW7NkR" target="_blank" rel="noopener">LINE 諮詢</a>
  `;

  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("show");
}
