

process.removeAllListeners('warning');//if you  dont want any warning write this line


if (process.env.NODE_ENV !== "production") {
     require('dotenv').config();
}


//console.log(process.env.SECRET);

const express = require("express");

const app = express();
const path = require("path");
const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");
const methodOverride = require("method-override");


const ejsMate = require("ejs-mate");

const  session = require("express-session");

const flash = require("connect-flash");

const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("./models/user.js");

//require Review Module 
const Review =require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
let mongo_URL = process.env.DATABASE_URL;

//require listings routes 
const listingRouter = require("./routes/listing.js");                            
const  reviewsRouter = require("./routes/review.js");    
const  userRouter = require("./routes/user.js");
const extraFeature = require("./routes/option.js");

//make connection
main()
.then(() =>{
   console.log("connected to DB");
}
)
.catch(err =>{
     console.log(err);
});




async function main() {
    await mongoose.connect(mongo_URL);
}

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

const sessionOptions = {
   secret : process.env.sessionOPTIONS_SECRET_CODE,
   resave : false,
  saveUninitialized : true,
   cookie :{
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge :  7 * 24 * 60 * 60 * 1000,
      
 },

}
// app.get("/"  , (req , res)=>{
//     res.send("HI I am working");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Place your test route here
// app.get("/test-user", (req, res) => {
//     console.log("Current user:", req.user);
//     res.send(req.user ? req.user : "No user");
// });

//authinticate by default static method 
passport.use(new LocalStrategy(User.authenticate()));

//copy from Configure Passport/Passport-Local in npm-js
passport.serializeUser(User.serializeUser());  //store info of User into the session means serialize
passport.deserializeUser(User.deserializeUser());//remove info of User from the session means serialize




app.use((req , res , next)=>{
     res.locals.success = req.flash("success");  
     res.locals.error = req.flash("error");  
       //this use in navbar sign up login log out button
      //  variable is currUser 
       res.locals.currUser = req.user;
         res.locals.mapToken = process.env.MAP_TOKEN;
      next();         //after next 
});

//Demo User to check Sign up or log in
// app.get("/demouser" , async(req , res)=> {
    
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username :"delta-Student", //if even make bydefault we give own
//      });
//      //register bydefault method to store Username , with password
//      //fakeUser Extra Data
//      //helloWorld = password 
//      //Using user schema bye User model
//     let registeredUser =   await User.register(fakeUser , "helloworld");
//     console.log(registeredUser);
//     res.send(registeredUser);
// })
// Make the token available in all EJS templates
// app.use((req, res, next) => {
//   res.locals.mapToken = process.env.MAP_TOKEN;
//   next();
// });
                    //here match with routes 
//use here listings routes





app.use("/listings" , listingRouter);

app.use("/listings/:id/reviews" , reviewsRouter);

app.use("/" , userRouter);

app.use("/extra" , extraFeature);

// routes/listing.js





app.all(/.*/ ,(req , res , next)=>{
   next(new ExpressError(404 , "Page NOT Found"));
});

//middlewaares 
app.use((err, req , res , next)=>{
   //if not write anything use 500  and Somethiing wrong
    let {status = 500 , message="Something went wrong" } = err;
    res.render("error.ejs" , {err});
    //res.status(status).send(message);  
});


app.listen(8080 , ()=>{
  console.log("server is lestening to port 8080");   
});