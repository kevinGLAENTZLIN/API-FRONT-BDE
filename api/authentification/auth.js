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
	const acces_token = req.body.accesToken || req.query.accesToken
	try {
		const decrypt = jwt.verify(acces_token, process.env.ACCESS_TOKEN_SECRET);
		if (!decrypt) {
			return res.status(401).send("Invalid token");
		}
		req.body.decryp_token = decrypt
		next()
	} catch (err) {
		res.status(403).send("Access token error");
		console.log(acces_token);
	}
};


function verifyAdminToken (req, res, next) {
    const authHeader = req.body.token || req.query.token;
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
			return res.status(403).send(err);
        if (user.law != process.env.ADMIN && user.law != process.env.MID_ADMIN) 
			return res.status(403).send({ msg: 'You are not authorized to do this' });
        next();
    });
};

module.exports = {
	find_law_value,
	verifyAdminToken,
	verifyToken
};
