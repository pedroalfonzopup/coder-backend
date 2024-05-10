import env from "../env.util.js"

const enviroment = env.MODE || "prod"

let logger

switch (enviroment) {
    case "prod":
        const { default: winstonProd } = await import("./winston.prod.util.js")
        logger = winstonProd
        break;

    default:
        const { default: winstonDev } = await import("./winston.dev.util.js")
        logger = winstonDev
        break;
}

export default logger