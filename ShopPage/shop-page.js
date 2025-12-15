const products = JSON.parse(localStorage.getItem("products")) || [];
const container = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const sortSelect = document.getElementById("sort");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const itemsPerPage = 6;
let filteredProducts = [...products];
function renderProducts(page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProducts.slice(start, end);
  container.innerHTML = pageItems
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

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  pagination.innerHTML = `
    <button id="prevBtn"
        style="background:#fcbaba; border:none; padding:6px 10px; border-radius:8px; color:#fff;"
        ${
          currentPage === 1
            ? "disabled style='background:#ffd6d6; color:#888;'"
            : ""
        }>
        &lt;</button>
   <span style="margin:0 10px; color:#555;">Page ${currentPage} / ${totalPages}</span>
      <button id="nextBtn"
        style="background:#fcbaba; border:none; padding:6px 10px; border-radius:8px; color:#fff;"
        ${
          currentPage === totalPages
            ? "disabled style='background:#ffd6d6; color:#888;'"
            : ""
        }>
        &gt;
      </button>
  `;

  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage);
    }
  };

  document.getElementById("nextBtn").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage);
    }
  };
}

function filtersAndSort() {
  let result = [...products];

  if (categoryFilter.value) {
    result = result.filter((p) => p.category === categoryFilter.value);
  }

  if (priceFilter.value) {
    const [min, max] = priceFilter.value.split("-").map(Number);
    result = result.filter((p) => p.price >= min && p.price <= max);
  }

  const sortValue = sortSelect.value;
  if (sortValue === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name-asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  filteredProducts = result;
  currentPage = 1;

  renderProducts();
}
categoryFilter.addEventListener("change", filtersAndSort);
priceFilter.addEventListener("change", filtersAndSort);
sortSelect.addEventListener("change", filtersAndSort);

renderProducts(currentPage);
const cartBtn = document.getElementById("cart-btn");
cartBtn.addEventListener("click", () => {
  window.location.href = "../CartPage/cart-page.html";
});
