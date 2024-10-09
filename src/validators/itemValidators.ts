import { body, query } from "express-validator";
import Category from "../models/Category";
import Store from "../models/Store";

export class itemValidators {
  static addItem() {
    return [
      // body("itemImages", "Cover image is required").custom((cover, { req }) => {
      //   if (req.files) {
      //     return true;
      //   } else {
      //     throw new Error("Cover image is required");
      //   }
      // }),
      body("name", "Product name is required").isString(),
      body("store_id", "Store Id is required")
        .isString()
        .custom((store_id, { req }) => {
          return Store.findById(store_id)
            .then((store) => {
              if (store) {
                if (req.user.type == "admin" || store.user_id == req.user.aud)
                  return true;
                throw "You are not an authorised User for this Store";
              } else {
                // throw new Error("User Already Exists");
                throw "Store does not exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("category_id", "Category Id is required")
        .isString()
        .custom((category_id, { req }) => {
          return Category.findOne({
            _id: category_id,
            restaurant_id: req.body.restaurant_id,
          })
            .then((category) => {
              if (category) {
                return true;
              } else {
                // throw new Error("User Already Exists");
                throw "Category does not exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("status", "Status is required").isString(),
      body("price", "Item is veg or not is required").isBoolean(),
    ];
  }

  static getProductByCategory() {
    return [query("category_id", "Category Id is required").isString()];
  }
}
