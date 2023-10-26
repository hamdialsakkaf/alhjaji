const mysql = require('mysql')
const db = mysql.createConnection({
   // host: process.env.LOCAL_CLIENT_APP,
//host: "https://alhjaji.com/",
//user: process.env.USER,
//host: process.env.HOST,
//host:"https://alhjaji.com/",
//host:"containers-us-west-71.railway.app",
//user: process.env.USER,
//password: process.env.PASSWORD,
//database: process.env.DATABASE
//user: "alhj03531074_root",
//password:"alhj03531074_root",
//database:"alhj03531074_blog_posts",
//USER: process.env.USER,
//password: process.env.PASSOWRD,
//database: process.env.DATABASE,
host: "localhost",
user: "root",
password: "",
//password: process.env.PASSOWRD,

database:"blog_posts" 
//database: process.env.DATABASE

})

module.exports = db;