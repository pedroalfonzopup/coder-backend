
const fs = require("fs");


const configuracion = "utf-8"
const ruta = "./04_fs_desafio_2/dataProm.json";
const contenido = JSON.stringify([{ nombre: "Pedro" }, { nombre: "Laura" }], null, 2);


fs.promises
    .writeFile(ruta, contenido)
    .catch((error) => console.log(error)),

fs.promises
    .readFile(ruta, configuracion)
    .then(resultado => console.log(JSON.parse(resultado)))
    .catch((error) => console.log(error))



fs.promises
    .unlink(ruta)
    .catch((error) => console.log(error))
