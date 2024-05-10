import CustomRouter from "../CustomRouter.js";
import { read, readByEmail, readOne, create, update, destroy } from "../../controllers/users.controller.js"

export default class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read)
    this.read("/email/:email", ["ADMIN"], readByEmail)
    this.read("/:uid", ["ADMIN"], readOne)
    this.create("/", ["PUBLIC"], create)
    this.update("/:uid", ["ADMIN"], update)
    this.destroy("/:uid", ["ADMIN"], destroy)
  }
}