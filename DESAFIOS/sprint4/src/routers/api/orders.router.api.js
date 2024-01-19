import { Router } from "express";
import orders from "../../data/fs/orders.fs.manager.js";

const ordersRouter = Router();

// ENDPOINTS
ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const userOrders = await orders.readByUser(uid);
    return res.json({
      statusCode: 200,
      response: userOrders,
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

ordersRouter.put("/:oid/:quantity/:state", async (req, res, next) => {
  try {
    const { oid, quantity, state } = req.params;
    const response = await orders.update(oid, quantity, state);
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
