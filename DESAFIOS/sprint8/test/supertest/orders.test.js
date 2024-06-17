import env from "../../src/utils/env.util.js"
import { expect } from "chai"
import { response } from "express"
import supertest from "supertest"

const requester = supertest("http://localhost:" + env.PORT + "/api")
console.log(env.PORT)

describe("Testeando rutas de ordernes en COSMOS API", () => {
    const user = {
        name: "Prueba42",
        email: "prueba22@coder.com",
        password: "prueba123123",
        role: 1,
    }
    let uid 
    let token = {}

    const product = {
        title: "Silla de Probador",
        price: 100,
        stock: 10,
    }
    let pid
    
    


    it("Registro de usuario", async () => {
        const response = await requester.post("/sessions/register").send(user)
        const { statusCode } = response
        const userCreated = await requester.get("/users/email/" + user.email)
        uid = userCreated._id
        console.log(uid)
        expect(statusCode).to.be.equals(200)
    })

    const loginUser = {
        name: "Usuarioprueba",
        email: "Debidoaconfirmacion@gmail.com",
        password: "Pormail12345"
    }

    it("Inicio de sesión", async () => {
        const response = await requester.post("/sessions/login").send(loginUser)
        const { statusCode, headers } = response
        token.key = headers["set-cookie"][0].split("=")[0]
        token.value = headers["set-cookie"][0].split("=")[1]
        expect(statusCode).to.be.equals(200)
    })

    it("Creando producto", async () => {
        const responseRequest = await requester.post("/products/").send(product)
        const { response, statusCode } = responseRequest
        pid = response
        expect(statusCode).to.be.equals(200)
    })

    // EMPEZANDO TESTEO DE ORDENES

    const order = {
        user_id: "2ef484618e49b29e90782361",
        product_id: "ed6e3fc9748d8681c9757da2",
        quantity: 4,
    }
    let oid

    const updated = {
        quantity: 8,
    }

    it("Creando una orden", async () => {
        const responseRequest = await requester.post("/orders/").send(order)
        const { response, statusCode } = responseRequest
        oid = response
        expect(statusCode).to.be.equals(200)
    })

    it("Leer TODAS ordenes", async () => {
        const response = await requester.get("/orders/")
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
    
    it("Leer una orden", async () => {
        const response = await requester.get("/orders/" + oid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Leer ordenes de un usuario", async () => {
        const response = await requester.get("/orders/user/" + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Actualizando una orden", async () => {
        const response = await requester.put("/orders/" + oid).send(updated) 
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Eliminando una orden", async () => {
        const response = await requester.delete("/orders/" + oid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    // CERRANDO SESION

    it("Eliminando producto", async () => {
        const response = await requester.delete("/products/" + pid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })


    it("Eliminación de un usuario", async () => {
        const response = await requester.delete("/users/" + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Cerrado de sesión", async () => {
        const response = await requester.post("/sessions/signout").set("cookie", [
            token.key + "=" + token.value,
        ])
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

})