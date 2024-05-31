var http = require('http');
var express = require('express')
var cors = require('cors')
const mysql = require('mysql');
var https = require('https');
var fs = require('fs');
const path = require('path')
var app = express()
const bodyParser = require('body-parser')

const db = require('./util/database')

const httpServer = http.createServer(app);
var PORT = process.env.PORT || 5000;

const product = require('./moduls/product')
const login = require('./moduls/login')
const Requests = require('./moduls/Requests')
/*
var options = {
    key: fs.readFileSync( './alhjaji.com.key' ),
    cert: fs.readFileSync( './alhjaji.com.crt' ),
    requestCert: false,
    rejectUnauthorized: false
};

var port = process.env.PORT || 443;
var server = https.createServer( options, app );
server.listen( port, function () {
    console.log( 'Express server listening on port ' + server.address().port );
} );
*/
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(cors())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('methods', 'GET,PUT,POST,DELETE');

    next();
  });
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
//app.disable('x-powered-by');
app.use(express.json());

    app.get("/",(req, res) => {
        //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.header('Content-type', 'text/html');
return res.end('<h1>Hello, Secure World!</h1>');
        //console.log('Hellow express')
    })
app.get("/H", (req,res) => {
    res.header("Content-type", 'text/html')
    return res.end('<h1>Hello, Hamdi</h1>')
})


// Define a GET route
app.get('/getire', (req, res) => {
    // res.header('Content-type', 'application/json');
    const result = product.fetchTires()
                    .then(([rows, fieldData]) => {
                        //console.log('result gettire:', rows[0], rows[1])
                        //res.status(200).json(rows);
                        res.send(rows)
                    })
                    .catch(err => console.log('fetchTires err', err))

});
// Route to get one tire
app.get("/getFromTireSize/:tiresize", (req,res)=> {
       //res.send("<h1>Hello getFromTireSize!</h1>")
 //const tiresize = req.params.tiresize;
 const tiresize = req.params.tiresize;
 console.log(tiresize)
 const result = product.fetchgetForTireSize(tiresize)
                        .then(([rows, fieldData]) => {
                           res.send(rows)
                      })
                        .catch(err => console.log('getFromTireSize err', err) )

})

app.post("/addrequest",(req, res) => {
        
    const buyer_id = req.body.buyer_id;
     const buyerShopName = req.body.buyerShopName;
    const itemNo = req.body.itemNo;
    const product = req.body.product;
    const quantity = req.body.q;

    const emitData = {product:product,buyerShopName:buyerShopName}
        

     db.query("INSERT INTO buyerrequests (buyer_id,buyerShopName,itemNo,product,quantity) VALUES (?,?,?,?,?)",[buyer_id,buyerShopName,itemNo,product,quantity],
    (err,result)=> {
          if(err){
              result.send(err)
          }

    })
        io.emit('newBuerRequest', emitData)
        res.send(result)

 })


// Route to get all tires التطبيق
app.get("/geBatteries",(req, res) => {
    //res.send("<h1>Hello getire!</h1>")
      // db.query("SELECT * FROM Aurorabattery LIMIT 4", (err, result) => {
      db.query("SELECT * FROM Aurorabattery", (err, result) => {

      if(err) {
          console.log(err)
      }
     // console.log('result tires',result)
 // res.send(result)
  res.send(result)

  })
});

// Route to get all BuyerRequests التطبيق
app.get("/getBuyerRequest",(req, res) => {
    console.log('getBuyerRequest app' )
    const result = Requests.getBuyerRequest()
    .then(([rows]) => {
        //console.log('result gettire:', rows[0], rows[1])
        //res.status(200).json(rows);
        res.send(rows)
    })
    .catch(err => console.log('getBuyerRequest err', err))
/*
      db.query("SELECT * FROM buyerRequests", (err, result) => {

      if(err) {
          console.log(err)
      }
     // console.log('result tires',result)
 // res.send(result)
  res.send(result)
  })
  */
});


// Route to get Dolar Yemeni
app.get("/getexchangeDolar", (req,res)=>{
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
   db.query("SELECT DolarexchangeRial FROM exchange",
   // db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
    (err, result) => {
        if(err) {
            console.log(err)
        }
       // console.log('result:',result[0].DolarexchangeRial)

        res.send(result);

    });
});


    // Route for creating User
    app.post("/users",  (req, res)=> {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)",[name,email,password],
     (err, result)=>{
        if(err){
            console.log(err)
        }
        res.status(200).send("registeration successful");
    });
});

// Route for creating Kurimi Customer User
app.post("/kurimiusersReg",  (req, res, next)=>{
  
    const SCustID = req.body.SCustID;
   const CustomerZone = req.body.CustomerZone;
   const customerName = req.body.customerName;
   const email = req.body.email;
   const password = req.body.password;
   const addressCity = req.body.addressCity;
   const addressStreet = req.body.addressStreet;
   const phoneNumber = req.body.phoneNumber;
      try { 
        // Code that might throw an error
                const result =  db.query("INSERT INTO KurimiUsers (SCustID,CustomerName, Email,CustomerZone, password, addressCity,addressStreet,MobileNumber) VALUES (?,?,?,?,?,?,?,?)",[SCustID,customerName,email,CustomerZone,password,addressCity,addressStreet,phoneNumber],
                (err, result) => {
               if(err) {
                     res.status(400);
                   res.send("Kurimi Error Register!")
                } else {
                    
                   res.status(200).send("registeration Kurimi Customer successful");
                }
           
              }
                )

} catch (error) { 
   //next(error); 
    //return next(new Error('Error registeration Kurimi Customer'));
      res.status(400);
    res.send("Kurimi Error Register!")
} 
});


    // تسجيل دخول لوحة تحكم موقع الويب
    app.post('/adminlogin', (req, res) => {
        //res.set('Access-Control-Allow-Origin', '*');
        //res.set('Access-Control-Allow-Headers', '*');
            const email = req.body.email;
            const passowrd = String(req.body.passowrd);
            const result = login.Adminlogin(email,passowrd)
            .then(([rows, fieldData]) => {
                console.log('result adminlogin:', rows[0])
                //res.status(200).json(rows);
                res.send(rows)
               // res.send(rows)
            })

            /*
            db.query("SELECT * FROM users WHERE email= ? AND password= ? ",[email ,passowrd] ,
            (err, result) => {
                if(err) {
                   console.log('err',err)
                res.send(err)  
                }
             res.send(result)  
        })
        */
      
    });
    

         // تسجيل دخول عملاء التجزئة   
         app.post('/customerlogin', async (req, res) => {
            //res.set('Access-Control-Allow-Origin', '*');
            //res.set('Access-Control-Allow-Headers', '*');
            
                const mobileNumber = req.body.mobileNumber;
                const passowrd = String(req.body.passowrd);
                console.log('mobileNumber Customerlogin:', req.body )

                const result = login.Customerlogin(mobileNumber,passowrd)
                .then(([rows, fieldData]) => {
                    console.log('result Customerlogin:', rows[0])
                    //res.status(200).json(rows);
                    res.send(rows[0])
                   // res.send(rows)
                })
                
                /*
                db.query("SELECT * FROM KurimiUsers WHERE MobileNumber = ? AND password= ? ",[mobileNumber ,passowrd] ,
                (err, result) => {
                    const Cemail = result[0].Email;
                    if (!Cemail) {
                          res.status(400);
                          res.send("Customer Error Login!")
                    } else {
                           res.send(result[0])  
                    }
                if(err) {
                        res.status(400);
                        //res.send("Customer Error Login!")
                        
                     } 
                 
            })
            */
        })
         
    
         // تسجيل دخول بوابة الكريمي    
   app.post('/kurimiGetwaylogin', async (req, res) => {
    //app.post('/kurimiGetwaylogin', async basicAuth() => {

        //res.set('Access-Control-Allow-Origin', '*');
        //res.set('Access-Control-Allow-Headers', '*');
        /*
        const authheader = req.headers.authorization
        console.log('authheader:',authheader)
                // Create a buffer from the string 
let bufferObj = Buffer.from(authheader, "base64"); 
  
// Encode the Buffer as a utf8 string 
let decodedString = bufferObj.toString("utf8"); 
  
console.log("The decoded string:", decodedString); 

     
        res.send(decodedString)
*/
        /*
         if (!authheader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
       // return next(err)
      }
        const authDecode =  Base64.decode(authheader)
                console.log('authDecode:',authDecode)

         const user = authDecode[0];
        const pass = authDecode[1]
        */
            // السابق قبل المصادقة Basic
            //const name = req.body.name;
           // const passowrd = String(req.body.pass);
           // db.query("SELECT * FROM paymentGetwayUsers WHERE Username = ? AND Password= ? ",[name ,passowrd] ,
            db.query("SELECT * FROM paymentGetwayUsers WHERE Username = ? AND Password= ? ",[user ,pass] ,

            (err, result) => {
              
    
            if(err) {
                    res.status(400);
                    //res.send("Customer Error Login!")
                    
                 } 
            res.send(result[0])  
 
        })
        
    })
    

        // تسجيل دخول العملاء على التطبيق
        app.post('/loginBuer', async (req, res) => {
            //res.set('Access-Control-Allow-Origin', '*');
            //res.set('Access-Control-Allow-Headers', '*');
                const email = req.body.email;
                const passowrd = String(req.body.passowrd);
                db.query("SELECT * FROM buyers WHERE buyerEmail= ? AND buyerPassord= ? ",[email ,passowrd] ,
                (err, result) => {
                    if(err) {
                       console.log('err',err)
                    res.send(err)  
    
                    }
                // السابق الصالح
                 //res.send(result)  
    
                 res.send(result[0])  
            })
          
        });
        
    
// اختيار بطاقة الدفع
app.get("/chooseBankCard",(req, res) => {
    //res.send("<h1>Hello getire!</h1>")
       //db.query("SELECT * FROM tires LIMIT 4", (err, result) => {
      db.query("SELECT * FROM PaymentCards", (err, result) => {

      if(err) {
          console.log(err)
      }
     // console.log('result tires',result)
 // res.send(result)
  res.send(result)

  })
});


// Route for creating the tire
app.post("/createtire",(req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
    const brandname = req.body.brandname;
    const tiresize = req.body.tiresize;
    const image = req.body.imageurl;
    const Maxload = req.body.Maxload;
    const MaxSpeed = req.body.MaxSpeed;
    const Depthoftread = req.body.Depthoftread;
    const Rollingresistance = req.body.Rollingresistance;
    const Wetgripclass = req.body.Wetgripclass;
    const noiseClass = req.body.noiseClass;
    const price = req.body.price;

    db.query("INSERT INTO tires (brandname, tiresize, image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass, price) VALUES (?,?,?,?,?,?,?,?,?,?)",[brandname,tiresize,image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass,price], 
    (err, result)=>{
        if(err){
            console.log(err)
         res.send(err)  

        }
        //console.log(result)
         res.send(result)  

    })
});

// Route to like a post
app.post('/like/:id',cors(),(req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Headers', '*');
     const id = req.params.id;
     db.query("UPDATE tires SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
         if(err) {
        console.log(err)   } 
        console.log(result)
         });    
     });
 

    // Route to get one tire
    app.get("/getFromTireId/:id", (req,res)=>{
        //res.set('Access-Control-Allow-Origin', '*');
       // res.set('Access-Control-Allow-Headers', '*');
        const id = req.params.id;
        db.query("SELECT * FROM tires WHERE id = ?", id,
        (err, result) => {
            if(err) {
                console.log(err)
            }
            res.send(result)
        })
    });
     

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

   // app.listen()