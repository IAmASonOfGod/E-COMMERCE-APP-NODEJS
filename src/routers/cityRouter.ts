import { Router } from "express";
import { cityValidators } from "../validators/cityValidators";
import { cityController } from "../controllers/cityControllers";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

class cityRouter {
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
    this.router.get("/cities", cityController.getCities);
  }

  postRoutes() {
    this.router.post(
      "/create",
      cityValidators.addCity(),
      GlobalMiddleWare.checkError,
      cityController.addCity
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new cityRouter().router;
