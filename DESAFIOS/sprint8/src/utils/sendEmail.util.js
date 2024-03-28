import { createTransport } from "nodemailer";

async function sendEmail(data) {
    try {
        const transport = createTransport({
            service: "gmail",
            port: env.PORT,
            auth: { user: env.GOOGLE_APP_EMAIL, pass: env.GOOGLE_APP_PASSWORD },
        })
        await transport.sendMail({
            from: `COSMOS <${env.GOOGLE_APP_EMAIL}>`,
            to: data.email,
            subject: `USER ${data.name.toUppercase()} REGISTERED!`,
            html: "<h1>USER REGISTERED!</h1>",
        })
    } catch (error) {
        throw error
    }
}

export default sendEmail