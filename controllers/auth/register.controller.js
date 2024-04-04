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
          messgae: "Thank your registration. please procced to login",
        });
      } else {
        return validationError({
          password: "the passwordis incorrect",
        });
      }
    } catch (errors) {
      return errorHandler(next, errors);
    }
  };
}

module.exports = new RegisterCtrl();
