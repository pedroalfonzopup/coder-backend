import env from "./src/utils/env.util.js"
import express from "express";
import __dirname from "./utils.js";
// import dbConnection from "./src/utils/db.js";
import socketUtils from "./src/utils/socket.util.js"
import args from "./src/utils/args.util.js";
import compression from "express-compression"
// import createUsers from "./src/data/mocks/users.mock.js";
// import createProducts from "./src/data/mocks/products.mock.js";

import cors from "cors"
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import expressSession from "express-session"
import sessionFileStore from "session-file-store";

import IndexRouter from "./src/routers/index.router.js";

import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import winston from "./src/utils/winston.util.js";

const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  winston.INFO("Server ready on port " + PORT);
  winston.INFO("mode "+ args.env)
}
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);


// VISTAS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// MIDDLEWARES
const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(env.SECRET_KEY))
server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: env.DB_LINK,
    })
  })
)
server.use(
  cors({
    origin: true,
    credentials: true
}) 
)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(compression({
    brotli: { enabled:true, zlib:{} }
  }))

// ENDPOINTS
const router = new IndexRouter()
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

// ASI CREE AMBOS PRODUCTOS Y USUARIOS
// No se si hacia falta hacerlo aqui, pero me aseguraba no meter
// Por error los mocks en prod
// for (let i = 1; i <= 100; i++) {
//   createUsers()
//   createProducts()
// }


export { socketServer };