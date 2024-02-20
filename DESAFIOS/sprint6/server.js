import "dotenv/config.js";
import express from "express";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.js";

// A IMPLEMENTAR
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import expressSession from "express-session"
import sessionFileStore from "session-file-store";

import morgan from "morgan";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import products from "./src/data/fs/products.fs.manager.js";
import { users } from "./src/data/mongo/manager.mongo.js";

const server = express();
const PORT = 8080;
const ready = () => {
  console.log("Server ready on port " + PORT);
  dbConnection()
}
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  console.log("client " + socket.id + " connected");

  //EMITS y ONS
  socket.emit("products", products.read());
  socket.on("newProduct", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("products", products.read());
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("registerUser", async (data) => {
    try {
      await users.create(data)
    } catch (error) {
      console.log(error)
    }
  })
  socket.on("loginUser", async (data) => {
    try {
     const { email, password } = data
     const dbUser = await users.readByEmail(data.email)
    if ( email === dbUser.email && password === dbUser.password ) {
      session.email = email
      session.role = "user" 
      socketServer.emit("loginSucess", "Logged in!")
    } else {
      socketServer.emit("loginFailed", "User does not exist!")
    } 
    } catch (error) {
      console.log(error)
    }
  })
});


// VISTAS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// MIDDLEWARES
const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(process.env.SECRET_KEY))
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_LINK,
    })
  })
)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

// ENDPOINTS
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
