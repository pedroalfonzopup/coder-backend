import env from "../../src/utils/env.util.js"
import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:" + env.PORT + "/api")


describe("Testeando rutas de productos en COSMOS API", () => {
    const user = {
        name: "Prueba1412",
        email: "prueba15345@coder.com",
        password: "prueba123",
        role: 1,
    }
    let uid 
    let token = {}

    it("Registro de usuario", async () => {
        const response = await requester.post("/sessions/register").send(user)
        const { _body, statusCode } = response
        const userCreated = await requester.get("/users/email/" + user.email)
        uid = userCreated._id
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

    // EMPEZANDO TESTEO DE PRODUCTOS


    const product = {
        title: "Silla de Probador",
        price: 100,
        stock: 10,
    }
    let pid
    
    const updated = {
        title: "Silla probada",
        price: 200,
        stock: 15,
    }

    it("Creando producto", async () => {
        const responseRequest = await requester.post("/products/").send(product)
        const { response, statusCode } = responseRequest
        pid = response._id
        expect(statusCode).to.be.equals(200)
    })

    it("Leer producto", async () => {
        const response = await requester.get("/products/")
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })
    
    it("Leer un producto", async () => {
        const response = await requester.get("/products/" + pid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Actualizando producto", async () => {
        const response = await requester.put("/products/" + pid).send(updated)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Eliminando producto", async () => {
        const response = await requester.delete("/products/" + pid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })



    // CERRANDO SESION


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