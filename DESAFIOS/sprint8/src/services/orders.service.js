import repository from "../repositories/orders.rep.js"

class OrdersService {
    constructor(){
        this.repository = repository
    }
    read = async ({filter, sortAndPaginate}) => {
        try {
            const response = await this.repository.read({filter, sortAndPaginate})
            return response
        } catch (error) {
            throw error
        }
    }
    readOne = async (oid) => {
        try {
            const response = await this.repository.readOne(oid)
            return response
        } catch (error) {
            throw error
        }
    }
    readByUser = async (user_id) => {
        try {
            const response = await this.repository.readOne(user_id)
            return response
        } catch (error) {
            throw error
        }
    }
    create = async (data) => {
        try {
            const response = await this.repository.create(data)
            return response
        } catch (error) {
            throw error
        }
    }
    update = async (oid, data) => {
        try {
            const response = await this.repository.update(oid, data)
            return response
        } catch (error) {
            throw error
        }
    }
    destroy = async (oid) => {
        try {
            const response = await this.repository.destroy(oid)
            return response
        } catch (error) {
            throw error
        }
    }
}

const ordersService = new OrdersService()
export default ordersService