import dao from "../data/index.factory.js";
import UserDTO from "../dto/users.dto.js"

const { users } = dao

class UsersRep {
    constructor(){
        this.model = users
    }
    create = async (data) => {
        data = new UserDTO(data)
        const response = await this.model.create(data)
        return response
    }
    readByEmail = async (email) => await this.model.readByEmail(email)
    read = async ({ filter, sortAndPaginate }) => await this.model.read({filter, sortAndPaginate})
    readOne = async (uid) => await this.model.readOne(uid)
    update = async (uid, data) => await this.model.update(uid, data)
    destroy = async (uid) => await this.model.destroy(uid)
}

const repository = new UsersRep()
export default repository
