import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    const filter = {}
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 }
    }
    
    const all = await products.read({ filter, sortAndPaginate });
    return res.render("real", { title: "REAL", products: all })
  } catch (error) {
    return next(error);
  }
});

export default realRouter;
