const config = require("../../config/env");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user && user.comparePassword(req.body.password)) {
        req.checkedUser = user;
        next();
      } else {
        res.status(401).json({ error: "Wrong username or password" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

async function generateJWT(req, res, next) {
  if (req.checkedUser) {
    const jwtPayload = {
      id: req.checkedUser.id,
      username: req.checkedUser.username
    };
    const jwtSecret = config.jwt.jwtSecret;
    const jwtData = { expiresIn: config.jwt.jwtDuration };
    req.token = jwt.sign(jwtPayload, jwtSecret, jwtData);
  }
  next();
}

function returnJWT(req, res) {
  if (req.checkedUser && req.token) {
    res.status(201).json({ token: req.token });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = {
  authenticate,
  generateJWT,
  returnJWT
};
