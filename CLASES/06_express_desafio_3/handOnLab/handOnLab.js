import express from "express"
import users from "./data/fs/users.fs.manager.js"
import products from "./data/fs/products.fs.manager.js"

const server = express()

const PORT = 8080
const ready = () => console.log("Sever ready on port "+PORT)

server.use(express.urlencoded({ extended: true }))

server.listen(PORT, ready)

server.get("/api/users", (req,res) => {
    try {
        const all = users.read()
        return res.status(200).json(all)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

server.get("/api/users/:uid", (req, res) => {
    try {
        const { uid } = req.params
        return res.status(200).json(uid)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


