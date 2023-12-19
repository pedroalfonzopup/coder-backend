const fs = require("fs")
const crypto = require("crypto")


class UserManager {
    static #users = []

    init() {
        const exist = fs.existsSync("./data/users.json")
        
        if(!exist) {
            const path = "./data/users.json"
            const data = JSON.stringify([])
            fs.writeFileSync(path, data)
        }
    }
    
    constructor() {
        this.init()
    }

    async create(data) {
        try{
        const user = {
            id: crypto.randomBytes(12).toString("hex"),
            name: data.name,
            photo: data.photo || `Foto de ${data.name}`,
            email: data.email,
        }

        const usersFile = JSON.parse( await fs.promises.readFile( "./data/users.json","utf-8"))
        usersFile.push(user)
        const usersJson = JSON.stringify(usersFile, null, 2)

        await fs.promises.writeFile("./data/users.json", usersJson,)

        } catch (error) {
            return error.message
        }
    }

    read() {
        return JSON.parse( fs.readFile("./data/users.json", "utf-8"))
    }
}

async function createUsers () {
    const users = new UserManager ({})
    await users.create({
        name: "Pedro Alfonzo",
        email: "fozo@gmail.com"
    })
    await users.create({
        name: "Igna Bacan",
        email: "Bacanazo@gmail.com"
    })
    await users.create({
        name: "Juan Tuttolomondo",
        email: "Tuttifrutti@gmail.com",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPC4qINNo1QGBfT-BqIA8DSgwF7YiAZC275zkiXLht9Te-OOtCfBo2bbyYxXxDfl0v2E&usqp=CAU",
    })
    await users.create({
        name: "Elias Zekha",
        email: "Kemno@gmail.com",
    })
}

createUsers()
