fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if(res.statusCode===200) {
      document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#register-nav"))
      document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#login-nav"))
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" /* TOKEN */ },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          if (response.statusCode === 200) {
            alert(response.message);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          throw error
        }
      });
    } else {
      document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#form-nav"))
      document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#cart-nav"))
      document.querySelector(".MyNavbar").removeChild(document.querySelector("#signout"))
    }
    if (res.response?.role===0) {
      document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#form-nav"))
    } else if (res.response?.role===1) {
      //document.querySelector(".MyNavbar-list").removeChild(document.querySelector("#"))
    }
  });
