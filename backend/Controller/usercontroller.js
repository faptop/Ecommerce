const Errorhandler = require("../utils/errorhandling");
const catchAsyncerror=require("../middleware/catchAsyncError");
const User=require("../models/usermodel");
const sendjwttoken = require("../utils/jwttoken");

//register user
exports.registeruser=catchAsyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,avatar:{
            public_id:"this is sample id",
            url:"imagepublicid"
        },
    });
    sendjwttoken(res,user,201)

})
// ____________________________________________________________
// Login User
exports.loginuser=catchAsyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    // checking if user has given email and password both
    if(!email || !password){
        return next(new Errorhandler("eneter valid email and password",400)) //400=bad request
    }
    // here we are finding user with this (email and password)
    // here we have only found user with email ,we donot compare password
    const user=await User.findOne({email}).select("+password"); // .select("+password") bec. we have done select:false on password
    if(!user){
        return next(new Errorhandler("invalid email or password",401)); 
    }
    // here we are calling (comparepassword) function to chech passwd macthed
    const ispasswordmatched=await user.comparepassword(password);
    if(!ispasswordmatched){
        return next(new Errorhandler("invalid email or password",401)); //401 = unauthorized
        // next means pass or (same as break in loop)
    }
 sendjwttoken(res,user,201)

})
    
