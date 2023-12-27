const fs = require("fs");

//writeFile readFile unlink

const ruta = "./04_fs_desafio_2/dataAsync.json";
const contenido = JSON.stringify([{ nombre: "Pedro" }, { nombre: "Laura" }]);

fs.writeFile(ruta, contenido, (error)=>{
    if(error) {
        return error
    }
})

const configuracion = "utf-8"

fs.readFile(ruta, configuracion, (error, exito)=>{
    if(error) {
        return error
    } else {
        return exito
    }
})

fs.unlink(ruta, (error)=>{
    if(error) {
        return error
    }
})