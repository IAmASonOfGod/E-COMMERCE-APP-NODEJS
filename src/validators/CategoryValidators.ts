import { body } from "express-validator";

export class categoryValidators {
  static addCategory() {
    return [
      body("name", "City name is required").isString(),
      body("status", "Status is required").isString(),
    ];
  }
}
