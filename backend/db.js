

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'esakki_2609',  
    database: 'projectPortal',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();

