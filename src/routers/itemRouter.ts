import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { itemController } from "../controllers/itemController";
import { itemValidators } from "../validators/itemValidators";
import { Utils } from "../utils/Utils";

class itemRouter {
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
      "/getByCategory",
      GlobalMiddleWare.auth,
      itemValidators.getProductByCategory(),
      GlobalMiddleWare.checkError,
      GlobalMiddleWare.adminRole,
      itemController.getProductByCategory
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminOrStoreRole,
      new Utils().multer.array("productImages"),
      itemValidators.addItem(),
      GlobalMiddleWare.checkError,
      itemController.addItem
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new itemRouter().router;
