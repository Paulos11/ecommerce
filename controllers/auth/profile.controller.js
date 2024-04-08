const { errorHandler, validationError } = require("@/lib");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");

class ProfileCtrl {
  show = async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;
      await User.findByIdAndUpdate(req.uid, { name, phone, address });
      res.send({
        message: "Profile updated successfully",
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.uid).select("+password");

      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword === confirmPassword) {
          const hash = bcrypt.hashSync(newPassword);
          await User.findByIdAndUpdate(req.uid, { password: hash });
          res.send({ message: "Password updated successfully" });
        } else {
          return validationError(req, res, next, {
            newPassword: "The new password is not confirmed",
          });
        }
      } else {
        return validationError(req, res, next, {
          oldPassword: "The old password is incorrect",
        });
      }
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
}

module.exports = new ProfileCtrl();
