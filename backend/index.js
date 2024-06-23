const express = require("express")
const passport = require('passport')
const session = require("express-session")
const cors = require('cors')
const passportsetup= require('./Auth/passport-setup')
const connectDb = require('./DB/connectDB')
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

app.listen(5000,()=>{
    console.log("server is running ")
})

