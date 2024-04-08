const bcrypt = require("bcryptjs");
const { User } = require("@/models");
const { errorHandler, validationError } = require("@/lib");

class RegisterCtrl {
  register = async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword, phone, address } = req.body;

      if (password == confirmPassword) {
        const hash = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hash, phone, address });
        res.status(201);
        res.json({
          message: "Thank you for registration. Please proceed to login.",
        });
      } else {
        return validationError({
          password: "The passwords do not match.",
        });
      }
    } catch (errors) {
      return errorHandler(next, errors);
    }
  };
}

module.exports = new RegisterCtrl();
