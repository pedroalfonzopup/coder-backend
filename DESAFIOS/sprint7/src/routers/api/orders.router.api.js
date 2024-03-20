import { Router } from "express";
//import orders from "../../data/fs/orders.fs.manager.js";
import { orders } from "../../data/mongo/manager.mongo.js"

const ordersRouter = Router();

// ENDPOINTS
ordersRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: req.query.sort,
    }
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const all = await orders.read({ filter, sortAndPaginate })
    return res.json({
      statusCode: 200,
      response: all
    })
  } catch (error) {
    return next(error)
  }
})


ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);
    return res.json({
      statusCode: 200,
      response: "order created successfully with id: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body
    const response = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      response: "order with id " + response + " updated successfully",
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await products.destroy(oid);
    return res.json({
      statusCode: 200,
      response: "order by the id: " + response + " successfully deleted",
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
