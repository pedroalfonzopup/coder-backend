import { Router } from "express";
//import users from "../../data/fs/users.fs.manager.js";
import { users } from "../../data/mongo/manager.mongo.js"

const usersRouter = Router();

// ENDPOINTS
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.read({});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const one = await users.readByEmail(email);
    return res.json({
      statusCode: 200,
      respone: one,
    });
  } catch (error) {
    return next(error);
  }
})

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      respone: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      response: "user successfully created with id: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params
    const data = req.body
    const one = await users.update(uid, data)
    return res.json({
      statusCode: 200,
      response: one
    })
  } catch (error) {
    return next(error)
  }
})
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params
    const one = await users.destroy(uid)
    return res.json({
      statusCode: 200,
      response: one
    })
  } catch (error) {
    return next(error)
  }
})
export default usersRouter;
