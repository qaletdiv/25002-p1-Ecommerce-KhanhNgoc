import { products } from "./mock-data.js";

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featured-products");
  const featured = products.slice(0, 3);
  container.innerHTML = featured
    .map(
      (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <button class="btn">Add to Cart</button>
        </div>`
    )
    .join("");
});
