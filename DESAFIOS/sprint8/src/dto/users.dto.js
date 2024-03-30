import args from "../utils/args.util.js";
import crypto from "crypto"
import { createHash } from "../utils/hash.util.js";

class UserDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.name = data.name
        this.photo = data.photo || "ttps://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
        this.email = data.email
        this.password = createHash(data.password)
        this.role = data.role || "USER"
        this.verified = data.verified || false;
        this.verifiedCode = crypto.randomBytes(12).toString("base64")
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UserDTO