// import sessionsService from "../services/sessions.service.js"
import usersService from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.util.js";
import errors from "../utils/errors/errors.utils.js";

class SessionsController {
  constructor() {
    this.service = usersService
  }
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.body
    await this.service.register({ email, name, verifiedCode })
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
        .success200("Logged in succesfully!")
    } catch (error) {
      return next(error);
    }
  }
  loginJwt = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
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
  verifyAccount = async (req, res, next) => {
    try {
      const { verifiedCode, email } = req.body
      const user = await this.service.readByEmail(email)
      if (user.verifiedCode === verifiedCode) {
        await this.service.update(user._id, { verified: true })
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        })
      } else {
        CustomError.new(errors.token)
      }
    } catch (error) {
      return next(error)
    }
  }
}

export default SessionsController
const controller = new SessionsController()
const { verifyAccount, register, login, loginJwt, googleCallback, signout, signoutCallback, badauht } = controller
export { verifyAccount, register, login, loginJwt, googleCallback, signout, signoutCallback, badauht }