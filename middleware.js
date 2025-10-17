const Listing = require("./models/listing");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./Schema.js");
const Review = require("./models/review");
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);
  //  console.log(req); //alll info about user request
  //req.path is starting value of route //originalUrl is route path where we click
  //console.log(req.path , "..", req.originalUrl);



  if (!req.isAuthenticated()) {
    
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect('/login');
    }
    next();
}


module.exports.saveRedirectUrl = (req , res , next)=>{
  //this procees in I explain in marathi
    if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async(req, res , next)=>{
        let{id } = req.params;
       let listing = await Listing.findById(id);
       if(!listing.owner._id.equals(res.locals.currUser._id)) {
           req.flash("error", "You don't have permission to edit");
          return res.redirect(`/listings/${id}`);
       } 
       
 next();
}

module.exports.validListing = (req , res , next)=>{
   let {error} = listingSchema.validate(req.body);//check validate or not
   if (error) {
      //desplay error 
      let errMsg = error.details.map((el) => el.message).join(",");  //error details sepratly join by , 

         throw new ExpressError(400 , errMsg);
   }else{

      //else continue next process
      next();
   }
   
};

module.exports.validReview =  (req , res , next)=>{
   let {error} = reviewSchema.validate(req.body);
   if (error) {
      //desplay error 
      let errMsg = error.details.map((el) => el.message).join(",");

         throw new ExpressError(400 , errMsg);
   }else{

      //else continue next process
      next();
   }
};

module.exports.isReviewauthor = async(req, res , next)=>{
        let{id  ,reviewId } = req.params; //check reviewId in delete route of review
       let review = await Review.findById(reviewId);
       if(!review.author._id.equals(res.locals.currUser._id)) {
           req.flash("error", "You are not author of this review");
          return res.redirect(`/listings/${id}`);
       } 
 next();
}
