import { Router } from "express";
import products from "../../data/fs/products.fs.manager.js";

const realRouter = Router();

realRouter.get("/", async (req, res, next) => {
  try {
    const AllProducts = await products.read();
    return res.render("real", { products: AllProducts, title: "REAL" });
  } catch (error) {
    next(error);
  }
});

export default realRouter;
