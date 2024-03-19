import "dotenv/config.js";
import express from "express";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.js";
import socketUtils from "./src/utils/socket.util.js"

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

const server = express();
const PORT = 8080;
const ready = () => {
  console.log("Server ready on port " + PORT);
  dbConnection()
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
// Chequear
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

// ENDPOINTS
const router = new IndexRouter()
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };