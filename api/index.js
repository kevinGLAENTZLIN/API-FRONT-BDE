var express = require("express");
var app = express();
var connect_database = require('./DataBase/database.js')
var routing = require('./users/routes.js');
const app_port = process.env.APP_PORT;

connect_database;
app.use('/item', routing);

app.listen(app_port, () => {
 console.log("Serveur connecté sur le port :", app_port);
});
