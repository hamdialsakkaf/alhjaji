const db = require('../util/database')

 function getBuyerRequest ()  {
   return db.execute("SELECT * FROM buyerrequests")
}

module.exports = {  getBuyerRequest };

