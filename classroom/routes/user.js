
const express = require("express");
//make router object by Router method
const router = express.Router();





router.get("/" , (req , res)=>{
   res.send("GET for users");   
});


//Index - Users 
router.get("/:id" , (req , res)=>{
   res.send("GET for users id");   
});

//show - users 
router.post("/" , (req , res)=>{
   res.send("POST for users");   
});

//delete of users
router.delete("/:id" , (req , res )=>{
    res.send("DELETE for users id ");   
});
module.exports = router;