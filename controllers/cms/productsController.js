const { errorHandler, validationError } = require("@/lib");
const bcrypt = require("bcryptjs");
const Products = require("@/models/product.model");
const { unlinkSync } = require("fs");

class ProductCtrl {
  index = async (req, res, next) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (err) {
      errorHandler(err, next);
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
      const images = req.files.map((file) => file.filename);

      if (password !== confirmPassword) {
        return validationError({
          password: "The passwords do not match",
        });
      }

      const hash = await bcrypt.hash(password, 10);
      await Products.create({
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
        images,
      });

      res.status(201).json({
        message: "Product Added Successfully",
      });
    } catch (err) {
      errorHandler(error, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
      res.json(product);
    } catch (error) {
      errorHandler(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      let {
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
      } = req.body;
      let images = [];

      const existingProduct = await Products.findById(req.params.id);
      if (!existingProduct) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }

      if (req.files) {
        images = existingProduct.images.concat(
          req.files.map((file) => file.filename)
        );
      }

      await Product.findByIdAndUpdate(req.params.id, {
        name,
        status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        brandId,
        images,
      });

      res.send({ message: "Product updated successfully" });
    } catch (err) {
      errorHandler(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        for (let image of deletedProduct.images) {
          unlinkSync(`./uploads/${image}`);
        }
        res.send({
          message: "Product deleted successfully",
          product: deletedProduct,
        });
      } else {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
    } catch (err) {
      errorHandler(error, next);
    }
  };
}

module.exports = new ProductCtrl();
