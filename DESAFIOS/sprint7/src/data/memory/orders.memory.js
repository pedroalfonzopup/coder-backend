import fs from "fs";
import crypto from "crypto";
import users from "./users.memory.js";
import products from "./products.memory.js";

class OrderManager {
  file;

  constructor(file) {
    this.file = file;
  }

  static #cart = [];

  async writeFile(orders) {
    try {
      const data = JSON.stringify(orders, null, "\t");
      await fs.promises.writeFile(this.file, data);
    } catch (error) {
      return error.message;
    }
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.file);
      const orders = JSON.parse(data);
      return orders;
    } catch (error) {
      return error.message;
    }
  }

  async validate() {
    try {
      const exists = await fs.promises.stat(this.file);
    } catch (error) {
      this.writeFile(OrderManager.#cart);
      const data = this.read();
      return data;
    }
  }

  async readByUser(uid) {
    await this.validate();

    const orders = await this.read();

    const order = orders.find((order) => order.id === uid);

    return order;
  }

  async destroy(oid) {
    await this.validate();

    const orders = await this.read();
    const orderToDelete = orders.find((order) => order.id === oid);
    const index = orders.indexOf(orderToDelete);

    try {
      orders.splice(index, 1);
    } catch (error) {
      error.message;
    }

    this.writeFile(orders);

    return oid;
  }

  async validateUser(uid) {
    try {
      const user = await users.readOne(uid);
      return true;
    } catch (error) {
      error.message;
    }
  }

  async validateProduct(pdi) {
    try {
      const product = await products.readOne(pdi);
      return true;
    } catch (error) {
      error.message;
    }
  }

  async create(data) {
    await this.validate();
    const orders = await this.read();
    const newId = crypto.randomBytes(12).toString("hex");

    try {
      this.validateUser(data.uid);
      this.validateProduct(data.pid);
      products.soldProduct(data.pdi, data.quantity);

      const order = {
        id: newId,
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: data.state || "In Observation",
      };

      orders.push(order);
      this.writeFile(orders);

      return order.id;
    } catch (error) {
      error.message;
    }
  }

  async update(oid, quantity, state) {
    const orders = await this.read();
    const toUpdate = JSON.parse(orders);

    const indexToUpdate = toUpdate.findIndex((object) => object.id === oid);

    try {
      toUpdate.splice(indexToUpdate, 1, { quantity: quantity, state: state });
    } catch (error) {
      error.message;
    }

    this.writeFile(toUpdate);

    return oid;
  }
}
