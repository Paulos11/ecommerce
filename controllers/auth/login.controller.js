const { errorHandel } = require("@/config");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginCtrl {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email }).select("+password");

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              uid: user._id,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date() / 1000) + 30 * 24 * 60 * 60,
            },
            process.env.JWT_SECRET
          );
          res.send({ token });
        } else {
          return next({
            message: "Password doesn't match",
            errors: {
              password: "Password doesn't match",
            },
            status: 422,
          });
        }
      } else {
        return next({
          message: "Email not found",
          errors: {
            email: "Email not found",
          },
          status: 422,
        });
      }
    } catch (err) {
      errorHandel(err, next);
    }
  };
}

module.exports = new LoginCtrl();
