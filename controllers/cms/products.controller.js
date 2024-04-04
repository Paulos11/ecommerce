const Product = require("@/models/");
const { errorHandler } = require("@/lib");

class ProductsController {
  index = async (req, res, next) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      errorHandler(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const {
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
      } = req.body;
      await Product.create({
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
      });
      res.status(201).json({
        message: "Product Added Successfully",
      });
    } catch (error) {
      errorHandler(error, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      errorHandler(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const {
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
      } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          status,
          description,
          summary,
          price,
          discountedPrice,
          categoryId,
          brandId,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      errorHandler(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      errorHandler(error, next);
    }
  };
}

module.exports = new ProductsController();
