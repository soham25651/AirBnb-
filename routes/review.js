const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const { reviewSchema} = require("../Schema.js");   
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const { validReview  , isLoggedIn , isReviewauthor} =require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
//validate Review




//Reviews 
//Post Route 
router.post("/" ,
   isLoggedIn,  //check when any add review logged in or not
   validReview,  //server side validation check      and check error by wrap Async
    wrapAsync(reviewController.postReview));


//Delete Review
router.delete("/:reviewId" , 
  isLoggedIn,
  isReviewauthor,
  wrapAsync(
      reviewController.deleteReview                                                          
));
module.exports = router;