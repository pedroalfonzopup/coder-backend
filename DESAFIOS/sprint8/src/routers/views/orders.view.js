import CustomRouter from "../CustomRouter.js";

import dao from "../../data/index.factory.js"
const { users, orders } = dao

//import passCallback from "../../middlewares/passCallBack.mid.js"

export default class OrderRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
              const user = await users.readByEmail(req.user.email);
              
              const all = await orders.readByUser(user._id);
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