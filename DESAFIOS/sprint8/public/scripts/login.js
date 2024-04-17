import winston from "../../src/utils/winston.util";

const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
    winston.HTTP(response);
    alert(response.message);
    if (response.statusCode === 200) {
      location.replace("/");
    }
  } catch (error) {
    alert(error.message);
  }
});
