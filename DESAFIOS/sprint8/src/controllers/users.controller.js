import usersService from "../services/users.service.js"

class UsersController {
    constructor(){
        this.service = usersService
    }
    read = async (req, res, next) => {
        try {
          const sortAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { email: 1 },
            lean: true
        }
        const filter = {}
        if (req.query.email) {
            filter.email = new RegExp(req.query.email.trim(), "i");
          }
        if (req.query.sort === "desc") {
          sortAndPaginate.sort.email = "desc"
        }
        const all = await this.service.read({ filter, sortAndPaginate })
        return res.success200(all)
        } catch (error) {
          return next(error)
        }
    }
    readByEmail = async (req, res, next) => {
        try {
          const { email } = req.params
          const one = await this.service.readByEmail(email)
          return res.success200(one)
        } catch (error) {
          return next(error)
        }
    }
    readOne = async (req, res, next) => {
        try {
          const { uid } = req.params
          const one = await this.service.readOne(uid)
          return res.success200(one)
        } catch (error) {
          return next(error)
        }
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
    update = async (req, res, next) => {
        try {
          const { uid } = req.params
          const data = req.body
          const one = await this.service.update(uid, data)
          return res.success200(one)
        } catch (error) {
          return next(error)
        }
    }
    destroy = async (req, res, next) => {
        try {
          const { uid } = req.params
          const one = await this.service.destroy(uid)
          return res.success201(one)
         } catch (error) {
           return next(error)
        }
    }
}

export default UsersController
const controller = new UsersController()
const { read, readByEmail, readOne, create, update, destroy } = controller
export { read, readByEmail, readOne, create, update, destroy }