import { Router } from "express"
import products from "../../data/fs/products.fs.manager.js"
import realRouter from "./real.view.js"
import registerRouter from "./register.view.js"
import formRouter from "./form.view.js"

const viewsRouter = Router()

viewsRouter.get("/", async (req, res, next) =>  {
    try {
        const AllProducts = await products.read()
        return res.render("index", { title: "INDEX", products: AllProducts })
    } catch (error) {
        next(error)
    }
})

viewsRouter.use("/form", formRouter)
viewsRouter.use("/real", realRouter)
viewsRouter.use("/register", registerRouter)

