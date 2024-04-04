const express = require("express");
const { Auth } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Auth.ProfileCtrl.show)
  .put(Auth.ProfileCtrl.update)
  .patch(Auth.ProfileCtrl.update);
router
  .route("/password")
  .patch(Auth.ProfileCtrl.updatePassword)
  .put(Auth.ProfileCtrl.updatePassword);

module.exports = router;
