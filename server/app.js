var express = require('express')
var cors = require('cors')
const cookieParser = require('cookie-parser');

const mysql = require('mysql');
var https = require('https');
var fs = require('fs');
const path = require('path')
var app = express()
const bodyParser = require('body-parser')
const db = require('./util/database')
var jwt = require('jsonwebtoken');
const { verifyAdminToken, verifyCustomerToken} = require('./middlewares/requireAuths')


//const httpServer = http.createServer(app);
var PORT = process.env.PORT || 5000;

const product = require('./moduls/product')
const login = require('./moduls/login')
const Requests = require('./moduls/Requests')
const Payment = require('./moduls/Payment')
const Register = require('./moduls/Register')
const Gateway = require('./moduls/Gatways')
const FetchForAndroidApp = require('./moduls/FetchForAndroidApp')
const Control = require('./moduls/ControlPanel')
const requireAuth = require('./moduls/requireAuths')

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
const port = 3000;

const http = require("http").createServer();
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3001"
      }
});
//Listen for a client connection 
io.on("connection", (socket) => {
    //Socket is a Link to the Client 
    console.log("New Client is Connected!");
    //Here the client is connected and we can exchanged 
    //Send Message 
    //We need to use the Socket (the link between the server and the connected user(s)).
    socket.emit("welcome", "Hello and Welcome to the Server");
});
//io.emit('connect', 'Hello, World!');
//Listen the HTTP Server 
http.listen(port, () => {
    console.log("Server socket Is Running Port: " + port);
});
app.use(cors())

const corsOptions = {
    origin:["http://localhost:3001"],
   // credentials: true,
    exposeHeaders:['Authorization']
}
app.use(cors(corsOptions));

/*
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3001','http://localhost:3000']);

    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
//app.disable('x-powered-by');
app.use(express.json());
// Use cookie parser middleware to parse cookies
//app.use(cookieParser('c045acda77617205441ef2'));

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
app.get('/getire',verifyCustomerToken, (req, res) => {
 
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
        
    const result = Requests.addrequest(buyer_id,buyerShopName,itemNo,product,quantity)
    .then(([rows, fieldData]) => {
       //res.send(rows)
       io.emit('newBuerRequest', emitData)
       res.send(rows)

  })
    .catch(err => console.log('addrequest err', err) )

 })


// Route to get all tires التطبيق
app.get("/geBatteries",(req, res) => {

        const result = FetchForAndroidApp.fetchBatteries()
        .then(([rows]) => {
            res.send(rows)
        })
        .catch(err => {
            res.status(400)
            res.send('get Batteries data error')
            console.log('get Batteries data error', err)
        })
});

// Route to get all BuyerRequests from  التطبيق
app.get('/getBuyerRequests', verifyAdminToken, (req, res) => {
    console.log('getBuyerRequest app' )
     
        const result = Requests.getBuyerRequest()
        .then(([rows, fieldData]) => {
            //res.send(rows)
            res.send(rows);
            console.log('rows getBuyerRequest:',rows)
        })
        .catch(err => {
            res.status(400)
             // res.json({ message: 'لا يوجد لديك صلاحيات' });
            //res.send('get Buyers Request  error')
            console.log('get Buyers Request error', err)
        })
    })
    
    /*
    const result = Requests.getBuyerRequest()
    .then(([rows]) => {
        res.send(rows)
    })
    .catch(err => {
        res.status(400)
        res.send('get Buyers Request  error')
        console.log('get Buyers Request error', err)
    })
*/
//});


// Route to get Dolar Yemeni
app.get("/getexchangeDolar", (req,res)=>{
    const result = Payment.getexchangeDolar()
    .then(([rows]) => {
        res.send(rows)
    })
    .catch(err => console.log('getexchangeDolar err', err))

});


    // Route for creating User
    app.post("/users",  (req, res)=> {
        
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.passowrd;
        const result = Register.registerUser(name,email,password)
        .then(([rows]) => {
           
        
            res.send(rows)
        })
        .catch(err => console.log('Register users err', err))

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

   const result = Gateway.kurimiUserReg(SCustID,customerName,email,CustomerZone,password,addressCity,addressStreet,phoneNumber)
   .then(([rows]) => {
    res.send(rows)
   })
   .catch(err => {
    res.status(400);
    res.send("Kurimi Error Register!")
    console.log('Register users err', err)
   })

});
    // تسجيل دخول لوحة تحكم موقع الويب
    app.post('/adminlogins',(req, res) => {
         //const JWT_SECRET = process.env.JWT_SECRET;
         const JWT_SECRET = 'c045acda77617205441ef7';
         console.log('adminlogin posting')
         
            const email = req.body.email;
            const passowrd = String(req.body.passowrd);
            console.log('adminlogin email',email)
            console.log('adminlogin passowrd',passowrd)

                const user = {
                    userEmail:email,
                    passowrd:passowrd
                }
               
                const result = login.Adminlogin(email,passowrd)
                .then(([rows, fieldData]) => {
                    console.log('email for token', rows[0].email)
                    const em = rows[0].email
                      // Issue token
          const payload = { em };
     
          const auth_token = jwt.sign({em},
             JWT_SECRET,
            //{expiresIn:'50h'}
            );
          console.log('auth_token server',auth_token)
          // Set the cookie with the token
            // res.cookie("Authorization",auth_token, {signed:true,maxAge:24000});
            // Send the response back to the client
           // res.cookie('name', 'GeeksForGeeks', { signed: true }).send(); 
           // console.log('req.signedCookies',req.signedCookies) 
            //res.send({auth_token: auth_token});
            res.json({ auth_token: auth_token });
                  //  const token = jwt.sign({em}, JWT_SECRET);
                      //Mock user
                //res.send({token: token, rows})
                // السابق الصالح قبل token
                //res.send(rows)
            })
            

                
                 /* 
                .then(()=>{
                    const result = login.Adminlogin(email,passowrd)
                    .then(([rows, fieldData]) => {
                        console.log('email for token', rows[0].email)
                      
                          //Mock user
                    //res.send({token: token, rows})
                    // السابق الصالح قبل token
                   // res.send(rows)
                })
                })
      
                const result = login.Adminlogin(email,passowrd)
                .then(([rows, fieldData]) => {
                    console.log('email for token', rows[0].email)
                    jwt.verify(req.token,'c045acda77617205441ef', (err, authData)=>{
                        if(err)
                            res.sendStatus(403);
                        else{
                            res.send({
                                rows:rows,
                                userData:authData
                            })
                        }
                    })
                      //Mock user
                //res.send({token: token, rows})
                // السابق الصالح قبل token
                //res.send(rows)
            })
            *//*
            .catch(err => {
                res.status(400);
                res.send("admin login Error!")
                console.log('admin login err', err)
               })
               */
    })
    

         // تسجيل دخول عملاء التجزئة   
         app.post('/customerlogin', async (req, res) => {
            // KurimiUsers table
            const JWT_SECRET = 'c045acda77617205441ef8';
            console.log('customerlogin login...')

                const mobileNumber = req.body.mobileNumber;
                const passowrd = String(req.body.passowrd);
                console.log('mobileNumber Customerlogin:', req.body )

                const result = login.Customerlogin(mobileNumber,passowrd)
                .then(([rows, fieldData]) => {
                    console.log('result Customerlogin:', rows[0])
                    //res.status(200).json(rows);
                    // السابق الصالح قبل التوكن
                   // res.send(rows[0])
                    console.log('mobileNumber for token', rows[0].MobileNumber)
                    const MobileNumber = rows[0].MobileNumber
                   // res.send(rows)
                   const auth_CustomerToken = jwt.sign({MobileNumber},
                    JWT_SECRET,
                   //{expiresIn:'50h'}
                   );
                 console.log('auth_CustomerToken server',auth_CustomerToken)
                 res.status(200).json({
                    rows: rows[0],
                    auth_CustomerToken: auth_CustomerToken
                    });
                // res.json({ auth_CustomerToken: auth_CustomerToken });
                })
                .catch(err => {
                    res.status(400);
                    res.send("Customer login Error!")
                    console.log('Customer login err', err)
                   })
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
                console.log('email server loginBuer:', req.body )

                const result = login.loginBuer(email,passowrd)
                .then(([rows, fieldData]) => {
                    //res.status(200).json(rows);
                    res.send(rows)
                })
                .catch(err => {
                    res.status(400);
                    res.send("login buyer login Error!")
                    console.log('Buyer login err', err)
                   })
  
        });
        
    
// اختيار بطاقة الدفع
app.get("/chooseBankCard",(req, res) => {
    //res.send("<h1>Hello getire!</h1>")
       //db.query("SELECT * FROM tires LIMIT 4", (err, result) => {
        const result = Gateway.FetchPaymentCards()
                        .then(([rows]) => {
                            res.send(rows)
                        })
                        .catch(err => {
                        res.status(400)
                        res.send('Choose Bank Card Error')
                        console.log('Choose Bank Card Error', err)
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

    const result = Control.createTire(brandname,tiresize,image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass,price)
    .then(([rows]) => {
        res.send(rows)
    })
    .catch(err => {
        res.status(400)
        res.send('Create Tire Error')
        console.log('Create Tire Error', err)
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