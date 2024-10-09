import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { cartController } from "../controllers/cartController";
import { cartValidators } from "../validators/cartValidators";

class cartRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/getCart",
      GlobalMiddleWare.auth,
      cartController.getUserCart
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      cartValidators.addToCart(),
      GlobalMiddleWare.checkError,
      cartController.addToCart
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new cartRouter().router;
