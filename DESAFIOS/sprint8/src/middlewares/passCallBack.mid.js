import passport from "passport";
import errors from "../utils/errors/errors.utils.js";
import CustomError from "../utils/errors/CustomError.util.js"
import winston from "../utils/loggers/loggers.index.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      winston.HTTP({ error, user, info });
      if (error) {
        return next(error);
      }
      if (!user) {
        CustomError.new(errors.callbackPass(info.message || info.toString(), info.statusCode || 401))
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
