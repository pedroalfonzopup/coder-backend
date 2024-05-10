import { faker } from "@faker-js/faker"
import repository from "../../repositories/products.rep.js"
import winston from "../../utils/loggers/loggers.index.js"

function productsMock() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price({ min: 20, max: 200, dec: 0 }),
        stock: faker.commerce.price({ min: 10, max: 30, dec: 0 }),
    }
}

export default async function createProducts() {
    try {
        const data = productsMock()
        await repository.create(data)
    } catch (error) {
        winston.ERROR(error)
    }
}