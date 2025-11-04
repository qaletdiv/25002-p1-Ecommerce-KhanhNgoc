const form = document.getElementById("register-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((u) => u.email === email)) {
    alert("This email has already been registered!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please check and try again.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You will be redirected to the login page.");
  window.location.href = "../LoginPage/login-page.html";
});
