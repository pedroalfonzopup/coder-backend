import  dao from "../data/index.factory.js"
import OrderDTO from "../dto/orders.dto.js"

const { orders } = dao

class OrdersRep {
    constructor (){
        this.model = orders
    }
    create = async (data) => {
        data = new OrderDTO(data)
        const response = await this.model.create(data)
        return response
    }
    read = async ({ filter, sortAndPaginate }) => await this.model.read({filter, sortAndPaginate})
    readOne = async (oid) => await this.model.readOne(oid)
    readByUser = async (user_id) => await this.model.readOne(user_id)
    update = async (oid, data) => await this.model.update(oid, data)
    destroy = async (oid) => await this.model.destroy(oid)
}

const repository = new OrdersRep()
export default repository