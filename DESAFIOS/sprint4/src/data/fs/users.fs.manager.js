import fs from "fs";
import crypto from "crypto";

class UserManager {
  file;

  constructor(file) {
    this.file = file;
  }

  static #users = [];

  async writeFile(users) {
    try {
      const data = JSON.stringify(users, null, "\t");
      await fs.promises.writeFile(this.file, data);
    } catch (error) {
      return error.message;
    }
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.file);
      const users = JSON.parse(data);
      return users;
    } catch (error) {
      return error.message;
    }
  }

  async validate() {
    try {
      const exists = await fs.promises.stat(this.file);
    } catch (error) {
      this.writeFile(UserManager.#users);
      const data = this.read();
      return data;
    }
  }

  async readOne(uid) {
    await this.validate();

    const users = await this.read();

    const user = users.find((user) => user.id === uid);

    return user;
  }

  async destroy(uid) {
    await this.validate();

    const users = await this.read();
    const userToDelete = users.find((user) => user.id === uid);
    const index = users.indexOf(userToDelete);

    try {
      users.splice(index, 1);
    } catch (error) {
      error.message;
    }
    this.writeFile(users);

    return uid;
  }

  async create(data) {
    await this.validate();

    const users = await this.read();

    const newId = crypto.randomBytes(12).toString("hex");

    const user = {
      id: newId,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    // users.push(user)
    // this.writeFile(users)

    return user.id;
  }

  async update(uid, data) {
    const users = await this.read();
    const toUpdate = JSON.parse(users);

    const indexToUpdate = toUpdate.findIndex((object) => object.id === uid);

    try {
      toUpdate.splice(indexToUpdate, 1, { data });
    } catch (error) {
      error.message;
    }

    this.writeFile(toUpdate);

    return uid;
  }
}

const users = new UserManager("./files/users.json");

const user1 = {
  name: "Igna Bacan",
  email: "Bacanazo@gmail.com",
  photo:
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
};
const user2 = {
  name: "Juan Tuttolomondo",
  email: "Tuttifrutti@gmail.com",
  photo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPC4qINNo1QGBfT-BqIA8DSgwF7YiAZC275zkiXLht9Te-OOtCfBo2bbyYxXxDfl0v2E&usqp=CAU",
};
const user3 = {
  name: "Elias Zekha",
  email: "Kemno@gmail.com",
  photo:
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
};
const user4 = {
  name: "Laura Olaya",
  email: "Dica@gmail.com",
  photo:
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
};
const user5 = {
  name: "Brenda Alvarez",
  email: "Roling@gmail.com",
  photo:
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
};

const testsUsers = async () => {
  await users.create(user1);
  await users.create(user2);
  await users.create(user3);
  await users.create(user4);
  await users.create(user5);
};

testsUsers();

export default users;
