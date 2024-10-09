import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { orderValidators } from "../validators/orderValidators";
import { orderController } from "../controllers/orderController";

class orderRouter {
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
      "/userOrders",
      GlobalMiddleWare.auth,
      orderController.getUserOrders
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      orderValidators.placeOrder(),
      GlobalMiddleWare.checkError,
      orderController.placeOrder
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new orderRouter().router;
