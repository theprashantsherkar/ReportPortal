import mysql from 'mysql2';

 var dbConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "Prashu@8484",
    database: "adminDb",
}).promise()


export default dbConnection;