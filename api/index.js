var express = require("express");
var mysql = require('mysql');
var dotenv = require('dotenv')
var app = express();
dotenv.config();
const database = process.env.DATABASE;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

var connection = mysql.createConnection ({
    database: database,
    host: host,
    user: user,
    password: password
})

app.listen(3000, () => {
 console.log("Serveur connecté sur le port 3000");
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log("Vous etes bien connecté a la DB");
});
  
connection.end();
