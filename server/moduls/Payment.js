const db = require('../util/database')

 function getexchangeDolar ()  {
   return db.execute("SELECT DolarexchangeRial FROM exchange")
}


module.exports = {  getexchangeDolar };

