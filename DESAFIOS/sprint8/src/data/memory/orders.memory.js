import fs from "fs";
import crypto from "crypto";

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
      throw error
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

  async validate() {
    try {
      const exists = await fs.promises.stat(this.file);
      this.writeFile(OrderManager.#cart);
      const data = this.read();
      return data;

    } catch (error) {
      throw error
    }
  }

  async readOne(oid) {
    try {
      await this.validate();
      const orders = await this.read();
      const order = orders.find((order) => order.id === oid);
      return order;
    } catch (error) {
      throw error
    }
  }

  async destroy(oid) {
    await this.validate();

    const orders = await this.read();
    const orderToDelete = orders.find((order) => order.id === oid);
    const index = orders.indexOf(orderToDelete);

    try {
      orders.splice(index, 1);
      this.writeFile(orders);

      return orderToDelete;
    } catch (error) {
      throw error
    }


  }


  async create(data) {
    await this.validate();
    const orders = await this.read();
    const newId = crypto.randomBytes(12).toString("hex");

    try {

      const order = {
        id: newId,
        product_id: data.product_id,
        user_id: data.user_id,
        quantity: data.quantity,
        state: data.state || "reserved",
      };

      orders.push(order);
      this.writeFile(orders);

      return order;
    } catch (error) {
      throw error
    }
  }

  async update(oid, data) {
    const orders = await this.read();
    const toUpdate = JSON.parse(orders);

    const indexToUpdate = toUpdate.findIndex((object) => object.id === oid);

    try {
      toUpdate.splice(indexToUpdate, 1, { data });
      this.writeFile(toUpdate);
      return toUpdate;
    } catch (error) {
      throw error
    }
  }
}

const orders = new OrderManager()

export default orders