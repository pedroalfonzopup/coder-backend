const edad = 33

// TERNARIOS
// (CONDICION) ? (QUE PASA SI ES VERDADERO) : (QUE PASA SI ES FALSO)
edad>18 ? console.log("Sos mayor de edad") : console.log("sos menor de edad")

// && (SE EJECUTA SI LA CONDICION ES VERDADERA SOLAMENTE)

edad>18 && console.log("En efecto, sos mayor")

const nula = null

// ?? (LOS DOS SIGNOS PREGUNTAN SI ESE VALOR ES NULL O UNDEFINED, si asi es, SE EJECUTA LO SIGUIENTE)
nula ?? console.log("La variable es nula o no esta definida")