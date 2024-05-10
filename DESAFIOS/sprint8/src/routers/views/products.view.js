import CustomRouter from "../CustomRouter.js";
import dao from "../../data/index.factory.js"
const { products } = dao

export default class ProductsRouter extends CustomRouter {
  init() {
    this.read("/real", ["PUBLIC"], async (req, res, nect) => {
      try {
        const sortAndPaginate = {
          limit: req.query.limit || 5,
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
      const all = await products.read({ filter, sortAndPaginate })
        return res.render("real", { 
          title: "REAL", 
          products: all.docs,
          filter: req.query.title,
          next: all.nextPage,
          prev: all.prevPage,
         })
      } catch (error) {
        return next(error)
      }
    })
    this.read("/form", ["ADMIN"], async (req, res, next) => {
      try {
        return res.render("form", { title: "FORM" })
      } catch (error) {
        return next(error)
      }
    })
  }
}
