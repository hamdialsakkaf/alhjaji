const mysql = require('mysql')
require('dotenv').config()
//require('dotenv').config({ path: './.env' })

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE


const db = mysql.createConnection({
host: localhost,
user: alhj03531074_root,
password:alhj03531074_root,
port : 3306,
database:alhj03531074_blog_posts
})

module.exports = db;