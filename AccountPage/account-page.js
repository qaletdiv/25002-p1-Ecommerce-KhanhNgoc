const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Please log in to access your account.");
  window.location.href = "../LoginPage/login-page.html";
}

document.getElementById("user-name").textContent = currentUser.name;
document.getElementById("user-email").textContent = currentUser.email;

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const userOrders = orders.filter((o) => o.userEmail === currentUser.email);

const orderList = document.getElementById("order-list");

if (userOrders.length === 0) {
  orderList.innerHTML = `<tr><td colspan="4">You have no orders yet.</td></tr>`;
} else {
  orderList.innerHTML = userOrders
    .map(
      (order) => `
      <tr>
        <td>${order.orderId}</td>
        <td>${order.date}</td>
        <td>$${order.total.toLocaleString()}</td>
        <td>${order.status || "Pending"}</td>
      </tr>
    `
    )
    .join("");
}
const cartBtn = document.getElementById("cart-btn");
cartBtn.addEventListener("click", () => {
  window.location.href = "../CartPage/cart-page.html";
});
