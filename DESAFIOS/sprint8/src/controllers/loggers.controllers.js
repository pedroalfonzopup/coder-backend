// No es necesario servicio
import winston from "../utils/loggers/loggers.index.js"

class LoggersController {
    testLogs = async (req, res, next) => {
        try {
            winston.INFO("Testing INFO log")
            winston.HTTP("Testing HTTP log")
            winston.WARN("Testing WARN log")
            winston.ERROR("Testing ERROR log")
        } catch (error) {
            return next(error)
        }
    }
}

export default LoggersController
const controller = new LoggersController()
const { testLogs } = controller
export { testLogs }