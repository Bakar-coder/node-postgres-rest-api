require('express-async-errors');
require('joi-objectid');
const express = require('express'),
  config = require('config'),
  cors = require('cors'),
  fileUpload = require('express-fileupload'),
  db = require('./utils/database'),
  mongoose = require('mongoose'),
  path = require('path'),
  port = process.env.PORT || 80,
  app = express();

const { Product } = require('./models/Product');
const { User } = require('./models/User');

/*=============================================
  check for environment variables
  =============================================*/
if (!config.get('jwtPrivateKey')) {
  console.log('No Private Key Provided!');
  process.exit(1);
}

/*=============================================
import all routes
 =============================================*/
const Index = require('./routes'),
  Users = require('./routes/user');

/*=============================================
  set application middlwares
  =============================================*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());
app.use(cors());
app.use('/', Index);
app.use('/api/users', Users);

// create schema sql relationship
Product.belongsTo(User, { constraints: true, onDelete: 'cascade' });
User.hasMany(Product);

/*=============================================
connect to database and initialize node server
=============================================*/

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`Serving app on port: ${port}...`));
    console.log('Connected to Postgres Database...');
  })
  .catch(ex => console.log('Database Connection Error! ---', ex));
