const express = require("express");
//make router object by Router method
const router = express.Router();

router.get("/" , (req , res)=>{
   res.send("GET for posts");   
});


//Index - Users 
router.get("/:id" , (req , res)=>{
   res.send("GET for posts id");   
});

//show - users 
router.post("/posts" , (req , res)=>{
   res.send("POST for posts");   
});

//delete of users
router.delete("/:id" , (req , res )=>{
    res.send("DELETE for posts id ");   
});
module.exports = router;