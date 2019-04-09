const express = require("express");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const chatRoutes = require("./chat");

const router = express.Router();

router.get("/status", (_, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/users", userRoutes, (err, _, res, next) => {
  if (err) {
    res.status(err.status).send({ error: err.message });
    return;
  }
  next();
});
router.use("/auth", authRoutes, (err, _, res, next) => {
  if (err) {
    res.status(err.status).send({ error: err.message });
    return;
  }
  next();
});

router.use("/chats", chatRoutes, (err, _, res, next) => {
  if (err) {
    res.status(err.status).send({ error: err.message });
    return;
  }
  next();
});

module.exports = router;
