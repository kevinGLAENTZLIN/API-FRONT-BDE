var mysql = require('mysql');
const db_config = require('../config/config.js');


console.log("en connexion...");
var connection = mysql.createConnection ({
    database: db_config.database,
    host: db_config.host,
    user: db_config.user,
    password: db_config.password
})

connection.connect(error => {
    if (error) console.log(error);
    console.log("Vous etes bien connecté à la base de donnée");
});
  
module.exports = connection;