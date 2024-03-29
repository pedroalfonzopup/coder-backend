import CustomRouter from "../CustomRouter.js"
import has8char from "../../middlewares/has8char.mid.js"
import passport from "../../middlewares/passport.mid.js"
import passCallBack from "../../middlewares/passCallBack.mid.js"
import { register, login, loginJwt, googleCallback, signout, signoutCallback, badauht, verifyAccount } from "../../controllers/sessions.controllers.js"

export default class SessionRouter extends CustomRouter {
  init() {
    //REGISTER LOCAL
    this.create( "/register", ["PUBLIC"], has8char, passCallBack("register"), register );
    
    //LOGIN LOCAL 
    this.create( "/login", ["PUBLIC"], passCallBack("login"), login );
    this.create( "/", ["PUBLIC"], passCallBack("jwt"), loginJwt );

    //SESSION GOOGLE y CALLBACK
    this.create( "/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read( "/google/callback", ["PUBLIC"], passport.authenticate("google", {session: false, failureRedirect: "/api/sessions/badauth",}), googleCallback);

    //SIGNOUT y CALLBACK
    this.create( "/signout", ["PUBLIC"], passCallBack("jwt"), signout);
    this.read("/signout/cb", ["PUBLIC"], signoutCallback);

    //BADAUTH
    this.read("/badauth", ["PUBLIC"], badauht);
    
    //VERIFY
    this.create("/verify", ["PUBLIC"], verifyAccount)
  }
}



