document.querySelector("#verify").addEventListener("click", async ()=>{
    event.preventDefault()
    const data = {
        verifiedCode: document.querySelector("#verify-code").value,
        email: document.querySelector("#verify-email").value,
    }
    const opts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
    let response = await fetch("/api/sessions/verify", opts)
    response = await response.json()
    alert(response)
    alert(response.message);
    if (response.statusCode === 200) {
      location.replace("/sessions/login");
    }
})