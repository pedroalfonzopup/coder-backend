import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js"

import { products } from "../../data/mongo/manager.mongo.js";

import OrdersRouter from "./orders.view.js";
import SessionsRouter from "./sessions.view.js";
import ProductsRouter from "./products.view.js";

const orders = new OrdersRouter()
const ordersRouter = orders.getRouter()
const sessions = new SessionsRouter()
const sessionsRouter = sessions.getRouter()
const productsR = new ProductsRouter()
const productsRouter = productsR.getRouter()

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/orders", passCallBack("jwt"), ordersRouter)
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/products", productsRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 6,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          sortAndPaginate.sort.title = "desc";
        }
        const all = await products.read({ filter, sortAndPaginate });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
