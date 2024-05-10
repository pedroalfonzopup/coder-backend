import { connect } from "mongoose";
import winston from "./loggers/loggers.index.js";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK);
    winston.INFO("connected to db");
  } catch (error) {
    winston.ERROR(error);
  }
};

export default dbConnection;
