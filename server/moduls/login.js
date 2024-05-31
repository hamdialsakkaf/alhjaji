const db = require('../util/database')

function Customerlogin (m,n)  {
   return db.execute("SELECT * FROM KurimiUsers WHERE MobileNumber = ? AND password= ?", [m, n])
}

function Adminlogin (email,passowrd)  {
    return db.execute("SELECT * FROM users WHERE email= ? AND password= ? ",[email ,passowrd])
 }

module.exports = { Customerlogin, Adminlogin };

