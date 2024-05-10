import CustomRouter from "../CustomRouter.js"
import passCallBackMid from "../../middlewares/passCallBack.mid.js"
import { create, read, readOne, update, destroy } from "../../controllers/products.controllers.js"

export default class productsRouter extends CustomRouter {
    init() {
        this.create( "/", ["ADMIN"], passCallBackMid("jwt"), create )
        this.read( "/", ["PUBLIC"], read )
        this.read( "/:pid", ["PUBLIC"], readOne )
        this.update( "/:pid", ["ADMIN"], update )
        this.destroy( "/:pid", ["ADMIN"], destroy )
    }
}