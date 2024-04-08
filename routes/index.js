const express = require("express");
const AuthRoutes = require("./auth");
const router = express.Router();
const profileRoutes = require("./profile");
<<<<<<< HEAD
const cmsRoutes = require("./cms");
const { auth, cmsAccess } = require("@/lib/index");

router.use("/auth", AuthRoutes);
router.use("/profile", auth, profileRoutes);
router.use("/cms", auth, cmsAccess, cmsRoutes);
=======
const { auth } = require("@/lib/index");

router.use("/auth", AuthRoutes);
router.use("/profile", auth, profileRoutes);
>>>>>>> origin/main

module.exports = router;

