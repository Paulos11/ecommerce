const Auth = require("./auth");
const Cms = require("./cms/");
const Category = require("./cms/categoryController");
const Productcms = require("./cms/products.controller");
const Brand = require("./cms/brandController");
const Customer = require("./cms/customerController");

module.exports = { Auth, Category, Brand, Cms, Productcms, Customer };
