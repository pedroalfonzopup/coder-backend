console.log("socket");

const socket = io();

document.querySelector("#register").addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.querySelector("#register-name").value
    const email = document.querySelector("#register-email").value
    const password = document.querySelector("#register-password").value

    const data = {}

    name && (data.name = name)
    email && (data.email = email)
    password && (data.password = password)
    
    socket.emit("registerUser", data)
})