const db = require('../util/database')

 function getBuyerRequest ()  {
   return db.execute("SELECT * FROM buyerrequests")
}
// اضافة طلب من جهة عميل الجملة (التطبيق)
function addrequest (buyer_id,buyerShopName,itemNo,product,quantity)  {
  return db.execute("INSERT INTO buyerrequests (buyer_id,buyerShopName,itemNo,product,quantity) VALUES (?,?,?,?,?)",[buyer_id,buyerShopName,itemNo,product,quantity])
}

module.exports = {  getBuyerRequest, addrequest };

