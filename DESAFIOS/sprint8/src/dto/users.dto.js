import args from "../utils/args.util.js";
import crypto from "crypto"

class UserDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
        this.name = data.name
        this.photo = data.photo || "ttps://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
        this.email = data.email
        this.password = data.password
        this.role = data.role
    }
}

export default UserDTO