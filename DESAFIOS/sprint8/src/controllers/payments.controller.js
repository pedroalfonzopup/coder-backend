import { checkoutService } from "../services/payments.service.js"

class PaymentsController {
    checkout = async (req, res, next) => {
        try {
            const { user_id } = req.session
            const session = await checkoutService({ user_id })
            return res.redirect(session.url)
        } catch (error) {
            next(error)
        }
    }
}

export default PaymentsController
const controller = new PaymentsController()
const { checkout } = controller
export { checkout }