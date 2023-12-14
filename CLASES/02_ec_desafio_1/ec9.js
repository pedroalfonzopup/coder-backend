const propietario = {
    nombre: "Juan",
    edad: 81,
    ciudad: "Buenos Aires"
}

const datosExtra = {
    propiedad: "Ruta 11",
    monto: 200
}

// SPREAD
const planillaCompleta = { ...propietario, ...datosExtra }

console.log(planillaCompleta)

// DESESTRUCTURACION y REST (...restoDeDatos toma los demas datos que no fueron especificadamente elegidos)
const { nombre, edad, propiedad, ...restoDeDatos } = planillaCompleta

console.log(nombre)
console.log(propiedad)
console.log(restoDeDatos)

// ESTRUCTURACION

const arma = "Lanza y espada"
const defensa = "Mediana"
const tipo = "Caballeria"

const Kent = { arma, defensa, tipo } 

console.log(Kent)