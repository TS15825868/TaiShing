
async function loadProducts() {
  const res = await fetch("products.json");
  return res.json();
}
function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "仙加味 " + product.name,
    "image": ["https://ts15825868.github.io/TaiShing/" + product.image],
    "description": product.summary,
    "brand": {"@type":"Brand","name":"仙加味"},
    "size": product.sizes.join(" / ")
  };
}
(async function() {
  const root = document.getElementById("productPage");
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "guilu-gao";
  const data = await loadProducts();
  const product = data.products.find((p) => p.id === id) || data.products[0];

  document.title = product.name + "｜仙加味";
  const title = document.getElementById("productTitle");
  const summary = document.getElementById("productSummary");
  const image = document.getElementById("productImage");
  const sizes = document.getElementById("productSizes");
  const pack = document.getElementById("productPackage");
  const uses = document.getElementById("productUses");
  const recipes = document.getElementById("productRecipes");
  const lineBtn = document.getElementById("lineProductBtn");

  if (title) title.textContent = product.name;
  if (summary) summary.textContent = product.summary;
  if (image) {
    image.src = product.image;
    image.alt = "仙加味 " + product.name;
  }
  if (sizes) sizes.textContent = product.sizes.join(" / ");
  if (pack) pack.textContent = product.package;
  if (uses) uses.innerHTML = product.uses.map((x) => "<li>" + x + "</li>").join("");
  if (recipes) recipes.innerHTML = product.recipes.map((x) => "<li>" + x + "</li>").join("");
  if (lineBtn) lineBtn.href = "https://lin.ee/sHZW7NkR";

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(productSchema(product));
  document.head.appendChild(script);

  const nav = document.getElementById("otherProducts");
  if (nav) {
    nav.innerHTML = data.products
      .filter((p) => p.id !== product.id)
      .map((p) => '<a class="btn secondary" href="product.html?id=' + p.id + '">' + p.name + "</a>")
      .join("");
  }
})();
