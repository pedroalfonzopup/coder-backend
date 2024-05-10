import CustomError from "./errors/CustomError.util.js";
import errors from "./errors/errors.utils.js";

function has8char(password) {
  if (password.length < 8) {
    CustomError.new(errors.no8char)
  }
}


export default has8char;
