import { model, Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users"
const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String }, 
        photo: {
            type: String,
            default: "ttps://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
        },
        age: { type: Number },
        role: { type: Number, required: true },
        verified: { type: Boolean, default: false },
        verifiedCode: { type: String }
    }, { timestamps: true }
)

schema.plugin(mongoosePaginate)

const User = model(collection, schema)
export default User