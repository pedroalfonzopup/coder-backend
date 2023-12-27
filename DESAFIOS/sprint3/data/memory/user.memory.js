class UserManager {
    static #users = []

    create(data) {
        const user = {
            id:
                UserManager.#users.length === 0 
                    ? 1 
                    : UserManager.#users[UserManager.#users.length-1].id+1,
            name: data.name,
            photo: data.photo || `Foto de ${data.name}`,
            email: data.email,
        }
        UserManager.#users.push(user)
    }
    read() {
        return UserManager.#users
    }
    readOne(id) {
        return UserManager.#users.find((each) => each.id === Number(id))
    }
}

const users = new UserManager({})
users.create({
     name: "Pedro Alfonzo",
     email: "fozo@gmail.com"
})
users.create({
     name: "Igna Bacan",
     email: "Bacanazo@gmail.com",
})
users.create({
     name: "Juan Tuttolomondo",
     email: "Tuttifrutti@gmail.com",
     photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPC4qINNo1QGBfT-BqIA8DSgwF7YiAZC275zkiXLht9Te-OOtCfBo2bbyYxXxDfl0v2E&usqp=CAU",
})
users.create({
     name: "Elias Zekha",
     email: "Kemno@gmail.com",
})
