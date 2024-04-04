const express = require("express");
const router = express.Router();
const { Customer } = require("@/controllers/index");

router.get("/", Customer.index);
router.post("/", Customer.store);
router.get("/:id", Customer.show);
router.delete("/:id", Customer.destroy);
module.exports = router;
