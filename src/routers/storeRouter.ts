import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { restaurantController } from "../controllers/restaurantControllers";
import { restaurantValidators } from "../validators/restaurantValidators";
import { Utils } from "../utils/Utils";

class restaurantRouter {
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
      "/getRestaurants",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      restaurantController.getRestaurants
    ),
      this.router.get(
        "/nearbyRestaurants",
        GlobalMiddleWare.auth,
        restaurantValidators.getNearbyRestaurants(),
        GlobalMiddleWare.checkError,
        restaurantController.getNearbyRestaurants
      ),
      this.router.get(
        "/searchbyRestaurants",
        GlobalMiddleWare.auth,
        restaurantValidators.searchNearbyRestaurants(),
        GlobalMiddleWare.checkError,
        restaurantController.searchNearbyRestaurants
      );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      restaurantValidators.addRestaurant(),
      GlobalMiddleWare.checkError,
      restaurantController.addRestaurant
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new restaurantRouter().router;
