const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find((p) => p.id == productId);

const detailContainer = document.getElementById("product-detail");
const relatedContainer = document.getElementById("related-list");

if (!product) {
  detailContainer.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
} else {
  renderProductDetail(product);
  renderRelated(product);
}

function renderProductDetail(p) {
  detailContainer.innerHTML = `
    <div class="product-gallery">
      <img id="main-image" src="${p.images[0]}" alt="${p.name}" />
      <div class="thumbnail-list">
        ${p.images
          .map((img) => `<img src="${img}" alt="${p.name}" />`)
          .join("")}
      </div>
    </div>

    <div class="product-info">
      <h1>${p.name}</h1>
      <p class="price">${p.price.toLocaleString()}đ</p>
      <p>${p.description}</p>

      <div class="quantity-select">
        <label for="quantity">Số lượng:</label>
        <input type="number" id="quantity" min="1" value="1" />
      </div>

     
  `;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      window.location.href = "../LoginPage/login-page.html";
      return;
    }

    const qty = parseInt(document.getElementById("quantity").value);
    addToCart(p.id, qty);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  });
}

function addToCart(productId, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
