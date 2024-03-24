import { orders } from "../data/mongo/manager.mongo.js";

class OrdersService {
    constructor(){
        this.model = orders
    }
    read = async ({filter, sortAndPaginate}) => {
        try {
            const response = await this.model.read({filter, sortAndPaginate})
            return response
        } catch (error) {
            throw error
        }
    }
    readOne = async (oid) => {
        try {
            const response = await this.model.readOne(oid)
            return response
        } catch (error) {
            throw error
        }
    }
    create = async (data) => {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            throw error
        }
    }
    update = async (oid, data) => {
        try {
            const response = await this.model.update(oid, data)
            return response
        } catch (error) {
            throw error
        }
    }
    destroy = async (oid) => {
        try {
            const response = await this.model.destroy(oid)
            return response
        } catch (error) {
            throw error
        }
    }
}

const ordersService = new OrdersService()
export default ordersService