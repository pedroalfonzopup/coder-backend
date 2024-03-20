import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"

const productsRouter = Router();

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form", { title: "FORM" });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/real", async (req, res, next) => {
    try {
      const filter = {}
      const sortAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 }
      }
      const all = await products.read({ filter, sortAndPaginate });
      console.log(all.docs)
      return res.render("real", { title: "REAL", products: all.docs })
    } catch (error) {
      return next(error);
    }
  });
export default productsRouter;
