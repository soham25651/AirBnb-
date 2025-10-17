const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const passport = require("passport");


const userController = require("../controllers/users.js");

const { saveRedirectUrl } = require("../middleware.js");
//get sign up 
//this for when using same route for multiple request then use  router.route  
router
  .route("/signup")
  .get( (req, res) => {
    res.render("users/signup.ejs");  //form for sign up 
  })
  //postsignup 
  .post(userController.postsignUpform);



router
  .route("/login")
  //getlog in
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  // passport.authenticate() this middleware check user verifaction all data 

  //post log in
  .post(

    saveRedirectUrl        //before log in save url  
    ,
    passport.authenticate("local", //local strategy  some time login by login , github etc.. but we want locally user enter self data
      {
        failureRedirect: "/login", //if wrong data
        failureFlash: true   //display flash message
      }),//if authentication fail  go fash messag
    userController.postloginform,

  );

//for logout   route         
router.get("/logout", userController.logoutform);

module.exports = router;