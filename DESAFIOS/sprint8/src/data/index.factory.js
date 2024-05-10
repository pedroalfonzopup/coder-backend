import args from "../utils/args.util.js"
import dbConnection from "../utils/db.js"
import winston from "../utils/loggers/loggers.index.js"

const environment = args.env

let dao = {}

switch (environment) {
    case "test":
        winston.INFO("FS CONNECTED")
        const { default: productsFs } = await import("./fs/products.fs.manager.js")
        const { default: usersFs } = await import("./fs/users.fs.manager.js")
        const { default: ordersFs } = await import("./fs/orders.fs.manager.js")
        dao = { products: productsFs, users: usersFs, orders: ordersFs }
        break;
    default:
        winston.INFO("MONGO CONNECTED")
        dbConnection()
        
        const { default: productsMongo } = await import("./mongo/products.mongo.js")
        const { default: usersMongo } = await import("./mongo/users.mongo.js")
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
        
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
        break;
}

export default dao