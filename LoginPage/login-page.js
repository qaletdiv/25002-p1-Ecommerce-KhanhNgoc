const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    errorMsg.textContent = "Incorrect email or password!";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  localStorage.setItem("loggedIn", "true");

  alert(`Welcome back!, ${foundUser.name}!`);

  const previousPage = document.referrer;
  if (
    previousPage &&
    !previousPage.includes("login-page.html") &&
    !previousPage.includes("register-page.html")
  ) {
    window.location.href = previousPage;
  } else {
    window.location.href = "../index.html";
  }
});
