const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {

            // filename: {
            //     type: String,
            //     default: "listingimage"
            // },

            // url:
            // {
            //     // type: String,
            //     // //on a default value 
            //     // default: "https://images.unsplash.com/photo-1755129307402-667c73e44703?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            //     // //set value of image 
            //     // //v is input store variable of image by user 
            //     // //if empty add defaultlink 
            //     // // else addd user request v
            //     // set: (v) => v === "" ?
            //     //     "https://images.unsplash.com/photo-1755129307402-667c73e44703?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //     //     : v,




            // },



            // this is change  become in Project phase 2 part a topic - save link in mongo
            url: String,
            filename: String,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,  //reviews object id 
                ref: "Review", //Review module
            },
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",   //
        },
        category: {
            type: String,
           required : true
            // enum: ["mountains", "arctic", "farms", "deserts","castles" , "amazing pools" , "camping" , "Iconic cities" , "Arctic" , "Domes" ,"Boats"]
          
        },
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: false
            },
            coordinates: {
                type: [Number],
                required: false
            }
        }


    }
);

//if listing delete we want to delete all Listing Reviews
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }


});








const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;