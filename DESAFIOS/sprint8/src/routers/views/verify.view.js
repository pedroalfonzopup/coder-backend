import CustomRouter from "../CustomRouter.js";

export default class VerifyRouter extends CustomRouter {
    init () {
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
                return res.render("verify", { title: "VERIFY"})
            } catch (error) {
                return next(error)
            }
        })
    }
}