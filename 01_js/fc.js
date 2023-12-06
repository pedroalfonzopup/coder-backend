let cuenta = 0;

function contador(numero) {
  cuenta = cuenta + numero
  console.log(cuenta)
}

const imprimir = palabra => console.log(palabra)

// imprimir("Imprimiendo...")

const concatenar = (tercera, cuarta) => {
  let primera = "Hola"
  let segunda = "mundo"
  console.log(primera, segunda, tercera, cuarta)
  console.log(primera + " " + segunda + " " + tercera + " " + cuarta)
  console.log(`${primera} ${segunda} ${tercera} ${cuarta}`)
};

// contador(50)
// concatenar("soy", "Pedro")


// // const corroborar = arreglo => {
// //     const tiposDeDato = arreglo.map(each=>({ valor: each, tipoDeDato: typeof each}))
// //     console.log(tiposDeDato)
// //     return tiposDeDato
// // }

// // const resultado = corroborar([1,"hola", null, false])
// // corroborar([NaN, true, imprimir, resultado])


class Persona {
    constructor (nombre, apellido, edad, ciudad) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.ciudad = ciudad
        this.agregarAlContador()
        this.ordenDeRegistro = Persona.cantidadDePersonas
    }

    static cantidadDePersonas = 0
    static admin = "CoderHouse"


    imprimir () {
        console.log(this)
    }

    imprimirNombreCompleto = () => console.log(this.nombre, this.apellido)

    agregarAlContador = () => {Persona.cantidadDePersonas++}

    static conocerAdmin = () => { console.log(Persona.admin)}
}

const alumno1 = new Persona("Pedro", "Alfonzo", "19", "Miramar")

alumno1.imprimir()
alumno1.imprimirNombreCompleto()

console.log(Persona.cantidadDePersonas)
console.log(Persona.conocerAdmin())
console.log(alumno1.ordenDeRegistro)