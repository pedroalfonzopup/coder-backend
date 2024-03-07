// import { Router } from "express";
// //import orders from "../../data/fs/orders.fs.manager.js";
// import { orders } from "../../data/mongo/manager.mongo.js"

import CustomRouter from "../CustomRouter.js";
import { orders } from "../../data/mongo/manager.mongo.js"

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], async (req, res, next) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: req.query.sort,
          lean: true,
        }
        const filter = {};
        if (req.query.user_id) {
          filter.user_id = req.query.user_id;
        }
        const all = await orders.read({ filter, sortAndPaginate })
        return res.success200(all)
      } catch (error) {
        return next(error)
      }
    })
    this.read("/:oid", ["ADMIN"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const one = await orders.readOne(oid);
        return res.success200(one)
      } catch (error) {
        return next(error);
      }
    });
    this.create("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const data = req.body;
        const response = await orders.create(data);
        return res.success201("order created successfully with id: " + response)
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:oid", ["ADMIN"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const data = req.body
        const response = await orders.update(oid, data);
        return res.success200("order with id " + response + " updated successfully")
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:oid", ["ADMIN"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const response = await products.destroy(oid);
        return res.success200("order by the id: " + response + " successfully deleted")
      } catch (error) {
        return next(error);
      }
    });
  }
}