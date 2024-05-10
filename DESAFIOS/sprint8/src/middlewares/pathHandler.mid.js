import winston from "../utils/loggers/loggers.index.js";


function pathHandler(req, res, next) {
  winston.WARN(`${req.method} ${req.url} not found path`)
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} not found path`,
  });
}

export default pathHandler;
