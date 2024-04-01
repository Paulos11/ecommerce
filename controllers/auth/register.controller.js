const bcrypt = require("bcryptjs");
const { User } = require("@/models");

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
        return next({
          message: "there seems to be some validation error",
          errors: {
            password: "Password and confirmed password do not match",
            status: 422,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return next({
        messgae: "There seems to be some error",
        status: 422,
      });
    }
  };
}

module.exports = new RegisterCtrl();
