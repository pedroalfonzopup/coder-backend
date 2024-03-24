import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy } from "../../controllers/orders.controllers.js"

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read)
    this.read("/:oid", ["ADMIN"], readOne);
    this.create("/", ["PUBLIC"], create);
    this.update("/:oid", ["ADMIN"], update);
    this.destroy("/:oid", ["ADMIN"], destroy);
  }
}