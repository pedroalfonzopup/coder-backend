// ALUMNO: Pedro Alfonzo Alvarez
// NOTA:

// class UserManager {
//     static #users = []

//     create(data) {
//         const user = {
//             id:
//                 UserManager.#users.length === 0 
//                     ? 1 
//                     : UserManager.#users[UserManager.#users.length-1].id+1,
//             name: data.name,
//             photo: data.photo || `Foto de ${data.name}`,
//             email: data.email,
//         }
//         UserManager.#users.push(user)
//     }
//     read() {
//         return UserManager.#users
//     }
//     readOne(id) {
//         return UserManager.#users.find((each) => each.id === Number(id))
//     }
// }

// class ProductManager {
//     static #products = []

//     create(data) {
//         const product = {
//             id:
//                 ProductManager.#products.length === 0 
//                     ? 1 
//                     : ProductManager.#products[ProductManager.#products.length-1].id+1,
//             title: data.title,
//             photo: data.photo || `Foto de ${data.title}`,
//             price: data.price,
//             stock: data.stock || 15,
//         }
//         ProductManager.#products.push(product)
//     }
//     read() {
//         return ProductManager.#products
//     }
//     readOne(id) {
//         return ProductManager.#products.find((each) => each.id === Number(id))
//     }
// }



// const users = new UserManager({})
// users.create({
//     name: "Pedro Alfonzo",
//     email: "fozo@gmail.com"
// })
// users.create({
//     name: "Igna Bacan",
//     email: "Bacanazo@gmail.com",
// })
// users.create({
//     name: "Juan Tuttolomondo",
//     email: "Tuttifrutti@gmail.com",
//     photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPC4qINNo1QGBfT-BqIA8DSgwF7YiAZC275zkiXLht9Te-OOtCfBo2bbyYxXxDfl0v2E&usqp=CAU",
// })
// users.create({
//     name: "Elias Zekha",
//     email: "Kemno@gmail.com",
// })



// const products = new ProductManager({})
// products.create({
//     title: "Libro",
//     price: 150,
// })
// products.create({
//     title: "Pava",
//     price: 200,
//     photo: "https://www.distriecono.com.ar/images/5654_00.jpg",
// })
// products.create({
//     title: "Silla",
//     price: 400,
// })
// products.create({
//     title: "Termo",
//     price: 250,
// })
// products.create({
//     title: "Mate",
//     price: 100,
// })
// products.create({
//     title: "Teclado",
//     price: 500,
// })


// console.log("||||||||||||USUARIOS con READ||||||||||||")
// console.log(users.read())
// console.log("|||||||||||||USUARIO readOne|||||||||||||")
// console.log(users.readOne(3))


// console.log("||||||||||||PRODUCTOS con read|||||||||||")
// console.log(products.read())
// console.log("|||||||||||||PRODUCTO readOne||||||||||||")
// console.log(products.readOne(5))