import { body } from "express-validator";

export class cartValidators {
  static addToCart() {
    return [
      body("products", "Products Items is required").isArray(),
      body("status", "Order status is required").isString(),
      body("total", "Cart total is required").isNumeric(),
      //   body("grandTotal", "Cart grandtotal is required").isNumeric(),
      //   body("deliveryCharge", "Delivery Charge is required").isNumeric(),
    ];
  }
}
