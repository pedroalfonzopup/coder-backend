const selectors = document.querySelectorAll(".DeleteItem");
selectors.forEach((each) =>
  each.addEventListener("click", async (product) => {
    try {
      const url = "/api/orders/" + product.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      if(response.statusCode===200) {
        alert(response.message);
        location.reload()
      }
    } catch (error) {
      alert(error.message);
    }
  })
);