 const User = require("../models/user");
module.exports.postsignUpform = async (req, res , next) => {
  //get from fill form 
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    //by deafult register metod use 
    //register User find data from User module 
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    //after signup also logged in
    //req.login it is passport functionality


      //this login method automatically use login route                                
   req.login(registerUser, (err) => {
      if (err) { //if find err throw err
        return next(err);

      }
      req.flash("success", "Welcome to wanderlust");
      res.redirect("/listings");
    })







  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }

}


module.exports.postloginform= async (req, res) => {
    //  res.send("welcom to wandurlust ! You are logged in!");
    req.flash("success", "welcom to wandurlust ! You are logged in!");
    // res.redirect("/listings"); 


    //res.locals.redirectUrl this access from   saveRedirectUrl    middleware 
    let redirectURL = res.locals.redirectUrl || "/listings";
      //if we redirect give res.locals.redirectUrl that time if we log in form home page direct that time give error for res.redirect(res.locals.redirectUrl)
    res.redirect(redirectURL); //after login go on same route you choose before login that button
  }

  module.exports.logoutform = (req, res , next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  })
}
