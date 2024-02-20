import { Router } from "express";
//import products from "../../data/fs/products.fs.manager.js";
import { products } from "../../data/mongo/manager.mongo.js"

const productsRouter = Router();

// ENDPOINTS
productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {}
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 }
    }
    
    const all = await products.read({ filter, sortAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      response: "product succefully created with id: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body
    const response = await products.update(data, pid);
    return res.json({
      statusCode: 200,
      response: response
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response: response
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
