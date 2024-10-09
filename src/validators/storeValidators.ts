import { body, query } from "express-validator";
import User from "../models/User";

export class storeValidators {
  static addStore() {
    return [
      body("name", "Owner name is required").isString(),
      body("email", "Valid email is required")
        .isEmail()
        .custom((email) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                throw new Error("User already exists");
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("phone", "Phone number is required")
        .isString()
        .custom((phone) => {
          return User.findOne({ phone, type: "store" })
            .then((user) => {
              if (user) {
                throw new Error("User already exists");
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password")
        .isAlphanumeric()
        .withMessage("Password must contain only letters and numbers")
        .isLength({ min: 8, max: 25 })
        .withMessage("Password must be between 8-25 characters"),
      // body("storeImages", "Cover image is required").custom(
      //   (value, { req }) => {
      //     if (req.file) {
      //       return true;
      //     } else {
      //       throw new Error("Cover image is required");
      //     }
      //   }
      // ),
      body("store_name", "Store name is required").isString(),
      body("status", "Status is required").isString(),
      body("address", "Address is required").isString(),
      body("location", "Location is required").isString(),
      body("city_id", "City ID is required").isString(),
      body("user_id", "City ID is required").isString(),
    ];
  }

  static searchStore() {
    return [query("name", "Search is required").isString()];
  }
}
