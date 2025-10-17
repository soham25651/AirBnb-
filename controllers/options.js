 const Listing = require("../models/listing.js");
 
 module.exports.optioncheck  =async(req , res)=>{
    
   try {
      let allListings = await Listing.find({}).populate("reviews");

     let reviewCounts = {};
     allListings.forEach(listing => {

     reviewCounts[listing._id] = listing.reviews.length;  //on each of that listing reviews store in reviewCounts object on key === key is their id
    }); 
     
   let filtered = allListings.filter(listing=>
            reviewCounts[listing._id] >= 3        //filter reviewCounts by their id
    );
         req.flash("success" , "Most popular places");
     
    res.render("listings/index.ejs" , {allListings : filtered  , success: req.flash("success")});//we access data as a alllisting in index.js with all listing but we wanr specific 
   } catch (error) {
          req.flash("error", "Something went wrong!");
        res.redirect("/listings");
   }

    
};

module.exports.roomOption = async(req , res ) => {
     
  try {
        let allListings = (await Listing.find({}));
     
           let filtered = allListings.filter(listing =>  listing.category === "Rooms" 
                   //  console.log(listing.category);
            );
           console.log(filtered);
           res.render("listings/index.ejs" , {allListings : filtered});
                 
            
  } catch (error) {
     console.error(error);
           req.flash("error", "Something went wrong!");
        res.redirect("/listings");
  }
}

module.exports.mountainsOption = async(req , res ) => {
     
  try {
        let allListings = (await Listing.find({}));
     
           let filtered = allListings.filter(listing =>  listing.category === "Mountains" 
                   //  console.log(listing.category);
            );
           console.log(filtered);
           res.render("listings/index.ejs" , {allListings : filtered});
                 
            
  } catch (error) {
     console.error(error);
           req.flash("error", "Something went wrong!");
        res.redirect("/listings");
  }
}

module.exports.poolsOption = async(req , res ) => {
     
  try {
        let allListings = (await Listing.find({}));
     
           let filtered = allListings.filter(listing =>  listing.category === "Pools" 
                   //  console.log(listing.category);
            );
           console.log(filtered);
           res.render("listings/index.ejs" , {allListings : filtered});
                 
            
  } catch (error) {
     console.error(error);
           req.flash("error", "Something went wrong!");
        res.redirect("/listings");
  }
}

module.exports.boatsOption = async(req , res ) => {
     
  try {
        let allListings = (await Listing.find({}));
     
           let filtered = allListings.filter(listing =>  listing.category === "Boats" 
                   //  console.log(listing.category);
            );
           console.log(filtered);
           res.render("listings/index.ejs" , {allListings : filtered});
                 
            
  } catch (error) {
     console.error(error);
           req.flash("error", "Something went wrong!");
        res.redirect("/listings");
  }
}