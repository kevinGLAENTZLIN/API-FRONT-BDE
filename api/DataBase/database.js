var mysql = require('mysql');
const db_config = require('../config/config.js');

var connection = mysql.createConnection ({
    database: db_config.database,
    host: db_config.host,
    user: db_config.user,
    password: db_config.password
})

connection.connect(error => {
    if (error) console.log(error);
    console.log("Vous etes bien connecté a la DB");
});
  
module.exports = connection;