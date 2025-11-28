import { products } from "./mock-data.js";

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}
const productList = JSON.parse(localStorage.getItem("products"));

let loggedIn = localStorage.getItem("loggedIn") === "true";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featured-products");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const accountLink = document.getElementById("account-link");
  const logoutLink = document.getElementById("logout-link");
  // const cartBtn = document.getElementById("cart-btn");

  const renderProducts = (list) => {
    if (!list.length) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    container.innerHTML = list
      .map(
        (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <a href="../ProductsPage/products-page.html?id=${
            p.id
          }" class="btn">View</a>
        </div>`
      )
      .join("");
  };

  const featured = productList.slice(0, 3);
  renderProducts(featured);

  const handleSearch = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
      renderProducts(featured);
      return;
    }
    const filtered = productList.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
  };

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  const updateNavbar = () => {
    if (loggedIn) {
      loginLink.classList.add("hidden");
      registerLink.classList.add("hidden");
      accountLink.classList.remove("hidden");
      logoutLink.classList.remove("hidden");
    } else {
      loginLink.classList.remove("hidden");
      registerLink.classList.remove("hidden");
      accountLink.classList.add("hidden");
      logoutLink.classList.add("hidden");
    }
  };

  logoutLink.addEventListener("click", () => {
    localStorage.setItem("loggedIn", "false");
    loggedIn = false;
    updateNavbar();
    alert("You have logged out.");
  });

  updateNavbar();

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      if (!loggedIn) {
        alert("Please log in before adding to cart.");
        window.location.href = "./LoginPage/login-page.html";
        return;
      }
      const productName =
        e.target.parentElement.querySelector("h3").textContent;
      alert(`Added ${productName} to your cart!`);
    }
  });
});

const cartBtn = document.getElementById("cart-btn");

cartBtn.addEventListener("click", () => {
  window.location.href = "../CartPage/cart-page.html";
});
