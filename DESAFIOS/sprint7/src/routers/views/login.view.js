import { Router } from "express";

const loginRouter = Router()

loginRouter.get("/", (req, res, next) => {
    try {
      return res.render("login", { title: "LOGIN" });
    } catch (error) {
      next(error);
    }
  });

export default loginRouter