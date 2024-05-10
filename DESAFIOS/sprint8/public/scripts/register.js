import winston from "../../src/utils/winston.util";

const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#register-email").value,
      password: document.querySelector("#register-password").value,
      name: document.querySelector("#register-name").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    winston.HTTP(response);
    response.statusCode === 201
      ? location.replace("/sessions/login")
      : alert("ERROR: " + response.message);
  } catch (error) {
    alert(error.message);
  }
})