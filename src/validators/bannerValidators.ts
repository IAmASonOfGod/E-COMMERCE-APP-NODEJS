import { body } from "express-validator";

export class BannerValidators {
  static addBanner() {
    return [
      body("BannerImages", "Banner image is required")
        .isEmail()
        .custom((banner, { req }) => {
          if (req.file) {
            return true;
          } else {
            throw "User already exists";
          }
        }),
    ];
  }
}
