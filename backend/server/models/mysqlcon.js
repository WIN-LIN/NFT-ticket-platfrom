require('dotenv').config();
const mysqlcon = require('mysql2/promise');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const env = process.env.NODE_ENV || 'production';
const multipleStatements = (process.env.NODE_ENV === 'test');

const mysqlConfig = {
    production: { // for EC2 machine
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE
    },
    development: { // for localhost development
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE
    }
};

let mysqlEnv = mysqlConfig[env];
mysqlEnv.waitForConnections = true;
mysqlEnv.connectionLimit = 20;

const pool = mysqlcon.createPool(mysqlEnv, {multipleStatements});

module.exports = {
    mysql: mysqlcon,
    pool
};