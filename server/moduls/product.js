const db = require('../util/database')

function fetchTires (req,res)  {
   return db.execute("SELECT * FROM tires LIMIT 4")
}

function fetchgetForTireSize (tiresize)  {
    return db.execute("SELECT * FROM tires WHERE tiresize = ?", [tiresize])
 }
 
 function getBuyerRequest ()  {
   return db.execute("SELECT * FROM buyerRequests")
}
module.exports = { fetchTires, fetchgetForTireSize, getBuyerRequest };

