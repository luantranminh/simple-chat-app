const express = require("express");
const userCtrl = require("../../api/controllers/UserController");
const jwt = require("express-jwt");
const config = require("../env");

const router = express.Router();
const secret = config.jwt.jwtSecret;

router.route("/:username").get(jwt({ secret }), userCtrl.checkUsername);

router
  .route("/")
  .post(userCtrl.create)
  .get(jwt({ secret }), userCtrl.list);

module.exports = router;
