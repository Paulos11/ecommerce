const Brand = require("@/models/brand.model");
const { errorHandler } = require("@/lib");

class brandController {
  index = async (req, res, next) => {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (error) {
      errorHandler(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const brand = await Brand.create(req.body);
      res.status(201).json({
        message: "Brand Added Sucesfully",
      });
    } catch (error) {
      errorHandler(error, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      errorHandler(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const brand = await Brand.findByIdAndDelete(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json({ message: "Brand deleted successfully" });
    } catch (error) {
      errorHandler(error, next);
    }
  };
}

module.exports = new brandController();
