const jwt = require("jsonwebtoken");
const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const find_law_value = async (value, data, callback) => {
	let ret;
	request_sql.query(`SELECT ${value} FROM utilisateur WHERE accesToken="${data}"`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			callback(err);
		} else {
			callback(null, res);
			return;
		}
	});
}

const verifyToken = async (req, res, next) => {
	const acces_token = req.body.accesToken
	try {
		const decrypt = jwt.verify(acces_token, process.env.ACCESS_TOKEN_SECRET);
		if (!decrypt) {
			return res.status(401).send("Invalid token");
		}
		req.body.decryp_token = decrypt
		next()
	} catch (err) {
		res.status(401).send("Access token error");
	}
};

module.exports = {
	find_law_value,
	verifyToken
};
