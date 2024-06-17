import twilio from "twilio"
import env from "./env.util.js"

async function sendSms(phone) {
    try {
        const transport = twilio(env.TWILIO_SID, env.TWILIO_TOKEN)
        transport.messages.create({
            body: "Message from Cosmos Eccomerce, salutations.",
            from: env.TWILIO_PHONE,
            to: phone
        })
    } catch (error) {
        throw error
    }
}

export default sendSms