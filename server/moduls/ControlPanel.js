const db = require('../util/database')

 function createTire (brandname,tiresize,image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass,price)  {
   return db.execute("INSERT INTO tires (brandname, tiresize, image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass, price) VALUES (?,?,?,?,?,?,?,?,?,?)",
   [brandname,tiresize,image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass,price])
}


module.exports = { createTire };

