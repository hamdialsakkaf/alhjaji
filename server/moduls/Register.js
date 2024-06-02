const db = require('../util/database')

 function registerUser (name,email,password)  {
   return db.execute("INSERT INTO users (name, email, password) VALUES (?,?,?)",[name,email,password])
}


module.exports = {  registerUser };

