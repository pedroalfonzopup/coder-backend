import args from "../utils/args.util.js";
import crypto from "crypto"
import { createHash } from "../utils/hash.util.js";

class UserDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.name = data.name
        this.photo = data.photo || "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
        this.email = data.email
        this.password = createHash(data.password)
        this.role = data.role || "0"
        this.verified = data.verified || false;
        this.verifiedCode = crypto.randomBytes(12).toString("base64")
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UserDTO