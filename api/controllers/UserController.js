const validator = require("../../config/routes/validation/user");
const User = require("../models/User");
const Joi = require("joi");
const { sequelize, Sequelize } = require("../../config/sequelize");

function checkUsername(req, res) {
  sequelize
    .query(
      "SELECT count(*) as count FROM (SELECT 1 FROM users where username = :username) as a",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { username: req.params.username }
      }
    )
    .then(result => {
      if (result[0].count) {
        res.status(200).json({ exists: "true" });
      } else {
        res.status(200).json({ exists: "false" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

function create(req, res) {
  const cred = {
    username: req.body.username,
    password: req.body.password
  };
  Joi.validate(cred, validator.create.body, err => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    User.create(cred)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
}

function list(req, res) {
  const { limit = 50, offset = 0 } = req.query;
  User.findAll({
    offset: offset,
    limit: limit,
    attributes: { exclude: ["password"] },
    where: {
      username: {
        [Sequelize.Op.ne]: req.user.username
      }
    }
  })
    .then(users => {
      res.status(200).json(
        users.map(user => {
          return { username: user.username };
        })
      );
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

function setSocketID(req) {
  User.update({ socketid: req.socketid }, { where: { username: req.username } })
    .then(() => {})
    .catch(() => {});
}

function getSocketID(req) {
  return User.findOne({
    attributes: ["socketid"],
    where: { username: req.username },
    raw: true
  });
}

module.exports = { checkUsername, create, list, setSocketID, getSocketID };
