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
    
    const productsArray = JSON.parse(productsFromJson)
    
    try {
      productsArray.push(data)
      await fs.promises.writeFile("./src/data/fs/files/products.json", productsArray)
      return data;
    } catch (error) {
      throw error;
    }
  }
  read({ filter, sortAndPaginate }) {
    // A ESPERAR
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
      const one = this.products.find((each) => each._id === id);
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
  async destroy(id) {
    try {
      const toDelete = this.readOne(id);
      this.products = this.products.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return toDelete;
    } catch (error) {
      throw error;
    }
  }


  async update(pid, data) {
    try {
      const products = this.read();
      const toUpdate = JSON.parse(products);
      const indexToUpdate = toUpdate.findIndex((object) => object._id === pid);
      toUpdate.splice(indexToUpdate, 1, { data });
      await fs.promises.writeFile(this.path, toUpdate);

      return toUpdate;
    } catch (error) {
      throw error
    }
  }
}

const products = new ProductManager();

export default products

