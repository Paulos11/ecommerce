const User = require("@/models/user.model");
const bcrypt = require("bcryptjs");
const { errorHandler, validationError } = require("@/lib");

class CustomerCtrl {
  async index(req, res, next) {
    try {
      const customers = await User.find({ role: "Customer" }).exec();
      res.json(customers);
    } catch (error) {
      errorHandler(error, next);
    }
  }

  async store(req, res, next) {
    try {
      const { name, email, password, confirmPassword, phone, address, status } =
        req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !phone ||
        !address ||
        !status
      ) {
        return validationError(req, res, next, {
          message: "Missing required fields",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        status,
      });
      res.status(201).json({
        message: "User Added Successfully",
        user: newUser,
      });
    } catch (error) {
      errorHandler(error, next);
    }
  }

  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      errorHandler(error, next);
    }
  }

  async destroy(req, res, next) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      errorHandler(error, next);
    }
  }
}

module.exports = new CustomerCtrl();
