const Listing = require("../models/listing.js");
const Review= require("../models/review.js");

module.exports.postReview = async(req , res)=>{
   //console.log("Review POST route called");
      //  console.log(req.params.id);
  let listing = await Listing.findById(req.params.id); 
  let newReview = new  Review(req.body.review);  /// review is check in show.ejs of input value of name attriut is like review[etc..]                     form Review models only give form req body of review data only 
newReview.author = req.user._id;//this is author finder 

console.log(newReview);
  //after take newReview from from in show.ejs
  //in listing specific id on reviews array push value of newReview
  listing.reviews.push(newReview);  //check listing Schema 
     //save in DBs 
  await newReview.save();   //newReview.save in listing
  await listing.save();     //and listing save in DBs
//flash for new review 
  req.flash("success" , "new Review Created !!!");

//   console.log("new Reviewd Save");
//   res.send("new Review saved");
res.redirect(`/listings/${listing._id}`);  //after add review redirect on same id 
}

module.exports.deleteReview= async(req , res)=>{
                let {id , reviewId } =  req.params;
             //we want also delete from listing
           
             await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})//pull from listing review array 
               await Review.findByIdAndDelete(reviewId);  //also delete data from review 
                //flash for delete review
                req.flash("success" , " Review Deleted!!!");
               res.redirect(`/listings/${id}`);
} 
  