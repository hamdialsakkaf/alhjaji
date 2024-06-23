const db = require('../util/database')

function Customerlogin (m,n)  {
   return db.execute("SELECT * FROM kurimiusers WHERE MobileNumber = ? AND password= ?", [m, n])
}

function Adminlogin (email,passowrd)  {
    return db.execute("SELECT * FROM adminusers WHERE email= ? AND password= ? ",[email ,passowrd])
 }
 function loginBuer (email,passowrd)  {
   return db.execute("SELECT * FROM buyers WHERE buyerEmail= ? AND buyerPassord= ? ",[email ,passowrd])
}
 
module.exports = { Customerlogin, Adminlogin, loginBuer };

