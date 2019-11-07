// return process.env.NODE_ENV === 'production'
//   ? (module.exports = { MONGO_URI: '' })
//   : (module.exports = { MONGO_URI: 'mongodb://localhost:27017/smart-brains' });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('smart_brains', 'postgres', '', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432'
});

module.exports = sequelize;
global.sequelize = sequelize;
