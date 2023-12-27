
class ProductManager {
    static #products = []

    create(data) {
        const product = {
            id:
                ProductManager.#products.length === 0 
                    ? 1 
                    : ProductManager.#products[ProductManager.#products.length-1].id+1,
            title: data.title,
            photo: data.photo || `Foto de ${data.title}`,
            price: data.price,
            stock: data.stock || 15,
        }
       ProductManager.#products.push(product)
    }
    read() {
        return ProductManager.#products
    }
    readOne(id) {
        return ProductManager.#products.find((each) => each.id === Number(id))
    }
}

const products = new ProductManager({})
products.create({
     title: "Libro",
     price: 150,
})
products.create({
     title: "Pava",
     price: 200,
     photo: "https://www.distriecono.com.ar/images/5654_00.jpg",
})
products.create({
     title: "Silla",
     price: 400,
})
products.create({
     title: "Termo",
     price: 250,
})
products.create({
     title: "Mate",
     price: 100,
})
products.create({
     title: "Teclado",
     price: 500,
})