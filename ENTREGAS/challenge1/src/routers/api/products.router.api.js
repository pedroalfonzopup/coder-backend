import { Router } from "express"
import products from "../../data/fs/products.fs.manager.js"

const productsRouter = Router()

// ENDPOINTS
productsRouter.get("/", async (req, res, next) => {
    try {
        const all = await products.read()
        return res.json({
            statusCode: 200,
            response: all,
        })
    } catch (error) {
        return next(error)
    }
})

productsRouter.get("/pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await products.readOne(pid)
        return res.json({
            statusCode: 200,
            response: one,
        })
    } catch (error) {
        return next(error)
    }
})

productsRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body
        const response = await products.create(data)
        return res.json({
            statusCode: 201,
            response: "product succefully created with id: " + response
        })
    } catch (error) {
        return next(error)
    }
})

productsRouter.put("/:pid/:data", async (req, res, next) => {
    try {
        const { pid, data } = req.params
        const response = await products.update(data, pid)
        return res.json({
            statusCode: 200,
            response: "product with id " + response + " updated successfully"
        })
    } catch (error) {
        return next(error)
    }
})

productsRouter.delete("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const response = await products.destroy(pid)
        return res.json({
            statusCode: 200,
            response: "product by the id: " + response + "successfully deleted"
        })
    } catch (error) {
        return next(error)
    }
})

export default productsRouter
