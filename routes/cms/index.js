const express = require("express");
const staffsRouter = require("./staffs.router");
const { adminAccess } = require("@/lib");
const brandRouter = require("@/routes/cms/brandRoutes");
const { Auth } = require("../../controllers");
const customerRouter = require("@/routes/cms/customerRouter");
const categoryRouter = require("@/routes/cms/categoryRoutes");
const productRouter = require("./productRoutes");

const router = express.Router();

router.use("/staff", adminAccess, staffsRouter);

router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/category", customerRouter);
router.use("/products", productRouter);

module.exports = router;
