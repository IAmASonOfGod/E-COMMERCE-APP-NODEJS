import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { AddressController } from "../controllers/AddressController";
import { addressValidators } from "../validators/addressValidators";

class addressRouter {
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
      "/userAddresses",
      GlobalMiddleWare.auth,
      AddressController.getAddresses
    ),
      this.router.get(
        "/checkAddress",
        GlobalMiddleWare.auth,
        addressValidators.checkAddress(),
        AddressController.getAddresses
      ),
      this.router.get(
        "/getLimitedAddresses",
        GlobalMiddleWare.auth,
        addressValidators.getLimitedAddress(),
        AddressController.getAddresses
      );
    //   this.router.get(
    //     "/:id",
    //     GlobalMiddleWare.auth,
    //     AddressController.getAddressById
    //   );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      addressValidators.addAddress(),
      GlobalMiddleWare.checkError,
      AddressController.addAddress
    );
  }

  patchRoutes() {
    // this.router.patch(
    //   "/edit/:id",
    //   GlobalMiddleWare.auth,
    //   addressValidators.editAddress(),
    //   GlobalMiddleWare.checkError,
    //   AddressController.editAddress
    // );
  }

  putRoutes() {
    this.router.put(
      "/edit/:id",
      GlobalMiddleWare.auth,
      addressValidators.editAddress(),
      GlobalMiddleWare.checkError,
      AddressController.editAddress
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleWare.auth,
      AddressController.deleteAddress
    );
  }
}

export default new addressRouter().router;
