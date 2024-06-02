const db = require('../util/database')

function fetchBatteries (req,res)  {
   return db.execute("SELECT * FROM Aurorabattery")
}


module.exports = { fetchBatteries };

