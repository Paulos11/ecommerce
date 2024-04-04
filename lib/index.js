const { json } = require("express");
const jwt = require("jsonwebtoken");

const errorHandel = (error, next) => {
  console.log(error);

  if (error.code == 11000) {
    let errors = {};
    for (let k in error.keyValue) {
      errors[k] = `The provided value for ${k} already exists`;
    }
    return next({
      message: "Duplicate key error",
      errors,
      status: 422,
    });
  }

  if ("errors" in error) {
    let errors = {};
    for (let k in error.errors) {
      errors[k] = error.errors[k].message;
    }
    return next({
      message: "Validation error",
      errors,
      status: 422,
    });
  }

  return next({
    message: "Unknown error occurred",
    status: 500,
  });
};

const auth = async (req, res, next) => {
  try {
    if ("authorization" in req.header) {
      const token = req.headers["authorization"].split("")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uid = decoded.uid;
      const user = await User.findById(uid);

      if (user) {
        req.uid = uid;
        req.user = user;
        next();
      }
    } else {
      return next({
        message: "Invalid Missing",
        status: 401,
      });
    }
  } catch (err) {
    errorHandel(err, next);
  }
};

const validationError = (errors) =>
  next({
    message: "there seems to be some validation error",
    errors,
    status: 422,
  });
  
module.exports = { errorHandel, auth, validationError };
