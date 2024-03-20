import { model, Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products"
const schema = new Schema(
    {
        title: { type: String, required: true },
        photo: { 
            type: String,
            default: "https://png.pngtree.com/thumb_back/fw800/background/20220309/pngtree-cartoon-box-warehouse-packing-cargo-photo-image_5161976.jpg"
        },
        price: { type: Number, required: true},
        stock: { type: Number, required: true}
    },{ timestamps: true }
)

schema.plugin(mongoosePaginate)

const Product = model(collection, schema)
export default Product