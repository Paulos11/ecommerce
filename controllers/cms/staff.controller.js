const { errorHandler, validationError } = require("@/lib");
const bcrypt = require("bcryptjs");
const { User } = require("@/models");

class StaffCtrl {
  index = async (req, res, next) => {
    try {
      const users = await User.find({ role: "Staff" });
      res.send(users);
    } catch (err) {
      errorHandler(err, next);
    }
  };

  store = async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword, phone, address, status } =
        req.body;

      if (password == confirmPassword) {
        const hash = await bcrypt.hash(password, 10);
        await User.create({
          name,
          email,
          password: hash,
          phone,
          address,
          status,
          role: "Staff",
        });
        res.status(201).json({
          message: "Staff Added Successfully",
        });
      } else {
        return validationError({
          password: "The passwords do not match",
        });
      }
    } catch (err) {
      return errorHandler(next, err);
    }
  };

  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user && user.role == "Staff") {
        res.send(user);
      } else {
        return next({
          message: "Staff Not found",
          status: 404,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, email, phone, address, status } = req.body;
      await User.findByIdAndUpdate(req.params.id, {
        name,
        phone,
        address,
        status,
      });
      res.send({
        message: "Profile updated successfully",
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user && user.role == "Staff") {
        res.send(user);
      } else {
        return next({
          message: "Staff Not found",
          status: 404,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new StaffCtrl();
