document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const accountLink = document.getElementById("account-link");
  const logoutLink = document.getElementById("logout-link");

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  if (loggedIn) {
    loginLink?.classList.add("hidden");
    registerLink?.classList.add("hidden");
    accountLink?.classList.remove("hidden");
    logoutLink?.classList.remove("hidden");
  } else {
    loginLink?.classList.remove("hidden");
    registerLink?.classList.remove("hidden");
    accountLink?.classList.add("hidden");
    logoutLink?.classList.add("hidden");
  }

  logoutLink?.addEventListener("click", () => {
    localStorage.setItem("loggedIn", "false");
    window.location.reload();
  });
});
