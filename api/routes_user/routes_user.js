const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
var JsonParser = BodyParser.json();
var express = require('express');
var router_user = express.Router()

router_user.post('/add', JsonParser, async (req, res) => {
    console.log(req.body);
    const newUser = {
        name: req.body.name,
        nom: req.body.nom,
        password: null,
        years: req.body.years,
        accessToken: null,
        law: req.body.law
    }
    newUser.password = await bcrypt.hash(req.body.password, 10);
    newUser.accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    
    console.log("New user create: ", { newUser });
    request_sql.query(`INSERT INTO utilisateur VALUES ("${newUser.name}", "${newUser.nom}", "${newUser.years}", "${newUser.password}", "${newUser.accessToken}", "${newUser.law}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("New user create: ", { newUser });
    });
    res.send(200);
});

router_user.get('/show', JsonParser, async (req, res) => {
    request_sql.query('SELECT * FROM utilisateur', (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("Table well displayed");
    });
    res.send(200);
});

router_user.put('/update', JsonParser, async (req, res) => {
    const UpdateUser = {
        name: req.body.name,
        nom: req.body.nom,
        years: req.body.years,
        law: req.body.law
    }
    request_sql.query('UPDATE utilisateur SET name = ?, nom = ?, years = ?, law = ? WHERE name = ?',
    [UpdateUser.name, UpdateUser.nom, UpdateUser.years, UpdateUser.law, UpdateUser.nom], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
        console.log("Table successfully updated: ", { UpdateUser });
    });
    res.send(200);
});

router_user.delete('/delete', JsonParser, async (req, res) => {
    const DeleteUser = {
        name: req.body.name,
    }
    request_sql.query('DELETE FROM utilisateur WHERE name = ?', [DeleteUser.name], (err, res) => {
        if (err) {
            console.log("error :", err)
            return;
        }
        console.log("Line successfully delete: ", { DeleteUser })
    });
    res.send(200);
})

module.exports = router_user;
