const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root7700!',
    database: 'employees_db'
});

module.exports = connection;