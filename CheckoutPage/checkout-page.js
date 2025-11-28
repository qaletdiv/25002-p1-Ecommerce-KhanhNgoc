const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  alert("Please login before checkout.");
  window.location.href = "../LoginPage/login-page.html";
}

const products = JSON.parse(localStorage.getItem("products")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  alert("Your cart is empty.");
}

const summaryBox = document.getElementById("summary-items");
const totalBox = document.getElementById("summary-total");

function renderSummary() {
  let html = "";
  let total = 0;

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;

    const subtotal = product.price * item.qty;
    total += subtotal;

    html += `
      <div class="summary-item">
        <span>${product.name} (x${item.qty})</span>
        <span>$${subtotal.toLocaleString()}</span>
      </div>
    `;
  });

  summaryBox.innerHTML = html;
  totalBox.textContent = "$" + total.toLocaleString();
}

renderSummary();

document.getElementById("shipping-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const orderItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      id: item.id,
      name: product ? product.name : "Unknown Product",
      price: product ? product.price : 0,
      qty: item.qty,
    };
  });

  const order = {
    orderId: "ORD" + Date.now(),
    userEmail: user.email,
    items: orderItems,
    total: orderItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    fullname: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    date: new Date().toLocaleDateString(),
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("recentOrder", JSON.stringify(order));

  localStorage.removeItem("cart");

  window.location.href = "../ConfirmPage/order-confirmation.html";
});
