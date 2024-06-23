const express = require("express")
const passport = require('passport')
const session = require("express-session")
const cors = require('cors')
const passportsetup= require('./Auth/passport-setup')
const connectDb = require('./DB/connectDB')
const Url = require('./Models/Url');
require('dotenv').config();
const cookieSession = require('cookie-session')
const authRoute = require('./Routes/routes')
const app = express();
require('dotenv').config()

connectDb();
app.use(session({
    secret: "maulik", // Use your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/auth",authRoute)

//create
app.post("/short",async(req,res)=>{
    try
    {
        const originalUrl = req.body.originalUrl;
  
        const url = await Url.find({originalUrl})
         //check if url already exsist or not
        if(url.length>0)
            {
                res.status(409).send(url);
            }
            else
            {
                const newUrl = await Url.create({originalUrl})
                console.log("new url" ,newUrl)
                res.status(201).send(newUrl);
            }
    }   
    catch(error )
    {
        res.status(500).send({"message":"something went wrong "})
        console.log(error.message);
    }
})
//get ALL 
app.get("/short",async(req,res)=>{
    try{
        const shortUrls = await Url.find();
        if(shortUrls.length<0)
        {
            res.status(404).send({message:"short urls not found"});
        }
        else
        {
            res.status(200).send(shortUrls);
        }
    }
    catch(error)
    {
        res.status(500).send({"message":"something went wrong "})
        console.log("error : ",error.message);
    }
})
//get one
app.get("/short/:id",async(req,res)=>{
    try 
    {      
        const shortUrl = await Url.findOne({ shortUrl: req.params.id });
        console.log(shortUrl)
        if (!shortUrl)
         {
            res.status(404).send({ message: "Short URL not found" });
        }
         else
          {
            shortUrl.clickCount++;
            shortUrl.save();
            res.redirect(shortUrl.originalUrl);
        }
    }
     catch (error) 
     {
        res.status(500).send({ message: "Something went wrong" });
        console.log("Error: ", error.message);
    }
})
//delete 
app.delete("/short/:id",async(req,res)=>{
    try {
        const deletedUrl = await Url.findOneAndDelete({ shortUrl: req.params.id });
        if (!deletedUrl) {
            res.status(404).send({ message: "Short URL not found" });
        } else {
            res.status(200).send({ message: "Short URL deleted successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
        console.log("Error: ", error.message);
    }
})



app.listen(5000,()=>{
    console.log("server is running ")
})

