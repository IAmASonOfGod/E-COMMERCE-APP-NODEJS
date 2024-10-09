import Category from "../models/Category";

export class categoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.find({}, { __v: 0 });

      res.send(categories);
    } catch (e) {
      next(e);
    }
  }

  static async addCategory(req, res, next) {
    const name = req.body.name;
    const status = req.body.status;

    try {
      let data: any = {
        name,
        status,
      };
      if (req.file) data = { ...data, photo: req.file.path };
      const category = await new Category(data).save();
      res.send(Category);
    } catch (e) {
      next(e);
    }
  }
}
