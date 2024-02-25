import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"
import realRouter from "./real.view.js";
import registerRouter from "./register.view.js";
import formRouter from "./form.view.js";
import loginRouter from "./login.view.js";

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

viewsRouter.use("/form", formRouter);
viewsRouter.use("/real", realRouter);
viewsRouter.use("/register", registerRouter);
viewsRouter.use("/login", loginRouter)

export default viewsRouter;
