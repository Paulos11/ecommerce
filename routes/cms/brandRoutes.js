const express = require("express");
const router = express.Router();
const { Brand } = require("@/controllers/index");

router.get("", Brand.index);
router.post("/", Brand.store);
router.get("/:id", Brand.show);
router.delete("/:id", Brand.destroy);

module.exports = router;
