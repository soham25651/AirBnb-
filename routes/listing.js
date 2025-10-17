const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
//const { listingSchema, reviewSchema } = require("../Schema.js");

const ExpressError = require("../utils/ExpressError.js");
const listingController = require("../controllers/listings.js");

//require middleware of check logged in or not 
const { isLoggedIn, isOwner, validListing } = require("../middleware.js");

const multer  = require("multer")
 
const {storage} = require("../cloudConfig.js");
// const upload = multer({ dest: 'uploads/' }); starting store in upload bydefault

//now store file in third party
const upload = multer({storage }); 

//Validation Schema 
//  Purpose: Checks if user input (req.body) follows the rules in listingSchema before saving to DB.

// Process:

// Validate req.body with listingSchema.

// If invalid → collect error messages → throw ExpressError(400, "messages").

// If valid → call next() to continue.

// Analogy: Works like airport security → bad documents stop the passenger, correct ones go through.









//this use in previous structure code save in Without structure AirBnb Project 
//for test route 
// app.get("/testListing"  , async(req , res)=>{
//      let sampleListing = new Listing(

//         {

//              title : "My new Villa",
//              description : "By the beach",
//              price:1200,
//              location : "Calangute , Goa",
//              country : "India"
//         }

//     );
//   await sampleListing.save();
//   console.log("samle was saved");
//   res.send("succesfull");
// });






//1st Index route print all listing data 
//router.router use 
// router.get("/trend" , async(req , res)=>{
   
//    console.log("yes route");
//     // let allListings = await Listing.find({}); 
//     res.send("soham ");
// });


router
     .route("/")
    .get(wrapAsync(listingController.index))   //all listings display 
     .post( 
       isLoggedIn,
      upload.single('listing[image][url]') ,  //value is two image and url parse in single file
        validListing,   //Schema validation 
       wrapAsync(listingController.createListing)
      );

      // this check for image add in backend from form of add new listings
      //  .post(  upload.single('listing[image][url]') ,(req , res)=>{
      //     res.send(req.file);
      //  });



//new  route 
//listings/new in navbar 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", listingController.searchByLocation );


router.get("/:id",
   //  validListing ,  //first check valid listing
   //  isLoggedIn,
   wrapAsync(listingController.showlistings));



///Show Route print specific list
router.get("/:id/edit",
  
   isLoggedIn,
   isOwner,
  
   wrapAsync(listingController.editListing));



router.put(
  "/:id",
  isLoggedIn,
  isOwner,
//   validListing,
   upload.single('listing[image][url]'),
  wrapAsync(listingController.updateListing)
);
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;