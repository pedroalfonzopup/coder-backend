console.log("socket");

const socket = io();

document.querySelector("#login").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  const data = {};

  email && (data.email = email);
  password && (data.password = password);

  socket.emit("loginUser", data);
});

socket.on("loginFailed", (response) => { alert(response)})
socket.on("loginSucess", (response) => { alert(response)})