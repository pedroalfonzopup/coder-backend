import User from "./models/user.model.js"
import Product from "./models/product.model.js"
import Order from "./models/order.model.js"
import { Types } from "mongoose"

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
    async read({ filter, sortAndPaginate }) {
        try {
            const all = await this.model.paginate(filter, sortAndPaginate)
            return all
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id).lean()
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
            } else {
                return one
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
    async report(uid) {
        try {
            const report = await this.model.aggregate([
                { $match: { user_id: new Types.ObjectId(uid) } },
                {
                    $lookup: {
                        from: "products",
                        foreignField: "_id",
                        localFied: "product_id",
                        as: "product_id",
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                { $arrayElemAt: ["$product_id", 0] },
                                "$$ROOT"
                            ],
                        },
                    }
                },
                { $set: { subtotal: { $multiply: ["$price", "quantity"] } } },
                { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
                { 
                    $project: {
                        _id: false,
                        user_id: "$_id",
                        total: "$total",
                        date: new Date(),
                        currency: "USD",
                    } 
                }
            ])
            return report
        } catch (error) {
            throw error
        }
    }
}

const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)

export { users, products, orders }