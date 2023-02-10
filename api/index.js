var express = require("express");
var app = express();
var connect_database = require('./DataBase/database.js')
const BodyParser = require('body-parser');
require('./users/routes.js')(app);
const app_port = process.env.APP_PORT;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

connect_database;

app.listen(app_port, () => {
 console.log("Serveur connecté sur le port :", app_port);
});
