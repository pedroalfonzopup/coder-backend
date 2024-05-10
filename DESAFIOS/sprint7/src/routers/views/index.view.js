import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"
import sessionsRouter from "./sessions.view.js"
import productsRouter from "./products.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {}
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 }
    }
    
    const all = await products.read({ filter, sortAndPaginate });
    return res.render("index", { title: "INDEX", products: all })
  } catch (error) {
    return next(error);
  }
});

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/sessions", sessionsRouter)

export default viewsRouter;
