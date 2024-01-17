
import fs from "fs"
import crypto from "crypto"

class ProductManager {
  file

  static #perGain = 0.3;
  static #totalGain = 0;

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

  async validate() {
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

  
  async destroy(id) {
    await this.validate()

    const products = await this.read()
    const productToDelete = products.find(product => product.id === id)
    const index = products.indexOf(productToDelete)

    try {
          products.splice(index, 1)
        } catch (error) {
          error.message 
        }

    this.writeFile(products)

    return id
 }
 
 async soldProduct(quantity, pid) {
  try {
    const one = this.readOne(pid);
    if (one.stock >= quantity) {
      one.stock = one.stock - quantity;
      ProductManager.#totalGain =
        ProductManager.#totalGain +
        one.price * quantity * ProductManager.#perGain;
      const soldData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.file, soldData);
      return one.stock;
    } else {
      const error = new Error("there is no more stock");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

  async create(data) {
    await this.validate()

    const products = await this.read()

    const newId = crypto.randomBytes(12).toString("hex")

    const product = {
        id: newId,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
    }
  

    products.push(product)
    this.writeFile(products)

    return product.id
    }

    async update(pid, data) {
      const products = await this.read()
      const toUpdate = JSON.parse(products)

      const indexToUpdate = toUpdate.findIndex(object => object.id === pid)
      
      try {
          toUpdate.splice(indexToUpdate, 1, {data})
      } catch (error) {
         error.message 
      }

      this.writeFile(toUpdate)

      return pid
  }
}