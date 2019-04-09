const { sequelize, Sequelize } = require("../../config/sequelize");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    receiver: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  { underscored: true }
);

module.exports = Chat;
