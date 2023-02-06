var dotenv = require('dotenv')
dotenv.config();

const database = process.env.DATABASE;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = {
    database: database,
    host: host,
    user: user,
    password: password
};
