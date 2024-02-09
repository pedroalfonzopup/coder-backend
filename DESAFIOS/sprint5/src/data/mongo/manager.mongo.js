import User from "./models/user.model.js"
import Product from "./models/product.model.js"
import Order from "./models/order.model.js"

class MongoManager {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        try {
            const one = await this.model.create(data)
            return one._id
        } catch (error) {
            throw error
        }
    }
    async read(obj) {
        try {
            let { filter, order } = obj
            const all = await this.model
                .find(filter)
                .populate("user_id")
                .populate("product_id")
                .sort(order)
            if (all.lenght === 0) {
                const error = new Error("There are no items")
                error.statusCode = 404
                throw error
            }
            return all
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            const one = await this.model.findById(id)
            if (!one) {
                const error = new Error("There isn't item")
                error.statusCode = 404
                throw error
            }
            return one
        } catch (error) {
            throw error
        }
    }
    async readByEmail(email) {
        try {
            const one = await this.model.find({email: email})
            if (!one) {
                const error = new Error("There isn't item")
                error.statusCode = 404
                throw error
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id)
            if (!one) {
                const error = new Error("There isn't item")
                error.statusCode = 404
                throw error
            }
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const opt = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            if (!one) {
                const error = new Error("There isn't item")
                error.statusCode = 404
                throw error
            }
            return one
        } catch (error) {
            throw error
        }
    }
}

const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)

export { users, products, orders }