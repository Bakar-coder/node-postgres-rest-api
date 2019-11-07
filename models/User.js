const Sequelize = require('sequelize'),
  sequelize = require('../utils/database'),
  Joi = require('joi');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  avatar: Sequelize.STRING,
  passwd: { type: Sequelize.STRING, allowNull: false },
  passwd2: Sequelize.STRING,
  isSeller: { type: Sequelize.BOOLEAN, defaultValue: false },
  isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false }
});

const validateRegister = user => {
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .required()
      .email(),
    passwd: Joi.string()
      .required()
      .min(8)
      .max(16),
    passwd2: Joi.string(),
    isAdmin: Joi.boolean(),
    isSeller: Joi.boolean()
  };

  return Joi.validate(user, schema);
};

const validateLogin = userData => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    passwd: Joi.string().required()
  };

  return Joi.validate(userData, schema);
};

exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
exports.User = User;
