const express = require("express");
const chatCtrl = require("../../api/controllers/ChatController");
const jwt = require("express-jwt");
const config = require("../env");

const router = express.Router();
const secret = config.jwt.jwtSecret;

router.route("/:receiver").get(jwt({ secret }), chatCtrl.getConversation);

router.route("/:receiver").post(jwt({ secret }), chatCtrl.createMessage);

module.exports = router;
