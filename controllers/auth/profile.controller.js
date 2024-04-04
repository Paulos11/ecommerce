const { errorHandel, validationError } = require("../../lib");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");

class ProfileCtrl {
  show = async (req, res, next) => {
    res.send(req.user);
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;
      await User.findByIdAndUpdate(req.uid, { name, phone, address });
      res.send({
        message: "Profile updated succesfully",
      });
    } catch (err) {}
  };

  updatePassword = async (req, res, next) => {
    try {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.uid).select("+password");
      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword == confirmPassword) {
          const hash = bcrypt.hashSync(newPassword);
          user.update({
            password: hash,
          });

          res.send({ message: "Password updated sucessfully" });
        } else {
          return validationError({
            newPassword: "The new password is not confirmed",
          });
        }
      }
    } catch (err) {
      return validationError({
        oldPassword: "The old password is incorrect",
      });
    }
  };
}

module.exports = new ProfileCtrl();
