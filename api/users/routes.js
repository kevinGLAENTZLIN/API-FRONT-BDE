const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
var JsonParser = BodyParser.json();
var express = require('express');
var router = express.Router()

router.post('/', JsonParser, (req, res) => {
    const newItem = {
        nom: req.body.nom,
        nombres: req.body.nombres,
        reférence: req.body.reférence,
        prix: req.body.prix
    }
    request_sql.query(`INSERT INTO inventaire VALUES ("${newItem.nom}", "${newItem.nombres}", "${newItem.reférence}", "${newItem.prix}")`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            return;
        }
        console.log("création d'un nouvel item: ", { newItem });
    });
    res.send(200);
});

router.get('/', (req, res) => {
    request_sql.query('SELECT * FROM inventaire', (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            return;
        }
        console.log("Database bien affiché");
    });
    res.send(200);
});

router.put('/', JsonParser, (req, res) => {
    const newItem = {
        nom: req.body.nom,
        nombres: req.body.nombres,
        reférence: req.body.reférence,
        prix: req.body.prix
    }
    request_sql.query(`UPDATE inventaire SET nom = "${newItem.nom}", nombres = "${newItem.nombres}", reférence = "${newItem.reférence}", prix = "${newItem.prix}")`, (err, res) => {
        if (err) {
            console.log("erreur :", err)
            return;
        }
        console.log("Table bien mise à jour")
    });
    res.send(200);
})

module.exports = router;