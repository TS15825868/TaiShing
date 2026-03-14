(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const from = params.get("from");

  const backBtn = document.getElementById("backBtn");
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productSummary = document.getElementById("product-summary");
  const productSizes = document.getElementById("product-sizes");
  const productPackage = document.getElementById("product-package");
  const productIngredients = document.getElementById("product-ingredients");
  const productUses = document.getElementById("product-uses");

  const fallbackBack = "guilu-series.html";

  if (backBtn) {
    if (from && from.trim() !== "") {
      backBtn.href = from;
    } else if (document.referrer && document.referrer.includes(window.location.host)) {
      try {
        const refUrl = new URL(document.referrer);
        const refPath = refUrl.pathname.split("/").pop();
        backBtn.href = refPath || fallbackBack;
      } catch (e) {
        backBtn.href = fallbackBack;
      }
    } else {
      backBtn.href = fallbackBack;
    }
  }

  fetch("products.json")
    .then((r) => r.json())
    .then((data) => {
      const product = data.products.find((x) => x.id === id) || data.products[0];

      if (!product) return;

      document.title = `${product.name}｜仙加味`;

      if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
      }

      if (productTitle) productTitle.textContent = product.name;
      if (productSummary) productSummary.textContent = product.desc || "";

      if (productSizes) {
        if (Array.isArray(product.sizes)) {
          productSizes.textContent = product.sizes.join(" / ");
        } else {
          productSizes.textContent = product.size || "";
        }
      }

      if (productPackage) {
        productPackage.textContent = product.package || "—";
      }

      if (productIngredients) {
        const items = Array.isArray(product.ingredients)
          ? product.ingredients
          : String(product.ingredients || "").split(/\s+/).filter(Boolean);

        productIngredients.innerHTML = items.map(item => `<li>${item}</li>`).join("");
      }

      if (productUses) {
        const items = Array.isArray(product.uses)
          ? product.uses
          : [];

        productUses.innerHTML = items.length
          ? items.map(item => `<li>${item}</li>`).join("")
          : "<li>請透過 LINE 詢問食用方式。</li>";
      }
    })
    .catch((err) => {
      console.error("products.json 讀取失敗：", err);
    });
})();
