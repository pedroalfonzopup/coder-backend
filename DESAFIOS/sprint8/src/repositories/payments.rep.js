import Stripe from "stripe";
import dao from "../data/index.factory.js"
import CheckoutProduct from "../dto/stripe.dto.js";
import env from "../utils/env.util.js";

const { orders } = dao
const stripe = new Stripe(env.STRIPE_SECRET_KEY)

class PaymentsRep {
    constructor (){
        this.model = orders
    }
    checkoutRepository = async (uid) => {
        try {
            let productsOnCart = await this.model.readByUser(uid);
            productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
            const line_items = productsOnCart;
            const mode = "payment";
            const success_url = `http://localhost:${env.PORT}/thanks`;
            const intent = await stripe.checkout.sessions.create({
                line_items,
                mode,
                success_url,
            });
            return intent;
        } catch (error) {
            throw error
        }
    }
}

const repository = new PaymentsRep()
export default repository
const { checkoutRepository } = repository
export { checkoutRepository }