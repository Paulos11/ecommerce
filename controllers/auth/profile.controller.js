<<<<<<< HEAD
const { errorHandler, validationError } = require("@/lib");
=======
const { errorHandel, validationError } = require("../../lib");
>>>>>>> origin/main
const { User } = require("@/models");
const bcrypt = require("bcryptjs");

class ProfileCtrl {
  show = async (req, res, next) => {
<<<<<<< HEAD
    try {
      res.send(req.user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
=======
    res.send(req.user);
>>>>>>> origin/main
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;
      await User.findByIdAndUpdate(req.uid, { name, phone, address });
      res.send({
<<<<<<< HEAD
        message: "Profile updated successfully",
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
=======
        message: "Profile updated succesfully",
      });
    } catch (err) {}
>>>>>>> origin/main
  };

  updatePassword = async (req, res, next) => {
    try {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.uid).select("+password");
<<<<<<< HEAD

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
=======
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
>>>>>>> origin/main
    }
  };
}

module.exports = new ProfileCtrl();
