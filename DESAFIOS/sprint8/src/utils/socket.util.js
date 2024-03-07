import products from "../data/fs/products.fs.manager.js";
import { users } from "../data/mongo/manager.mongo.js";

export default (socket) => {
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
  }