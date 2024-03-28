// import sessionsService from "../services/sessions.service.js"
import usersService from "../services/users.service.js";

class SessionsController {
    constructor(){
      this.service = usersService
    }
    register = async (req, res, next) => {
      const { email, name } = req.body
      await this.service.register({ email, name})
      try {
          return res.success201("Registered!")
        } catch (error) {
          return next(error);
        }
    }
    login = async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 1 * 20 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success201("Logged in succesfully!")
        } catch (error) {
          return next(error);
        }
    }
    loginJwt = async (req, res, next) => {
        try {
          const user = {
            email: req.user.email,
            role: req.user.role,
            photo: req.user.photo,
          }
          return res.success200(user)
        } catch (error) {
          return next(error);
        }
    }
    googleCallback = async (req, res, next) => {
        try {
          const session = req.session
          return res.success200(
            "Logged in with google!",
            session
          )
        } catch (error) {
          return next(error);
        }
    }
    signout = async (req, res, next) => {
        try {
          return res
              .clearCookie("token")
              .success200("Signed out succesfully!")
        } catch (error) {
          return next(error);
        }
    }
    signoutCallback = (req, res, next) => {
        try {
          return res.success200("Already done")
        } catch (error) {
          return next(error);
        }
    }
    badauht = (req, res, next) => {
        try {
          return res.success200("Bad auth")
        } catch (error) {
          return next(error);
        }
    }
}

export default SessionsController
const controller = new SessionsController()
const { register, login, loginJwt, googleCallback, signout, signoutCallback, badauht } = controller
export { register, login, loginJwt, googleCallback, signout, signoutCallback, badauht }