import express from "express"
import {users} from "./data/fs/users.fs.manager.js"
import {products} from "./data/fs/products.fs.manager.js"

const server = express()

const PORT = 8080
const ready = () => console.log("Server ready on port "+PORT)

server.use(express.urlencoded({ extended: true }))

server.listen(PORT, ready)

server.get("/api/users", async (req,res) => {
    try {
        const all = await users.read()
        return res.status(200).json({
            success: true,
            response: (all)

        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "not found!"
        })
    }
})

server.get("/api/users/:uid", async (req, res) => {

    const { uid } = req.params
    try {
        const user = await users.readOne(uid)
        return res.status(200).json({
            success: true,
            response: (user)
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "not found!"
        })
    }
})



server.get("/api/products", async (req,res) => {
    try {
        const all = await products.read()
        return res.status(200).json({
            success: true,
            response: (all)
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "not found!"
        })
    }
})


server.get("/api/products/:pid", async (req, res) => {

    const { pid } = req.params
    try {
        const product = await products.readOne(pid)
        return res.status(200).json({
            success: true,
            response: (product)
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "not found!"
        })
    }
})