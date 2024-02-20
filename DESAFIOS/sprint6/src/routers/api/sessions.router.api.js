import { Router } from "express"
import { users } from "../../data/mongo/manager.mongo.js"
import has8char from "../../middlewares/has8char.mid.js"
import isValidPass from "../../middlewares/isValidPass.mid.js"

const sessionsRouter = Router()

//ENDPOINTS
//REGISTER
sessionsRouter.post("/register", has8char, async (req, res, next) => {
    try {
        const data = req.body
        await users.create(data)
        return res.json({
            statusCode: 201,
            message: "Registered succesfully!",
        })
    } catch (error) {
        return next(error)
    }
})

//LOGIN
sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
    try {
        const { email, password } = req.body
        const dbUser = await this.model.readByEmail(email)
        if ( email === dbUser.email && password === dbUser.password ) {
            req.session.email = email
            req.session.role = "user" 
            return res.json({
                statusCode: 200,
                message: "Logged in!",
                session: req.session,
            })
        } else {
            const error = new Error("Bad Auth");
            error.statusCode = 401;
            throw error;  
        }
        
    } catch (error) {
        return next(error)
    }
})

//SIGNOUT
sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        if (req.session.email) {
            req.session.destroy()
            return res.json({
                statusCode: 200,
                message: "Signed out!"
            })
        } else {
            const error = new Error("No Auth");
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter;
