const fs = require("fs");

class ProductManager {
  file

  constructor(file) {
      this.file = file
  }

  static #products = []

  async writeFile(products) {
      try {
          const data = JSON.stringify(products, null, "\t");
          await fs.promises.writeFile(this.file, data);
      } catch (error) {
          return error.message
      }
  }
  
  async read() {
      try {
          const data = await fs.promises.readFile(this.file);
          const products = JSON.parse(data);
          return products

      } catch (error) {
          return error.message
      }
  }

  async validate () {
      try {
          const exists = await fs.promises.stat(this.file);
      } catch (error) {
          this.writeFile(ProductManager.#products)
          const data = this.read()
          return data
      }
  }

  async readOne (id) {
      await this.validate()

      const products = await this.read()

      const product = products.find(product => product.id === id)

      return product
  }

  async create(data) {
    await this.validate()
    
    const products = await this.read()

    const newId = products.length == 0 ? 1 : products[products.length - 1].id + 1

    const product = {
      id: newId,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
      }

    products.push(product)
    this.writeFile(products)

    return console.log("se guardo correctamente el producto con el id " + newId) 
  }
}


const products = new ProductManager("./data/products.json");

const product1 = {
  title: "Pava",
  price: 200,
  photo: "https://www.distriecono.com.ar/images/5654_00.jpg",
  stock: 15
}
const product2 = {
  title: "Silla",
  price: 400,
  photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}
const product3 = {
  title: "Termo",
  price: 250,
  photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}
const product4 = {
  title: "Mate",
  price: 100,
  photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}
const product5 = {
  title: "Teclado",
  price: 500,
    photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}
const product6 = {
  title: "Monitor",
  price: 245,
    photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}
const product7 = {
  title: "Pala",
  price: 100,
    photo: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg",
  stock: 15
}

const tests = async () => {
  await products.create(product1)
  await products.create(product2)
  await products.create(product3)
  await products.create(product4)
  await products.create(product5)
  await products.create(product6)
  await products.create(product7)

  const readProducts = await products.read()
  console.log(readProducts)
  const readOneProduct = await products.readOne(4)
  console.log(readOneProduct)
}

tests()
