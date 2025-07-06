const express = require("express");
const {
  signupController,
  signinController,
} = require("../controller/UserController");
const { validate } = require("../middleware/validate");
const { registerUser, loginUser } = require("../type");
const routes = express.Router();

routes.post("/signup", validate(registerUser), signupController);
routes.post("/signin", validate(loginUser), signinController);

module.exports = routes;
