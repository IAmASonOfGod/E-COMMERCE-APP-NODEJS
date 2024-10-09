import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { BannerValidators } from "../validators/bannerValidators";
import { BannerController } from "../controllers/bannerController";
import { Utils } from "../utils/Utils";

class bannerRouter {
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
      "/banners",
      GlobalMiddleWare.auth,
      BannerController.getBanners
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("banner"),
      BannerValidators.addBanner(),
      GlobalMiddleWare.checkError,
      BannerController.addBanner
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new bannerRouter().router;
