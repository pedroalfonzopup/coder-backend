import ordersService from "../services/orders.service.js"

class OrdersController {
    constructor(){
        this.service = ordersService
    }
    read = async (req, res, next) => {
        try {
          const sortAndPaginate = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: req.query.sort,
            lean: true,
          }
          const filter = {};
          if (req.query.user_id) {
            filter.user_id = req.query.user_id;
          }
          const all = await this.service.read({ filter, sortAndPaginate })
          return res.success200(all)
        } catch (error) {
          return next(error)
        }
    }
    readOne = async (req, res, next) => {
        try {
          const { oid } = req.params;
          const one = await this.service.readOne(oid);
          return res.success200(one)
        } catch (error) {
          return next(error);
        }
    } 
    readByUser = async (req, res, next) => {
      try {
        const { user_id } = req.params
        const one = await this.service.readOne(user_id)
        return res.success200(one)
      } catch (error) {
        return next(error)
      }
    }
    create = async (req, res, next) => {
        try {
          const data = req.body;
          const response = await this.service.create(data);
          return res.success201(response._id)
        } catch (error) {
          return next(error);
        }
    }
    update = async (req, res, next) => {
        try {
          const { oid } = req.params;
          const data = req.body
          const response = await this.service.update(oid, data);
          return res.success200("order with id " + response + " updated successfully")
        } catch (error) {
          return next(error);
        }
    }
    destroy = async (req, res, next) => {
        try {
          const { oid } = req.params;
          const response = await this.service.destroy(oid);
          return res.success200("order by the id: " + response + " successfully deleted")
        } catch (error) {
          return next(error);
        }
    }
}

export default OrdersController
const controller = new OrdersController()
const { read, readOne, create, update, destroy, readByUser } = controller
export { read, readOne, create, update, destroy, readByUser }
