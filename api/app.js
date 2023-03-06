var express = require("express");
var app = express();
var connect_database = require('./DataBase/database.js')
var routing_inventaire = require('./routes_inventaire/routes.js');
var routing_user = require('./routes_user/routes_user.js');
const app_port = process.env.APP_PORT | 3000;

connect_database;
app.use('/user', routing_user);
app.use('/inventaire', routing_inventaire);

app.listen(app_port, () => {
 console.log("Serveur connecté sur le port :", app_port);
});
