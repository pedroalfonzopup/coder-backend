import { model, Schema, Types} from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

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

//65c01e570ab9c0aa6c2a19f2  //IGNA BACAN
//65c01e980ab9c0aa6c2a1a01  //Balanza
//65c01e980ab9c0aa6c2a19ff  //Equipo Mate
//65c01e980ab9c0aa6c2a19fb  //Mate
schema.plugin(mongoosePaginate)

const Order = model(collection, schema)
export default Order