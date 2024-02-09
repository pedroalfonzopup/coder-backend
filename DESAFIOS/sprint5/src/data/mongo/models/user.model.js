import { model, Schema } from "mongoose"

const collection = "users"
const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // AGREGAR EN LA DB y EL REQUIRED
        photo: {
            type: String,
            default: "ttps://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
        },
        age: { type: Number, required: true}
    }, { timestamps: true }
)

const User = model(collection, schema)
export default User