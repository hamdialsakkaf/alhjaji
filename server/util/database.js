//const mysql = require('mysql')
const mysql = require('mysql2')

//require('dotenv').config()
//require('dotenv').config({ path: './.env' })

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE


const pool = mysql.createPool({
host: "localhost",
user: "root",
database:"alhjaji",
password:""
//port : 10010,

})
module.exports = pool.promise();
//module.exports = db;