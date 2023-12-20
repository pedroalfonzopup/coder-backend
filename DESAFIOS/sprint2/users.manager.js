const fs = require("fs")

class UserManager {
    file

    constructor(file) {
        this.file = file
    }

    static #users = []

    async writeFile(users) {
        try {
            const data = JSON.stringify(users, null, "\t");
            await fs.promises.writeFile(this.file, data);
        } catch (error) {
            return error.message
        }
    }
    
    async read() {
        try {
            const data = await fs.promises.readFile(this.file);
            const users = JSON.parse(data);
            return users

        } catch (error) {
            return error.message
        }
    }

    async validate () {
        try {
            const exists = await fs.promises.stat(this.file);
        } catch (error) {
            this.writeFile(UserManager.#users)
            const data = this.read()
            return data
        }
    }

    async readOne (id) {
        await this.validate()

        const users = await this.read()

        const user = users.find(user => user.id === id)

        return user
    }

    async create(data) {
        await this.validate()

        const users = await this.read()

        const newId = users.length == 0 ? 1 : users[users.length - 1].id + 1
        
        const user = {
            id: newId,
            name: data.name,
            photo: data.photo,
            email: data.email,
        }

        users.push(user)
        this.writeFile(users)

        return console.log("se guardo correctamente el usuario con el id " + newId)
    }
}


const users = new UserManager("./data/users.json")

const user1 = {
    name: "Igna Bacan",
    email: "Bacanazo@gmail.com",
    photo: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
}
const user2 = {
    name: "Juan Tuttolomondo",
    email: "Tuttifrutti@gmail.com",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPC4qINNo1QGBfT-BqIA8DSgwF7YiAZC275zkiXLht9Te-OOtCfBo2bbyYxXxDfl0v2E&usqp=CAU",

}
const user3 = {
    name: "Elias Zekha",
    email: "Kemno@gmail.com",
    photo: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
}
const user4 = {
    name: "Laura Olaya",
    email: "Dica@gmail.com",
    photo: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
}
const user5 = {
    name: "Brenda Alvarez",
    email: "Roling@gmail.com",
    photo: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
}

const tests = async () => {
    await users.create(user1)
    await users.create(user2)
    await users.create(user3)
    await users.create(user4)
    await users.create(user5)

    const readUsers = await users.read()
    console.log(readUsers)
    const readOneUser = await users.readOne(4)
    console.log(readOneUser)
}

tests()
