const mysql = require('mysql2');
const config = require('./config/db.json');

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected successfully');
});

module.exports = connection;