import args from "../utils/args.util.js";
import crypto from "crypto"

class OrderDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())

        this.user_id = data.user_id
        this.product_id = data.product_id
        this.quantity = data.quantity
        this.state = data.state || "reserved"
    }
}

export default OrderDTO