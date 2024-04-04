const Category = require("@/models/category.model");
const { errorHandler } = require("@/lib");

class categoryCtrl {
  index = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({ messgae: "category addeded succesfully" });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };
}

module.exports = new categoryCtrl();
