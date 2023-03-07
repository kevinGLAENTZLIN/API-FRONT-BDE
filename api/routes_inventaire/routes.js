const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
var JsonParser = BodyParser.json();
var express = require('express');
var router = express.Router()
const auth = require('../authentification/auth.js');

router.post('/add', JsonParser, auth.verifyToken, async (req, res) => {
    const newItem = {
        name: req.body.name,
        number: req.body.number,
        reference: req.body.reference,
        price: req.body.price
    }
    request_sql.query(`INSERT INTO inventaire VALUES ("${newItem.name}", "${newItem.number}", "${newItem.reference}", "${newItem.price}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
    });
    res.status(200).send("Object successfuly add in table");
});

router.get('/show', JsonParser, auth.verifyToken, async (req, res) => {
    request_sql.query('SELECT * FROM inventaire', (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
    });
    res.status(200).send("Inventaire well displayed");
});

router.put('/update', JsonParser, auth.verifyToken, async (req, res) => {
    const UpdateItem = {
        name: req.body.name,
        number: req.body.number,
        reference: req.body.réference,
        price: req.body.price
    }
    request_sql.query('UPDATE inventaire SET name = ?, number = ?, reference = ?, price = ? WHERE name = ?',
    [UpdateItem.name, UpdateItem.number, UpdateItem.reference, UpdateItem.price, UpdateItem.name], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
    });
    res.status(200).send("Inventaire well updated");
});

router.delete('/delete', JsonParser, auth.verifyToken, async (req, res) => {
    const DeleteItem = {
        name: req.body.name,
    }
    request_sql.query('DELETE FROM inventaire WHERE name = ?', [DeleteItem.name], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
    });
    res.status(200).send("Object successfuly delete in table");
})

module.exports = router;
