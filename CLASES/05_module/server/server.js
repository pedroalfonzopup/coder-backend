//REQUIERO EN ESTE CASO Y POR AHORA HTTP
const http = require("http")
//REQUIERO EL MODULO NECESARIO PARA GESTIONAR SERVIDORES (Crearlo, configurarlo y levantarlo)

const server = http.createServer()
//.createServer() es el motodo para crear un servidor

//PARA INICIARLO NECESITO:
    //PUERTO: (8080)
    //CALLBACK para informarnos de que el servidor esta funcionando

const PORT = 8080
const cbReady = () => console.log("Servidor listorti en "+PORT)

server.listen(PORT, cbReady)
//listen() es el metodo necesario para iniciarlo