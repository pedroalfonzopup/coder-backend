import __dirname from "../../../utils.js"

const SwaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "COSMOS API",
            description: "Documentation of API"
        }
    },
    apis: [`${__dirname}/src/docs/*.yaml`]
}

export default SwaggerOptions