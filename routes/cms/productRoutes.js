const express = require("express");
const { Productcms } = require("../../controllers/index");

const { uploads } = require("@/lib");
const mimeList = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();

router
  .route("/")
  .get(Productcms.index)
  .post(uploads(mimeList).array("images"), Productcms.store);

router
  .route("/:id")
  .get(Productcms.show)
  .put(uploads(mimeList).array("images"), Productcms.update)
  .patch(uploads(mimeList).array("images"), Productcms.update)
  .delete(Productcms.destroy);

module.exports = router;
