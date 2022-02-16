//const { ViewModuleRounded } = require('@material-ui/icons');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: 'employee_db',
// });

// connection.connect(function (err) {
//     if (err) throw err;
// });

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'rootroot1!',
    database: 'employee_db',
});

connection.connect();

module.exports = connection;