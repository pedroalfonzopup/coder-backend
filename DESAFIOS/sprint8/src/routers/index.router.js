import CustomRouter from "./CustomRouter.js";
import ViewsRouter from "./views/index.view.js"
import ApiRouter from "./api/index.router.api.js"



const views = new ViewsRouter()
const viewsRouter = views.getRouter()
const api = new ApiRouter()
const apiRouter = api.getRouter()


export default class IndexRouter extends CustomRouter {
    init() {
        this.router.use("/", viewsRouter)
        this.router.use("/api", apiRouter)
    }
}
