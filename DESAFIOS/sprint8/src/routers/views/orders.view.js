import CustomRouter from "../CustomRouter.js";

import dao from "../../data/index.factory.js"
const { users, orders } = dao

import passCallback from "../../middlewares/passCallBack.mid.js"

export default class OrderRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], passCallback("jwt"), async (req, res, next) => {
            try {
              const sortAndPaginate = {
                limit: req.query.limit || 5,
                page: req.query.page || 1,
                sort: { title: 1 },
                lean: true,
              };
              const user = await users.readByEmail(req.user.email);
              const filter = {
                user_id: user._id,
              };
              const all = await orders.read({ filter, sortAndPaginate });
              return res.render("orders", { 
                title: "MY CART",
                orders: all.docs,
                next: all.nextPage,
                prev: all.prevPage,
                filter: req.querry.title,
            });
            } catch (error) {
              return res.render("orders", {
                title: "MY CART",
                message: "There are no orders yet!",
              });
            }
          });
    }
}