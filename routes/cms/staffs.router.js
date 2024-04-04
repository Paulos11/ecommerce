const express = require("express");
const Cms = require("@/controllers/cms");
const router = express.Router();

router.route("/cms").get(Cms.StaffCtrl.index).post(Cms.StaffCtrl.store);

router
  .route("/:id")
  .get(Cms.StaffCtrl.show)
  .put(Cms.StaffCtrl.update)
  .delete(Cms.StaffCtrl.destroy);

module.exports = router;
