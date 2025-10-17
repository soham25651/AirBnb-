const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
//for connect  flash
const flash = require("connect-flash");
const path = require("path");
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname , "views"));

const sessionOption = {
     secret :"mysupersecretstring" , //unique id give to our session
     resave : false , //not double save 
     saveUninitialized : true,  
};
//middle ware 
app.use(session(sessionOption));

//for connect  flash
app.use(flash());
            //here right multiple way to use connect flash 
            //1) is use render 
            //2) 2nd is use res.locals with render 
            //3) is use middlewarre 
//middle ware connect flash this use when we have multiple time   
//current I am not write here 

 //storing and UsingInfo

 
app.get("/register" ,(req , res)=>{
    // register?name=soham  query is ?name=soham
     let {name  = "anonymous"} = req.query; //if any name not write bydefault use  ananymous
    
    
     console.log(req.session); //this is object 
    //store here in session 
     req.session.name = name; //also you should add any wuery in session


     //create flash 
   
if (name === "anonymous") {
        req.flash("error" , "user nor registered ");
}else{
  req.flash("success" , "User register succesfull");
}
  


      console.log(req.session.name);
     res.redirect("/hello");
});
//upper info use here on different route req.session.name if soham name in query use in same session but different route 
app.get("/hello" , (req , res)=>{

   //then use info that store value use
   // res.send(`hello ${req.session.name}`); 

   //normal way 
  // res.render("page.ejs" , {name : req.session.name , msg : req.flash("success")});


  //best way for flash use res.locals 
  res.locals.messages = req.flash("success");  //In page.ejs use messages
  //for error  
    res.locals.errormsg = req.flash("error");
  res.render("page.ejs" , {name : req.session.name});



})
     //count request 
// app.get("/reqcount" , (req , res)=>{
//     //make sessionId to every process now we count how many time we call request to our sessions 
//    //if we start same route on multiple tab on same session
//    //track with help of express session

//    if (req.session.count) {
//         req.session.count++;
//     } else {
//        req.session.count = 1; 
//     }
//     res.send(`You sent a request ${req.session.count} times`);   
// });



       //here now you apply any route now attach them  unique Session id by make secret in the form of cookie

// app.get("/test" , (req , res)=>{
//    res.send("test succesfull!");   
// });






















//const cookieParser = require("cookie-parser");



















//all is most important  Cookie chapter all cover here
//app.use(cookieParser()); // for normalnow you able to Parse cookie
// app.use(cookieParser("secretCode"));  //for signed add secreCode 


// app.get("/getsignedcookie" , (req , res)=> { //now try start route check in application of inspect
//       res.cookie("made-in" , "India" , {signed : true});//here value go in  code form
//       res.send("signed cookie sent");
// });

// app.get("/verify" , (req , res)=>{
//    //console.log(req.cookies);//for normal coookies 
//     console.log(req.signedCookies);//if any change or tempar in value give false or empty
//    res.send("verified"); //now try to add random name and value
//    ///on /verify route in application display verified
//    //also in terminal prin name and value pair 

// });


// app.get("/getcookies" , (req , res)=>{
// res.cookie("greet" , "hello");           //greet is name   hello is value 
// //now check and start server.js
//  //go on route 
//  //start route with http://localhost:3000/getcookies
//  //then go on inspect -> application -> cookies -> link 

//    res.send("sent you some cookies!");
// })

// app.get("/greet" , (req , res)=>{
//   let {name = "ananoms"} = req.cookies;   //if not any name write by default print ananoms
//  res.send(`Hi am  ${name}`);  //you now in inspect on webpase in application write any name then    on Name = name on Value = any name 
// });



// app.get("/" , (req , res)=>{

//     console.dir(req.cookies); // but fist require cookie-parser  this way to Parse 
//             res.send("Hi am root");   
// });
// //if route start from /users use users
// app.use("/users" , users);

// app.use("/posts" , posts);
///If make post , show , delete for users and post then file make complex
//Index - Users 

app.listen(3000 , ()=>{
 console.log("Sever id listenig to 3000");   
});