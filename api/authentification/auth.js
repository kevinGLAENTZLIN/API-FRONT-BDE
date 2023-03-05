const jwt = require("jsonwebtoken");
const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
var JsonParser = BodyParser.json();
var express = require('express');

const get_from_db = (user, value) => {
    request_sql.query('SELECT value = ? FROM utilisateur WHERE accesToken = user = ?',[value, user], (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("user well finded");
        console.log(res);
    });    
}

const verifyToken = (req, res, next) => {
  const acces_token = req.body.accesToken
  try {
    const decrypt = jwt.verify(acces_token, process.env.ACCESS_TOKEN_SECRET);
    if (!decrypt) {
        return res.status(401).send("invalid token");
    }
  }
};

module.exports = verifyToken;
