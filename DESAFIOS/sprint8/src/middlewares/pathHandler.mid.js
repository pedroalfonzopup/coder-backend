import winston from "../utils/winston.util.js";


function pathHandler(req, res, next) {
  winston.warn(`${req.method} ${req.url} not found path`)
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} not found path`,
  });
}

export default pathHandler;
