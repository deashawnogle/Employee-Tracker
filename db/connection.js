//const { ViewModuleRounded } = require('@material-ui/icons');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot1!',
    database: 'employee_db',
});

module.exports = connection;