const mysql = require('mysql2');

let connection = mysql.createConnection({
        host : 'localhost',
        database :'userData',
        user : 'root',
        password : 'Jagan17@'
    })

    module.exports = connection