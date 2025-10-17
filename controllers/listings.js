const Listing = require("../models/listing.js");

const ExpressError = require("../utils/ExpressError.js");
module.exports.index = async (req, res) => {
   const allListings = await Listing.find({});
 
  // console.log(Listing.schema);  <- check for this line understand
      const categoryarray = Listing.schema.path('category').enumValues;
      console.log(categoryarray[0]);
   res.render("listings/index.ejs", { allListings });
}

module.exports.searchByLocation = async(req , res)=>{
  const query  = (req.query.q || "").trim();

  let allListings = await Listing.find({}); 

 const filteredListings = query ? allListings.filter(listing => 
                                   (listing.location && listing.location.toLowerCase().includes(query.toLowerCase())) 
                                   ) 
                                   : allListings; 
   
  
     res.render("listings/index.ejs" , {allListings : filteredListings ,query});
}
  



module.exports.renderNewForm = (req, res) => {
   // if (!req.isAuthenticated()) {
   //    req.flash("error" , "you must be logged in to create listing!");
   //    return res.redirect("/login");
   // }          or use middleware 

   res.render("listings/new.ejs");
}

module.exports.showlistings = async (req, res) => {
   let { id } = req.params; //take from index.ejs in anchor tag

   const listing = await Listing.findById(id)    //find by id in DBs
     
   .populate(
         {
            path: "reviews",
            populate: {
               path: "author",
            },
         })//also show all data of reviews
      .populate("owner")  //also show all data of  owner
      .populate("category");
      if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");

      return res.redirect("/listings");
   }
   console.log(listing);
  /// console.log(listing);
 // console.log("Listing geometry:", listing.geometry);
    //console.log("Listing LOCATION:", listing.location);
// console.log(Listing.schema.path('category'));
   res.render("listings/show.ejs", { listing  ,    mapToken: process.env.MAP_TOKEN });  

}



module.exports.createListing = async (req, res, next) => {


   if (!req.body.listing) {
      throw new ExpressError(400, "Some error");
   }


    try {
    const address = req.body.listing.location;//take body location from 
     
    // Important: Nominatim requires a valid User-Agent and optional Referer
    //fetch the data from url 
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
         //this not inmportant but not empty

        headers: {
          "User-Agent": "AirbnbProjectTest/1.0",
          "Referer": "http://localhost:8080"
        }
      }
    );

   //  if (!response.ok) {
   //    throw new Error(`HTTP error! Status: ${response.status}`);
   //  }

    const data = await response.json();
  //  console.log(data);
  //  console.log("Coordinates:", data[0].lat, data[0].lon  , `this coordinates of ${address}`); // Terminal log
  




//try and catch with next is handling for error type 2
//this make new listings 
      const newlisting = new Listing(req.body.listing);
  // console.log(req.user);
  //this is our currUser
   newlisting.owner = req.user._id; //thos for when make new listing also on that listing display owner
   //for add file url with file name in DBs
   console.log(req.category+" here category");
  newlisting.category = req.body.listing.category;
   if(req.file) {
      let url = req.file.path;  //from filled in form
      let filename = req.file.filename;  //file name filled in create new listing form
   //   console.log(url, "..", filename);
      newlisting.image = { url, filename };
     
     

      console.log("here error bro");
   } 

   
if (!data || data.length === 0) {
  req.flash("error", "Location not found. Please try a nearby town.");
  return res.redirect("/listings");
}

   //add data here of latitude and longitude
    newlisting.geometry = {
      type: "Point",
      coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
    };

   let savelist =await newlisting.save();
   //console.log(savelist.geometry);
   //console.log(savelist.location);
   //flash create 


   req.flash("success", "New Listing Created !");

   res.redirect("/listings");


   



  } catch (err) {

    req.flash("error", "add any other Near Town Location ");
    res.redirect("/listings");
    console.error("Fetch error:", err);
    //res.status(500).send("Error fetching coordinates");
  }






   //This not use here we store this in variable function before wrapAsync check Validation Schema by that function  


   //    //for check listing validation
   //   //cast proble means in Backend type is Number but we post String give validation error for that we use Joi Schema add there as a object listing Schema

   // let result = listingSchema.validate(req.body);  //Joi find our validate Schema 
   // console.log(result);  // 
   // if (result.error) {     //if anyonr data not filll givr error
   //    throw new ExpressError(400 ,result.error);
   // }






   // let listing = req.body.listing;
   // console.log(listing);
   //if not send anything then post 
   // if(!req.body.listing){
   //    throw new ExpressError(400 , "Send valid data for listing");
   // }




   //this is process under use 3rd party to upload file 







   




}



module.exports.editListing = async (req, res) => {

   console.log("here error bro");
   let { id } = req.params;
   const listing = await Listing.findById(id);//find listing from DataBase 
   if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");

      return res.redirect("/listings");
   }


   let originalImageURL  = listing.image.url;

originalImageURL = originalImageURL.replace("/uploads", "/uploads?w=400&h=100");//custom image 
 //this line make by defaltly uploads fi
   //  if (!listing) {
   //     throw new ExpressError(404, "Listing you requested for does not exist!");
   // }
   res.render("listings/edit.ejs", { listing , originalImageURL});//render current all value of listing in edit.ejs for edit 
}

module.exports.updateListing = async (req, res) => {
   let { id } = req.params;
   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });//spread all data one by one from req.body of listing check in edit   Example : name=listing[title]


   if (typeof req.file != "undefined") {
      let url = req.file.path;//contains more data in req.file we want path
      let filename = req.file.filename;
      listing.image = { url, filename };//schema wise
        await listing.save();
   }

 


   //if listings update 
   req.flash("success", "Listing Updated!!!");

   res.redirect(`/listings/${id}`); //redirect on that id 
}

module.exports.deleteListing = async (req, res) => {
   let { id } = req.params;
   await Listing.findByIdAndDelete(id);  // {...req.body.listing}
   //flash for delete 
   req.flash("success", "Listing Deleted !!!");

   res.redirect("/listings");
}