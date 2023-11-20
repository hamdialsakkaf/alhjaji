const express = require("express")
const cors = require('cors');

const db = require('./db')
const dotenv = require("dotenv")
//dotenv.config()
// from vedio
//const config = require("./config/db")
//const { port, allowedDomains }  = config
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser')
var path = require("path")
const app = express()
// 👇️ configure CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

/*
app.use(cors({
    origin: '*' , 
    methods: 'GET,PUT,POST,OPTIONS', 
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  'Cache-Control': 'public'

}));

   app.use(cors({
    origin: '*'
}));
*/
/*
const compressing = require('compressing');
app.use(compressing())
*/
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // support url-encoded bodies

app.use(express.static(path.join(__dirname, '/public')));
/*
app.get('/*', function (req, res) {
    //res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));

  });
  */
  /*
const PORT = 3000;
// from vedio
//app.use(cors({origin: allowedDomains, credentials: true }))
//app.use(helmet())
app.use(express.json())
//app.use(cors({ origin: 'https://alhjaji.com/', credentials: true }));
//app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));
/*
app.use(cors({
   // origin: 'https://alhjaji.com/',
    origin: ['https://alhjaji.com', 'http://alhjaji.com/']
}));
*/
 
// Middleware Function to authenticate the user
const auth = (req, res, next) => {
    console.log(req.body);
    if(req.body.logged){
        next();
        return;
    }
    res.send({
        success: false,
        message: "Unauthorized Access"
    });
}

// Post request handler for the /admin route
app.post("/admin", auth, (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
    res.send({
        success: true,
        message: "Successfully Authenticated"
    });
})

// Route to get all posts
app.get("/api/get", (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
        
    db.query("SELECT * FROM posts", (err, result) => {
        if(err) {
            console.log(err)
        }

    res.send(result)
    })
});

// Route to get all tires
app.get("/api/getire",(req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', 'no-cache');
    //res.set('cache', '*');
    res.set('Content-Type', 'application/json');
    //res.setHeader('Cache-Control', 'public')
    db.query("SELECT * FROM tires LIMIT 4", (err, result) => {
        if(err) {
            console.log(err)
        }
       // console.log('result tires',result)
   // res.send(result)
    res.send(result)

    })
});

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');

    const id = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", id,
    (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result.json())
    })
});

// Route to get one tire
app.get("/api/getFromTireId/:id", (req,res)=>{
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
// Route to get one tire
app.get("/api/getFromTireSize/:tiresize", (req,res)=>{
   // res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
    const tiresize = req.params.tiresize;
   db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
   // db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
    (err, result) => {
        if(err) {
            console.log(err)
        }
   
        res.send(result)

       // console.log('Tires on Size:', result)
    })
})
// Route to get Dolar Yemeni
app.get("/api/getexchangeDolar", (req,res)=>{
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
   db.query("SELECT DolarexchangeRial FROM exchange",
   // db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
    (err, result) => {
        if(err) {
            console.log(err)
        }
       // console.log('result:',result[0].DolarexchangeRial)

        res.send(result)

    })
})

// Route to get brand logo
app.get("/api/getBrandLogo/:BrandName",(req,res)=>{
    //res.set('Access-Control-Allow-Origin', '*');
    //res.set('Access-Control-Allow-Headers', '*');
    const BrandName = req.params.BrandName;
   db.query("SELECT * FROM brands WHERE BrandName= ?", BrandName,
   // db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
    (err, resultLogo) => {
        if(err) {
            console.log(err)
        }
        console.log('BrandName:', resultLogo[0])

        res.send(resultLogo)

    })
})


// Route for creating the post
app.post('/api/create',(req, res) => {
   // res.set('Access-Control-Allow-Origin', '*');
   // res.set('Access-Control-Allow-Headers', '*');
    const username = req.body.userName;
    const title = req.body.title;
    const text = req.body.text;
    db.query("INSERT INTO posts (title, post_text, userName) VALUES (?,?,?)",[title,text,username], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
    })
});

// Route for creating the tire
app.post('/api/createtire', (req, res) => {
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

    db.query("INSERT INTO tires (brandname, tiresize, image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass, price) VALUES (?,?,?,?,?,?,?,?,?,?)",[brandname,tiresize,image,Maxload,MaxSpeed,Depthoftread,Rollingresistance,Wetgripclass,noiseClass,price], (err, result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
    })
});

// Route to like a post
app.post('/api/like/:id',cors(),(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
        if(err) {
       console.log(err)   } 
       console.log(result)
        });    
    });

    // Route to delete a post
    app.delete('/api/delete/:id',cors(), (req,res)=>{
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', '*');
    const id = req.params.id;
    
    db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
    if(err) {
    console.log(err)
            } 
        })
    });

      // Route to delete a post
      app.delete('/api/deleteTire/:id',cors(),(req,res)=>{
        const id = req.params.id;
        
        db.query("DELETE FROM tires WHERE id= ?", id, (err,result)=>{
        if(err) {
        console.log(err)
                } 
            })
        });

    // Route for creating User
    app.post('/api/users', async (req, res) => {
       // res.set('Access-Control-Allow-Origin', '*');
       // res.set('Access-Control-Allow-Headers', '*');
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)",[name,email,password],
     (err, result)=>{
        if(err){
            console.log(err)
        }
        res.status(200).send("registeration successful");
    })
});

// Route to login Users
//app.get("/login/:params", (req,res)=>{


    app.post('/api/login', async (req, res) => {
        //res.set('Access-Control-Allow-Origin', '*');
        //res.set('Access-Control-Allow-Headers', '*');
            const email = req.body.email;
            const passowrd = String(req.body.passowrd);
            console.log('email', email)
            console.log('passowrd:',passowrd)
            //db.query("SELECT * FROM users WHERE email= ? AND password= ? ",[email ,passowrd] ,

            // db.query("SELECT * FROM tires WHERE TireSize = ?", tiresize,
            db.query("SELECT * FROM users WHERE email= ?",email,

            (err, result) => {
                if(err) {
                   console.log('err',err)

                }
                res.send(result)  
        })
      
    })
    
   
/*
       if (email ) {
        console.log(email+'='+ emailAuth)
    }
    if (passowrd ) {
        console.log(passowrd+'='+ passowrdAuth)
        res.send(result)
    } else {
        res.send(err)
    }
    */
    //})
       
    
  /*
    let myPromise = new Promise(function(myResolve, myReject) {
        let x = 0;
      
      // some code (try to change x to 5)
      if (email = emailAuth) {
        myResolve("OK");
      } else {
          myReject("Error");
        }
      });
      
      myPromise.then(
        function(value) {
            if (passowrd = passowrdAuth) {
                res.send(reault)
            }
            myDisplayer(value);
        },
        function(error) {myDisplayer(error);}
      );
  */
//})




/*
var httpProxy = require('http-proxy');

var proxy_web = new httpProxy.createServer({
    target: "http://localhost:8080/",
    secure: true
})

var proxy_api = new httpProxy.createServer({
    target: "http://localhost:8081/",
    secure: true,
})
https.createServer(
    {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.crt"),
        ca: fs.readFileSync("serverCA.ca-bundle"),
    },
    function(req, res) {
        try {
            if (req.headers.host === "api.alhjaji.com") {
                if(!req.url.includes("/api"))
                {
                    proxy_web.proxyRequest(req, res);
                    proxy_web.on("response", (remoteRes) => {
                        res.writeHead(remoteRes.statusCode, remoteRes.headers);
                        remoteRes.pipe(res);
                    });
                    proxy_web.on("error", function(err, req,res){
                        if (err) console.log(err);
                        res.writeHead(500);
                        res.end("Oops, something went very wrong...");
                    });
                }
                else {
                    req.url = req.url.replace('/api', '/')
                    proxy_api.proxyRequest(req, res);
                    proxy_api.on("response", (remoteRes) => {
                        res.writeHead(remoteRes.statusCode, remoteRes.headers);
                        remoteRes.pipe(res);
                    });
                    proxy_api.on("error", function (err, req, res) {
                        if (err) console.log(err);
                        res.writeHead(500);
                        res.end("Oops, something went very wrong...");
                    });
                }
            } else if (req.headers.host === "api.alhjaji.com") {
                proxy_api.proxyRequest(req, res);
                proxy_api.on("response", (remoteRes)=> {
                    res.writeHead(remoteRes.statusCode, remoteRes.headers);
                    remoteRes.pipe(res);
                });
                proxy_api.on("error", function (err, req, res) {
                    if (err) console.log(err);
                    res.writeHead(500);
                    res.end("Oops, something went very wrong...");
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    
)
.listen(443, function () {
    console.log("App is running on the port", 443)
})

*/
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

   // app.listen()