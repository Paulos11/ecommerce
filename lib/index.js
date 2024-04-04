const { json } = require("express");
const jwt = require("jsonwebtoken");
const User = require("@/models/user.model");
const multer = require("multer");

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.code === 11000) {
    let errors = {};
    for (let k in error.keyValue) {
      errors[k] = `The provided value for ${k} already exists`;
    }
    return next({
      message: "Duplicate key error",
      errors,
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
  });
};

const auth = async (req, res, next) => {
  try {
    if ("authorization" in req.headers) {
      const token = req.headers["authorization"].split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uid = decoded.uid;
      const user = await User.findById(uid);

      if (user) {
        req.uid = uid;
        req.user = user;
        return next();
      }
    }

    return res.status(401).json({
      message: "Invalid or missing authorization token",
    });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};

const validationError = (req, res, next, errors) =>
  res.status(422).json({
    message: "There seems to be some validation error",
    errors,
  });

const cmsAccess = (req, res, next) => {
  if (req.user.role == "Customer") {
    return next({
      message: "Access Denied",
      status: 403,
    });
  }
  next();
};

const adminAccess = (req, res, next) => {
  if (req.user.role === "staff") {
    return res.status(403).json({
      message: "Access Denied",
    });
  }
  next();
};

const notFoundError = (name, next) => {
  return next({
    message: `${name} not found`,
    status: 404,
  });
};

const uploads = (mimeList = []) =>
  multer({
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const filename =
          "file" +
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          `.${ext}`;
        cb(null, filename);
      },
      destination: (req, file, cb) => {
        cb(null, "./uploads");
      },
    }),
    fileFilter: (req, file, cb) => {
      if (mimeList.length > 0) {
        if (mimeList.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("File type not supported"));
        }
      } else {
        cb(null, true);
      }
    },
  });

module.exports = {
  json,
  errorHandler,
  auth,
  validationError,
  cmsAccess,
  adminAccess,
  notFoundError,
  uploads,
};
