import winston from "../utils/loggers/loggers.index.js";


function errorHandler(error, req, res, next) {
  if (error) {
    error.statusCode = 500
    winston.ERROR(error.message)
  }
  winston.WARN(error.message);
  return res.json({
    statusCode: error.statusCode,
    url: `${req.method} ${req.url}`,
    message:  error.message,
  });
}

export default errorHandler;
