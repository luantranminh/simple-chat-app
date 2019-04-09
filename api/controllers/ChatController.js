const Chat = require("../models/Chat");
const { Sequelize } = require("../../config/sequelize");

function createMessage(req, res) {
  Chat.create({
    sender: req.user.username,
    receiver: req.params.receiver,
    message: req.body.message
  })
    .then(() => {
      res.status(201).json();
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

function getConversation(req, res) {
  const { limit = 50, offset = 0 } = req.query;

  Chat.findAll({
    offset: offset,
    limit: limit,
    where: {
      sender: {
        [Sequelize.Op.or]: [req.user.username, req.params.receiver]
      },
      receiver: {
        [Sequelize.Op.or]: [req.user.username, req.params.receiver]
      }
    },
    order: [["created_at", "ASC"]]
  })
    .then(messages => {
      Chat.update({ read: true }, { where: { receiver: req.user.username } })
        .then()
        .catch();
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = { getConversation, createMessage };
