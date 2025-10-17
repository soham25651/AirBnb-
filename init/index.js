const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");


let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";




main()
.then(() =>{
   console.log("connected to DB");
   
}
) 
.catch(err =>{
     console.log(err);
});



async function main() {
    await mongoose.connect(mongo_URL);
  
}

const initDB = async ()=>{
  
  await Listing.deleteMany({});
  //initdata is object
console.log(" befor data was initialize");

initData.data=initData.map((obj)=>({
  ...obj , //with all data + owner id
  owner: "68c1382c970ed60624b1b4e4",  //this id of one user give from data base in users collection

}));
  await Listing.insertMany(initData.data);         //initData.data means all dataBase in data array 
  console.log(" after data was initialize");
  
};

 initDB();
