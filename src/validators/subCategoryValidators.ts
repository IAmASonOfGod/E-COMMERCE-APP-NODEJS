import { body } from "express-validator";

export class subCategoryValidators {
  static addSubCategory() {
    return [
      body("category_id", "Category is required").isString(),
      body("name", "City name is required").isString(),
      body("status", "Status is required").isString(),
    ];
  }
}
