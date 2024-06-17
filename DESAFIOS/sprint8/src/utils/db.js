import { connect } from "mongoose";
import winston from "./loggers/loggers.index.js";
import env from "./env.util.js";

const dbConnection = async () => {
  try {
    await connect(env.DB_LINK);
    winston.INFO("connected to db");
  } catch (error) {
    winston.ERROR(error);
  }
};

export default dbConnection;
