import CustomRouter from "../CustomRouter.js";
import { checkout } from "../../controllers/payments.controller.js";

export default class PaymentsRouter extends CustomRouter {
    init() {
      this.create("/checkout", checkout)
    }
  }