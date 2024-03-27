import fs from "fs";
import crypto from "crypto";

class UserManager {
  file;

  constructor(file) {
    this.file = file;
  }

  static #users = [];
  async validate() {
      try {
        const exists = await fs.promises.stat(this.file);
      } catch (error) {
        this.writeFile(UserManager.#users);
        const data = this.read();
        return data;
      }
    }

  async writeFile(users) {
    try {
      const data = JSON.stringify(users, null, "\t");
      await fs.promises.writeFile(this.file, data);
    } catch (error) {
      return error.message;
    }
  }

  async read({ filter, sortAndPaginate }) {
    // A ESPERAR
    try {
      const data = await fs.promises.readFile(this.file);
      const users = JSON.parse(data);
      return users;
    } catch (error) {
      return error.message;
    }
  }

  
  async readOne(uid) {
    try {
      await this.validate();
      const users = await this.read();
      const user = users.find((user) => user._id === uid);
      return user;

    } catch (error) {
      throw error
    }
    
  }

  async readOne(email) {
    try {
      await this.validate();
      const users = await this.read();
      const user = users.find((user) => user.email === email);
      return user;

    } catch (error) {
      throw error
    }
    
  }

  async destroy(uid) {
    await this.validate();

    const users = await this.read();
    const userToDelete = users.find((user) => user._id === uid);
    const index = users.indexOf(userToDelete);

    try {
      users.splice(index, 1); 
      this.writeFile(users);
      return userToDelete;
    } catch (error) {
      throw error
    }
   
  }

  async create(data) {
    try {
      await this.validate();
      const users = await this.read();
      users.push(data)
      this.writeFile(users)
      return data;
    } catch (error) {
      throw error
    }

  }

  async update(uid, data) {
    const users = await this.read();
    const toUpdate = JSON.parse(users);

    const indexToUpdate = toUpdate.findIndex((object) => object._id === uid);

    try {
      toUpdate.splice(indexToUpdate, 1, { data });
      this.writeFile(toUpdate);
      return toUpdate;
    } catch (error) {
      error.message;
    }

    
  }
}

const users = new UserManager("./files/users.json");

export default users;
