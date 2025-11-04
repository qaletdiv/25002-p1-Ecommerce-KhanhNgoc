const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((p) => p.id == productId);

const detailContainer = document.getElementById("product-detail");
const relatedContainer = document.getElementById("related-list");

if (!product) {
  detailContainer.innerHTML = "<p>Product not found.</p>";
} else {
  renderProductDetail(product);
  renderRelated(product);
}

function renderProductDetail(p) {
  detailContainer.innerHTML = `
    <div class="product-gallery">
      <img id="main-image" src="${p.image}" alt="${p.name}" />
    </div>

    <div class="product-info">
      <h1>${p.name}</h1>
      <p class="price">$${p.price.toLocaleString()}</p>

      <div class="quantity-select">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" value="1" />
      </div>

      <button id="add-to-cart">Add to Cart</button>
    </div>
  `;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please log in to add items to your cart.");
      window.location.href = "../LoginPage/login-page.html";
      return;
    }

    const qty = parseInt(document.getElementById("quantity").value);
    addToCart(p.id, qty);
    alert("Product added to cart!");
  });
}

function addToCart(productId, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderRelated(currentProduct) {
  const related = products
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 4);
  relatedContainer.innerHTML = related
    .map(
      (r) => `
        <div class="related-item" onclick="viewDetail(${r.id})">
          <img src="${r.image}" alt="${r.name}" />
          <h4>${r.name}</h4>
          <p class="price">$${r.price.toLocaleString()}</p>
        </div>
      `
    )
    .join("");
}
function viewDetail(id) {
  window.location.href = `../ProductsPage/products-page.html?id=${id}`;
}
