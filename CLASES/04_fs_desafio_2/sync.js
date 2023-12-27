const fs = require("fs")

//Crear archivo
let route = "./04_fs_desafio_2/data.json"

const data = JSON.stringify([{movie: "Mother"},{movie: "Father"}], null, 2)

fs.writeFileSync(route, data)

//Mostrar archivo
let configuration = "utf-8"
const datosLeidos = fs.readFileSync(route, configuration)
const datosParseados = JSON.parse(datosLeidos)

//Borrar archivo


//Ver si existe
const archivoExiste = fs.existsSync(route)

console.log(archivoExiste)


fs.unlinkSync(route)


console.log(archivoExiste)