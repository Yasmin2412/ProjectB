const express = require("express");
const app = express();
const router=express.Router()
const User=require("../models/user.js")
const passport = require('passport');

router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs")
})
router.post("/signup", async(req,res)=>{
    let { username,email,password} =req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password)
    console.log(registeredUser);
    req.flash("Done","Welcome to Wanderlust")
    res.redirect("/listings")
})
module.exports=router;