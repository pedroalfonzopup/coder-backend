import dao from "../data/index.factory.js"
import winston from "./loggers/loggers.index.js";
const { users, products } = dao

export default (socket) => {
    winston.HTTP("client " + socket.id + " connected");
  
    //EMITS y ONS
    socket.emit("products", products.read());
    socket.on("newProduct", async (data) => {
      try {
        await products.create(data);
        socketServer.emit("products", products.read());
      } catch (error) {
        winston.ERROR(error);
      }
    });
    socket.on("registerUser", async (data) => {
      try {
        await users.create(data)
      } catch (error) {
        winston.ERROR(error)
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
        winston.ERROR(error)
      }
    })
  }