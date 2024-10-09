import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { subCategoryController } from "../controllers/subCategoryController";
import { subCategoryValidators } from "../validators/subCategoryValidators";

class subCategoryRouter {
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
      "/getSubCategories/",
      GlobalMiddleWare.auth,
      subCategoryController.getSubCategories
    ),
      this.router.get(
        "/getSubCategories/:categoryId",
        GlobalMiddleWare.auth,
        subCategoryController.getSubCategoriesByCategory
      );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("subCategoryImages"),
      subCategoryValidators.addSubCategory(),
      GlobalMiddleWare.checkError,
      subCategoryController.addSubCategory
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new subCategoryRouter().router;
