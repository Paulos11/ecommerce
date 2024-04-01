const express = require("express");
const AuthRoutes = require("./auth");
const router = express.Router();

router.use("/auth", AuthRoutes);

module.exports = router;

// const checkLogin = (req, res, next) => {
//   let user = "paul";
//   if (user.length > 0) {
//     next();
//   } else {
//     return next({ message: "usernot found", status: 401 });
//   }
// };

// const accesCheck = (req, res, next) => {
//   let allow = "yes";
//   if (allow == "yes") {
//     next();
//   } else {
//     return next({ message: "acces denied", status: 403 });
//   }
// };

// router.post(
//   "/profile/:username/edit",
//   checkLogin,
//   accesCheck,
//   (req, res, next) => {
//     res.send({
//       method: req.method,
//       url: req.url,
//       query: req.query,
//       params: req.params,
//       body: req.body,
//     });
//   }
// );
