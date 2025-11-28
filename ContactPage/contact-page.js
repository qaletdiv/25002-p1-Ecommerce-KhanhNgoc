const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({
    name,
    email,
    subject,
    message,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("messages", JSON.stringify(messages));

  alert("Thank you! Your message has been submitted.");
  form.reset();
});
