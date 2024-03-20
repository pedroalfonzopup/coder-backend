import CustomRouter from "../CustomRouter.js"
//import { users } from "../../data/mongo/manager.mongo.js"
import has8char from "../../middlewares/has8char.mid.js"
import passport from "../../middlewares/passport.mid.js"
import passCallBack from "../../middlewares/passCallBack.mid.js"

export default class SessionRouter extends CustomRouter {
  init() {
    //REGISTER LOCAL
    this.create(
      "/register", ["PUBLIC"],
      has8char,
      //AUNTHENTICATE
      passCallBack("register"),
      async (req, res, next) => {
          try {
            return res.success201("Registered!")
          } catch (error) {
            return next(error);
          }
        }
    );
    //LOGIN LOCAL 
    this.create(
      "/login", ["PUBLIC"],
      passCallBack("login"),
      async (req, res, next) => {
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
    );
    this.create(
      "/", ["PUBLIC"],
      passCallBack("jwt"), 
      async (req, res, next) => {
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
    });
    //SESSION GOOGLE y CALLBACK
    this.create(
      "/google", ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback", ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          const session = req.session
          return res.success200(
            "Logged in with google!",
            session
          )
          // return res.json({
          //   statusCode: 200,
          //   message: "Logged in with google!",
          //   session: req.session,
          // });
        } catch (error) {
          return next(error);
        }
      }
    );
    //SIGNOUT y CALLBACK
    this.create(
      "/signout", ["PUBLIC"],
      //AUNTHENTICATE
      passCallBack("jwt"),
      async (req, res, next) => {
        try {
          return res
              .clearCookie("token")
              .success200("Signed out succesfully!")
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read("/signout/cb", ["PUBLIC"], (req, res, next) => {
      try {
        return res.success200("Already done")
      } catch (error) {
        return next(error);
      }
    }
  );
  //BADAUTH
  this.read("/badauth", ["PUBLIC"], (req, res, next) => {
      try {
        return res.success200("Bad auth")
      } catch (error) {
        return next(error);
      }
    }
  );
  }
}



