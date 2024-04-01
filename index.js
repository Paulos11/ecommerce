require("module-alias/register");
const express = require("express");
const routes = require("@/routes");
const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", routes);

app.use((req, res, next) => {
  return next({
    message: "not found",
    status: 404,
  });
});

// err handeling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.send(err);
});

app.listen(process.env.API_PORT, async () => {
  console.log(`server running at http://localhost:${process.env.API_PORT}`);
  console.log("Press ctrl to stop the server");

  await mongoose.connect(process.env.MONGO_URL);
  console.log("mongodb connected");
});

// mvc pattern -
// middle wares types
//builtin/ firstparty
// thirdparty
// custom middleware/application middleware
// router middleware
// error handeling middleware
