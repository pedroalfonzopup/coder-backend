console.log("socket")

const socket = io()

socket.on("products", (data) => {
    const template = data
        .map(
            (each) = `
            <div class="Product">
                <div class="Product-container">
                    <img class="Product-container_img" src="${each.photo}" alt="${each.title}">
                </div>
                <h5 class="Product-name">${each.title}</h5>
            </div>
        `
        )
        .join("")
    document.querySelector("#RealProducts").innerHTML = template
}) 

