const mongoose = require('mongoose');
//const path = require('path');
//importar variables de entorno locales
//require('dotenv').config({path: '../variables.env'});
//console.log('DB_URL: ',process.env.DB_URL);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/electronic-medical-record',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
