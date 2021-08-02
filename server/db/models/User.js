const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //removing email from signup for now as it's not on the frontend
  // email: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true,
  //     notEmpty: true,
  //   },
  // },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
  losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
  draws: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
  money: {
    type: Sequelize.INTEGER,
    defaultValue: 2500,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};
<<<<<<< HEAD

User.prototype.addWin = async function () {
  try {
    await this.increment("wins");
  } catch (err) {
    console.log(err);
  }
};

User.prototype.addLoss = async function () {
  try {
    await this.increment("losses");
  } catch (err) {
    console.log(err);
  }
};

User.prototype.addDraw = async function () {
  try {
    await this.increment("draws");
  } catch (err) {
    console.log(err);
  }
};

=======

User.prototype.addWin = async function () {
  try {
    await this.increment("wins");
  } catch (err) {
    console.log(err);
  }
};

User.prototype.addLoss = async function () {
  try {
    await this.increment("losses");
  } catch (err) {
    console.log(err);
  }
};

User.prototype.addDraw = async function () {
  try {
    await this.increment("draws");
  } catch (err) {
    console.log(err);
  }
};

>>>>>>> c1158a087c2a7ebc8837b05be60097aa9cad910f
User.prototype.getMoney = function () {
  return this.money;
};

User.prototype.updateMoney = async function (payout) {
  try {
    let totalMoney = this.getMoney() + payout;
    await this.update({ money: totalMoney });
  } catch (err) {
    console.log(err);
  }
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
