import env from "../../src/utils/env.util.js"
import { expect } from "chai"
import supertest from "supertest"

const requester = supertest("http://localhost:" + env.PORT + "/api")


describe("Testeando rutas de usuarios en COSMOS API", () => {

    // PRUEBA DE RUTAS DE USUARIOS Y SESSIONS
    const user = {
        name: "Prueba45gr",
        email: "prueba1123@coder.com",
        password: "prueba123123",
        role: 1,
    }
    let uid 
    let token = {}

    it("Registro de usuario", async () => {
        const response = await requester.post("/sessions/register").send(user)
        const { statusCode } = response
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

    it("Leer usuarios", async () => {
        const response = await requester.get("/users/")
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Leer usuarios por email", async () => {
        const response = await requester.get("/users/email/" + user.email)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Leer un usuario", async () => {
        const response = await requester.get("/users/" + uid)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    // CREAR NUEVO USUARIO PARA EL UPDATE

    const user2 = {
        name: "Deprecado",
        email: "deprecado@coder.com",
        password: "deprecado123",
        role: 1,
    }
    let uid2 

    const updated = {
        name: "actualizado",
        email: "actualizado@coder.com",
        password: "actualizado123",
        role: 1,
    }

    it("Creando usuario para update", async () => {
        const responseRequest = await requester.post("/users/").send(user2)
        const { response, statusCode } = responseRequest
        //const userCreated = await requester.get("/users/email/" + user2.email)
        uid2 = response._id
        expect(statusCode).to.be.equals(200)
    })

    it("Actualizando usuario", async () => {
        const response = await requester.put("/users/" + uid2).send(updated)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    it("Eliminación usuario de update", async () => {
        const response = await requester.delete("/users/" + uid2)
        const { statusCode } = response
        expect(statusCode).to.be.equals(200)
    })

    // TERMINADA PRUEBA DE UPDATE - 
    // CERRANDO Y ELIMINADO USUARIO ORIGINAL

    
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