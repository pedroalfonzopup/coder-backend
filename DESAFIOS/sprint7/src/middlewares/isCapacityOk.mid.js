import { products } from "../data/mongo/manager.mongo.js";

export default (req, res, next) => {
    try {
      const { pid, quantity } = req.params;
      const one = products.readOne(pid);
      if (one.stock >= quantity) {
        return next()
      } else {
        const error = new Error("There isn't more stock");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      return next(error)
    }
  }