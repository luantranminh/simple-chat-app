const express = require("express");
const authCtrl = require("../../api/controllers/AuthController");

const router = express.Router();

router
  .route("/")
  .post(authCtrl.authenticate, authCtrl.generateJWT, authCtrl.returnJWT);

module.exports = router;
