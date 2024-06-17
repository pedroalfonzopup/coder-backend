import { config } from "dotenv"
import args from "./args.util.js"

const { env } = args
const path = (env === "prod") ? ("./.env.prod") : (((env == "dev") ? ("./.env.dev") : ("./.env.test")))
config({ path })

export default {
    PORT: process.env.PORT,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
    DB_LINK: process.env.DB_LINK,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_APP_EMAIL: process.env.GOOGLE_APP_EMAIL,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}