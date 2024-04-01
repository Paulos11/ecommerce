const express = require("express");
const { Auth } = require("@/controllers/");
const router = express.Router();

router.post("/register", Auth.RegisterCtrl.register);

module.exports = router;
