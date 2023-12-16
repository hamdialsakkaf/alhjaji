const mysql = require('mysql')
//require('dotenv').config()
//require('dotenv').config({ path: './.env' })

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE


const db = mysql.createConnection({
host: "mysql-155030-0.cloudclusters.net",
user: "admin",
password:"vopkXWSQ",
port : 10010,
database:"alhjaji"
})

module.exports = db;