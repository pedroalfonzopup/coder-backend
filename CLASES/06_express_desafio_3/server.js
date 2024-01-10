import express from "express"

const server = express()

const PORT = 8080
const ready = () => console.log("Server levantado en el puerto 8080")

//MIDDLEWARE : SON FUNCIONES

server.use(express.urlencoded({extended: true}))
// NOS PERMITE USAR URLS COMPLEJAS CON QUERYS Y PARAMS


server.listen(PORT, ready)

//END POINTS

const ruta = "/"
const funcionALeer = (requerimientos, respuesta) => {
    //Requerimientos: Objeto con todas las necesidades de la función
    //Respuesta: Objeto a enviar al cliente

    return respuesta.status(200).send("MY FIRST SERVER")
}

server.get(ruta, funcionALeer)
//Defino una ruta de tipo GET
// Con la palabrita "/"
//Para que ejecute la funcion definida
//Para que en este caso SOLAMENTE ENVIE EL STRING

const ruta2 = "/events"

const funcion2 = (requerimientos, respuestas) => {
    const all = ["aca", "deberian", "estar", "los eventos"]
    return respuestas.status(200).send(all)
}

server.get(ruta2, funcion2)

const ruta3 = "/api/users"

//Endpoints representativos, ingles, plural, minusculas
const funcion3 = (req, res) => {
    const users = ["array", "de", "usuarios"]
    return res.status(200).json(users)
}

server.get(ruta3, funcion3)

const rutaConParams1 = "/api/products/:pid"
// :pid 
// Los : ayuda a la maquina a entender que es un params

const cbParams1 = (req, res) => {
    const { pid } = req.params
    return res.status(200).send("el id del producto a filtrar es"+pid)
}

server.get(rutaConParams1, cbParams1)

const rutaConParams2 = "/api/products/:title/:category/:price/:stock"

const cbParams2 = (req, res) => {
    const { title, category, price, stock} =  req.params
    return res.status(200).json({
        title, category
    })
}

server.get(rutaConParams2, cbParams2)
