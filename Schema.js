const Joi = require("joi");
//listingSchema (Joi Validation) — Quick Reference

// Purpose: Defines the rules for what a valid listing must look like before saving to DB.

// Structure:

// listing → main object (required).

// title: must be a string, cannot be empty.

// description: must be a string, required.

// location: must be a string, required.

// country: must be a string, required.

// price: must be a number, required, must be ≥ 0.

// image: must be a string, but can also be "" (empty) or null. 


module.exports.listingSchema = Joi.object(
 {
   listing : Joi.object({
          title : Joi.string().required(),
          description : Joi.string().required(),
          location : Joi.string().required(),
          country : Joi.string().required(),
          price : Joi.number().required().min(0),   
           image: Joi.object({
                filename: Joi.string().allow("", null),
          url: Joi.string().allow("", null)   // allow empty or null
                           }),
            category : Joi.string().required()           
 }).required()
 });


 module.exports.reviewSchema = Joi.object({
   review : Joi.object({
      rating : Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
   }).required(),
 })
