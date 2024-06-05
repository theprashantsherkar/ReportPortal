import mysql from 'mysql2';

export var dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Prashu@8484',
    database: "adminDb",
}).promise()
