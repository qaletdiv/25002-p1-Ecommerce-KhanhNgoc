const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  alert("Please log in to view your cart.");
  window.location.href = "../LoginPage/login-page.html";
}

const products = JSON.parse(localStorage.getItem("products")) || [];

let cart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

const cartList = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function renderCart() {
  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "0";
    return;
  }

  cartList.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id == item.id);
      if (!product) return "";
      const qty = parseInt(item.quantity) || 1;
      const price = parseFloat(product.price) || 0;
      const subtotal = price * qty;

      return `
        <div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            <p>Price: $${price.toLocaleString()}</p>
            <p>Subtotal: $<span class="subtotal">${subtotal.toLocaleString()}</span></p>
          </div>
          <input type="number" min="1" value="${qty}" class="qty-input"/>
          <button class="remove-btn">Remove</button>
        </div>
      `;
    })
    .join("");

  updateTotal();

  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const newQty = parseInt(e.target.value) || 1;
      const id = e.target.closest(".cart-item").dataset.id;
      const cartItem = cart.find((c) => c.id == id);
      if (cartItem) cartItem.quantity = newQty;
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      renderCart();
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".cart-item").dataset.id;
      cart = cart.filter((c) => c.id != id);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      renderCart();
    });
  });
}
function updateTotal() {
  let total = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id == item.id);
    if (!product) return;
    const qty = parseInt(item.quantity) || 1;
    const price = parseFloat(product.price) || 0;
    total += qty * price;
  });
  cartTotalEl.textContent = total.toLocaleString();
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  window.location.href = "../CheckoutPage/checkout-page.html";
});

renderCart();
