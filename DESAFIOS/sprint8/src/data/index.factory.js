import args from "../utils/args.util.js"

const environment = args.env

let dao = {}

switch (environment) {
    case "prod":
        console.log("MONGO CONNECTED")
        const { default: productsMongo } = await import("./mongo/products.mongo.js")
        const { default: usersMongo } = await import("./mongo/users.mongo.js")
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
        //ACA IRIA CONECCION A MONGO
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
        break;
    case "dev":
        console.log("FS CONNECTED")
        const { default: productsFs } = await import("./fs/products.fs.manager.js")
        const { default: usersFs } = await import("./fs/users.fs.manager.js")
        const { default: ordersFs } = await import("./fs/orders.fs.manager.js")
        dao = { products: productsFs, users: usersFs, orders: ordersFs }
        break;
    case "test":
        console.log("MEMORY CONNECTED")
        const { default: productsMemory } = await import("./memory/products.memory.js")
        const { default: usersMemory } = await import("./memory/user.memory.js")
        const { default: ordersMemory } = await import("./memory/orders.memory.js")
        dao = { products: productsMemory, users: usersMemory, orders: ordersMemory }
        break;


    default:
        break;
}

export default dao