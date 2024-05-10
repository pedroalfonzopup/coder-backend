import fs from "fs";
import crypto from "crypto";
import users from "./users.fs.manager.js";
import products from "./products.fs.manager.js";

class OrderManager {
  file;

  constructor(file) {
    this.file = file;
  }

  static #cart = [];
  async validate() {
      try {
        const exists = await fs.promises.stat(this.file);
      } catch (error) {
        this.writeFile(OrderManager.#cart);
        const data = this.read();
        return data;
      }
    }
  async writeFile(orders) {
    try {
      const data = JSON.stringify(orders, null, "\t");
      await fs.promises.writeFile(this.file, data);
    } catch (error) {
      return error.message;
    }
  }

  async read({ filter, sortAndPaginate }) {
    // A ESPERAR
    try {
      const data = await fs.promises.readFile(this.file);
      const orders = JSON.parse(data);
      return orders;
    } catch (error) {
      throw error
    }
  }
  async readOne(oid){
    try {
      const orders = await this.read()
      const one = orders.find((order) => order._id === oid)
      return one
    } catch (error) {
      throw error
    }
  }
  async destroy(oid) {
    await this.validate();

    const orders = await this.read();
    const one = orders.find((order) => order._id === oid);
    const index = orders.indexOf(one);

    try {
      
      orders.splice(index, 1);
      this.writeFile(orders);
      return one;
    } catch (error) {
      throw error
    }
  }


  async create(data) {
    await this.validate();
    const orders = await this.read();

    try {
      orders.push(data)
      this.writeFile(orders)

      return data;
    } catch (error) {
      throw error
    }
  }

  async update(oid, data) {
    const orders = await this.read();
    const toUpdate = JSON.parse(orders);

    const indexToUpdate = toUpdate.findIndex((object) => object._id === oid);

    try {
      toUpdate.splice(indexToUpdate, 1, { data });
      this.writeFile(toUpdate);
      return toUpdate;  
    } catch (error) {
      throw error
    }
  }
}

const orders = new OrderManager("./files/orders.json");

export default orders;
