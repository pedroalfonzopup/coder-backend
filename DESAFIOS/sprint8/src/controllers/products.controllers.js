import productsService from "../services/products.service.js"

class ProductsController {
    constructor(){
        this.service = productsService
    }
    create = async (req, res, next) => {
        try {
            const data = req.body
            const response = await this.service.create(data)
            return res.success201(response._id)
        } catch (error) {
            return next(error)
        }
    }
    read = async (req, res, next) => {
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
            const all = await this.service.read({ filter, sortAndPaginate });
            return res.success200(all)
        } catch (error) {
            return next(error)
        }
    }
    readOne = async (req, res, next) => {
        try {
            const { pid } = req.params
            const one = await this.service.readOne(pid)
            return res.success200(one)
        } catch (error) {
            return next(error)
        }
    }
    update = async (req, res, next) => {
        try {
            const { pid } = req.params
            const data = req.body
            const response = await this.service.update(pid, data)
            return res.success200(response)
        } catch (error) {
            return next(error)
        }
    }
    destroy = async (req, res, next) => {
        try {
            const [pid] = req.params
            const response = await this.service.destroy(pid)
            return res.success200(response)
        } catch (error) {
            return next(error)
        }
    }
}

export default ProductsController
const controller = new ProductsController()
const { create, read, readOne, update, destroy } = controller
export { create, read, readOne, update, destroy }