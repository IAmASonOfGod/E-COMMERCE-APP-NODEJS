import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { categoryController } from "../controllers/categoryController";
import { categoryValidators } from "../validators/CategoryValidators";
import { Utils } from "../utils/Utils";

class categoryRouter {
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
      "/getCategories/",
      GlobalMiddleWare.auth,
      categoryController.getCategories
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("categoryImages"),
      categoryValidators.addCategory(),
      GlobalMiddleWare.checkError,
      categoryController.addCategory
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new categoryRouter().router;
