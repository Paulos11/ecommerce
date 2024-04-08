const express = require("express");
const { Auth } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Auth.ProfileCtrl.show)
  .put(Auth.ProfileCtrl.update)
  .patch(Auth.ProfileCtrl.update);
<<<<<<< HEAD
router
  .route("/password")
  .patch(Auth.ProfileCtrl.updatePassword)
  .put(Auth.ProfileCtrl.updatePassword);
=======
>>>>>>> origin/main

module.exports = router;
