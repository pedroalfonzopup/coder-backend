import jwt from "jsonwebtoken";
import env from "./env.util.js";

function createToken(data) {
  const token = jwt.sign(data, env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

function verifytoken(token) {
  if (token) {
    const data = jwt.verify(token, env.SECRET_KEY);
    return data;
  }
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifytoken };
