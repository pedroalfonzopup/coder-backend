import CustomRouter from "../CustomRouter.js"
import { products } from "../../data/mongo/manager.mongo.js"
import isAdmin from "../../middlewares/isAdmin.mid.js"
import passCallBackMid from "../../middlewares/passCallBack.mid.js"

export default class productsRouter extends CustomRouter {
    init() {
        this.create(
            "/",
            ["ADMIN"],
            passCallBackMid("jwt"),
            isAdmin,
            async (req, res, next) => {
                try {
                    const data = req.body
                    const response = await products.create(data)
                    return res.success201(response)
                } catch (error) {
                    return next(error)
                }
            }
        )
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
                const sortAndPaginate = {
                    limit: req.query.limit || 10,
                    page: req.query.page || 1,
                    sort: { title: 1 },
                    lean: true
                }
                const filter = {}
                if (req.query.title) {
                    filter.title = new RegExp(req.query.title.trim(), "i");
                  }
                  if (req.query.sort === "desc") {
                    sortAndPaginate.sort.title = "desc";
                  }
                const all = await products.read({ filter, sortAndPaginate });
                return res.success200(all)
            } catch (error) {
                return next(error)
            }
          }
        )
        this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
            try {
                const { pid } = req.params
                const one = await products.readOne(pid)
                return res.success200(one)
            } catch (error) {
                return next(error)
            }
          }
        )
        this.update("/:pid", ["ADMIN"], async (req, res, next) => {
            try {
                const { pid } = req.params
                const data = req.body
                const response = await products.update(pid, data)
                return res.success200(response)
            } catch (error) {
                return next(error)
            }
          }
        )
        this.destroy("/:pid", ["ADMIN"], async (req, res, next) => {
            try {
                const [ pid ] = req.params
                const response = await products.destroy(pid)
                return res.success200(response)
            } catch (error) {
                return next(error)
            }
        })
    }
}