import { faker } from "@faker-js/faker"
import repository from "../../repositories/users.rep.js"

function usersMock() {
    return {
        name: faker.person.firstName(),
        email: 
        (faker.person.firstName() + faker.person.lastName()).toLowerCase() + 
        faker.number.hex(64) + 
        "@coder.com",
        password: "ysionoys"
    }
}

export default async function createUsers() {
    try {
        const data = usersMock()
        await repository.create(data)
    } catch (error) {
        throw error
    }   
}
