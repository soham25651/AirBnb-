const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
   //Note : passportLocalMongoose  bydefault define username and password
    email:{
          type:String,
          required : true,
    },
});

//this is plug in line beacause implement Username, hashing , salting automatically
userSchema.plugin(passportLocalMongoose);//


module.exports = mongoose.model("User" , userSchema);