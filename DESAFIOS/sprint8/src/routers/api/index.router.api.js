import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.api.js"
import ProductsRouter from "./products.router.api.js"
import OrdersRouter from "./orders.router.api.js"
import SessionsRouter from "./sessions.router.api.js"
// import cookieRouter from "./cookie.router.api.js"

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const orders = new OrdersRouter()
const ordersRouter = orders.getRouter()
const sessions = new SessionsRouter()
const sessionsRouter = sessions.getRouter()
const users = new UsersRouter()
const usersRouter = users.getRouter()
const products = new ProductsRouter()
const productsRouter = products.getRouter()

export default class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", usersRouter)
        this.router.use("/orders", passCallBackMid("jwt"), ordersRouter)
        this.router.use("/sessions", sessionsRouter)
        this.router.use("/products", productsRouter)
    }
}