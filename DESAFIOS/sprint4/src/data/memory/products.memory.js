import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #perGain = 0.3;
  static #totalGain = 0;

  init() {
    try {
      const exists = fs.existsSync(this.path);
      const reading = fs.readFileSync(this.path, "utf-8")
      
      this.products = JSON.parse(reading)
    } catch (error) {
      error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async create(data) {
    const productsFromJson = await fs.promises.readFile("./src/data/fs/files/products.json")
    console.log("READFILE memory" +productsFromJson)
    const productsArray = JSON.parse(productsFromJson)
    console.log("ARRAY A PUSHEAR memory" +productsArray)
    try {
      const newId = crypto.randomBytes(12).toString("hex")
      const product = {
        id: newId,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      console.log("PRODUCTO A GUARDAR memory" +product)

      //productsArray.push(product)
      //await fs.promises.writeFile("./src/data/fs/files/products.json", productsArray)
      return product.id;
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      if (this.products.length === 0) {
        const error = new Error("There are not products");
        error.statusCode = 404;
        throw error;
      } else {
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        const error = new Error("Product by ID:" + id + " not found");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
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
        await fs.promises.writeFile(this.path, soldData);
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

  async destroy(id) {
    try {
      this.readOne(id);
      this.products = this.products.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return id;
    } catch (error) {
      throw error;
    }
  }


  async update(pid, data) {
    try {
      const products = this.read();
      const toUpdate = JSON.parse(products);
      const indexToUpdate = toUpdate.findIndex((object) => object.id === pid);
      toUpdate.splice(indexToUpdate, 1, { data });
      await fs.promises.writeFile(this.path, toUpdate);

      return pid;
    } catch (error) {
      error.message;
    }
  }
}

const products = new ProductManager("./src/data/fs/files/products.json");

console.log(
  await products.create({
    title: "Calculadora",
    price: 200,
    photo:
      "https://http2.mlstatic.com/D_NQ_NP_2X_978839-MLA43556248580_092020-F.webp",
    stock: 25,
  })
);

export default productsMemory;
