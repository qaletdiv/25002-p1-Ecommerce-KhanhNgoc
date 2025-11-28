const order = JSON.parse(localStorage.getItem("recentOrder"));
const orderSummary = document.getElementById("order-summary");

if (!order) {
  orderSummary.innerHTML = "<p>No order information found.</p>";
} else {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (!orders.find((o) => o.orderId === order.orderId)) {
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  renderOrder(order);
}

function renderOrder(order) {
  const itemsHTML = order.items
    .map(
      (item) => `
      <p>• ${item.name} × ${item.qty} — $${(item.price * item.qty).toFixed(
        2
      )}</p>`
    )
    .join("");

  orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    <p><strong>Order ID:</strong> ${order.orderId}</p>
    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    <hr />
    ${itemsHTML}
  `;
}

document.getElementById("back-to-shop").addEventListener("click", () => {
  window.location.href = "../ShopPage/shop-page.html";
});
