import { checkoutRepository } from "../repositories/payments.rep.js" 

class PaymentsService {
    checkoutService = async (uid) => {
        try {
            const response = await checkoutRepository(uid)
            return response
        } catch (error) {
            throw error
        }
    }
}

const paymentsService = new PaymentsService()
export default paymentsService
const { checkoutService } = paymentsService
export { checkoutService }