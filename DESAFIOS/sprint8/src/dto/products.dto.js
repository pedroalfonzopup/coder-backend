import args from "../utils/args.util.js"
import crypto from "crypto"

class ProductDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
        
        this.title = data.title
        this.photo = data.photo || "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg"
        this.price = data.price
        this.stock = data.stock
    }
}

export default ProductDTO