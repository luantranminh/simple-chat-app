const bcrypt = require("bcrypt");
const { sequelize, Sequelize } = require("../../config/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists"
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    socketid: {
      type: Sequelize.STRING,
      defaultValue: ""
    }
  },
  { underscored: true }
);

User.beforeCreate(user => {
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
});

User.prototype.comparePassword = function(somePassword) {
  return bcrypt.compareSync(somePassword, this.password);
};

module.exports = User;
