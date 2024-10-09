import subCategory from "../models/subCategory";

export class subCategoryController {
  static async getSubCategories(req, res, next) {
    try {
      const sub_categories = await subCategory.find({}, { __v: 0 });

      res.send(sub_categories);
    } catch (e) {
      next(e);
    }
  }

  static async getSubCategoriesByCategory(req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const sub_categories = await subCategory.find(
        { category_id: categoryId },
        { __v: 0 }
      );

      res.send(sub_categories);
    } catch (e) {
      next(e);
    }
  }

  static async addSubCategory(req, res, next) {
    const name = req.body.name;
    const status = req.body.status;
    const category_id = req.body.category_id;

    try {
      let data: any = {
        category_id,
        name,
        status,
      };
      if (req.file) data = { ...data, photo: req.file.path };
      const sub_category = await new subCategory(data).save();
      res.send(sub_category);
    } catch (e) {
      next(e);
    }
  }
}
