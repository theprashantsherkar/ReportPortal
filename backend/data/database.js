import mysql from 'mysql2';

 var dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: "Prashu@8484",
    database: "admindb",
}).promise()


export default dbConnection;