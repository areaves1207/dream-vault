require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'dreamvault',
});

db.connect((err) =>{
    if(err){
        console.err("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to MySQL successfully");
});


