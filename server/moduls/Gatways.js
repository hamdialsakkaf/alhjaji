const db = require('../util/database')

 function kurimiUserReg (SCustID,customerName,email,CustomerZone,password,addressCity,addressStreet,phoneNumber)  {
   return db.execute("INSERT INTO KurimiUsers (SCustID,CustomerName, Email,CustomerZone, password, addressCity,addressStreet,MobileNumber) VALUES (?,?,?,?,?,?,?,?)"
   ,[SCustID,customerName,email,CustomerZone,password,addressCity,addressStreet,phoneNumber])
}



function FetchPaymentCards ()  {
    return db.execute("SELECT * FROM PaymentCards")
 }
module.exports = { kurimiUserReg, FetchPaymentCards };

