const express = require("express");
const router = express.Router();
const { Category } = require("@/controllers/index");

router.get("/", Category.index);
router.post("/", Category.store);
router.get("/:id", Category.show);
router.delete("/:id", Category.destroy);
module.exports = router;
