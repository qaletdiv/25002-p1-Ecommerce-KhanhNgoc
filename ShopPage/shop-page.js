const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
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
   <span style="margin:0 10px; color:#555;">Trang ${currentPage} / ${totalPages}</span>
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

categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;
  filteredProducts = value
    ? products.filter((p) => p.category === value)
    : [...products];
  currentPage = 1;
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  if (value === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (value === "price-desc")
    filteredProducts.sort((a, b) => b.price - a.price);
  if (value === "name-asc")
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  currentPage = 1;
  renderProducts();
});

renderProducts(currentPage);
window.location.href = `../ProductsPage/products-page.html?id=${id}`;
