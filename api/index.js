var express = require("express");
var app = express();
var connect_database = require('./DataBase/database.js')

app.listen(3000, () => {
 console.log("Serveur connecté sur le port 3000");
});

connect_database;
