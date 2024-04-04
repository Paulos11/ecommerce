const express = require("express");
const { Auth } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Auth.ProfileCtrl.show)
  .put(Auth.ProfileCtrl.update)
  .patch(Auth.ProfileCtrl.update);

module.exports = router;
