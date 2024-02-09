import { model, Schema, Types} from "mongoose"

const collection = "orders"
const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users"},
    product_id: { type: Types.ObjectId, required: true, ref: "products"},
    quantity: { type: Number, required: true},
    state: {
        type: String,
        enum: ["reserved", "paid", "delivered"],
        required: true,
        default: "reserved"
    },
},{ timestamps: true })

const Order = model(collection, schema)
export default Order