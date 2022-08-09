const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const { is } = require("express/lib/request")
const jwt = require("jsonwebtoken")

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[40,"max length exceeded"],
        minlength:[4,"enter bigger name"]
    },
    email:{
        type:String,
        required:[true,"please write email"],
        unique:true,
        validate:[validator.isEmail,"write valid email"] // see valid email path
    },
    password:{
        type:String,
        required:[true,"write password"],
        minlength:[8,"password must be greater than 8 character "],
        select:false // when we call product.find() then password will not visible
    },
    //profile pic
    avatar:{
       public_id:{
           type:String,
           required:true
       },
       url:{
           type:String,
           required:true
       }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
// ____________________________________________________________________
    // making password in crypted form
    // userschema.pre means it will do whatever written inside it before saving 
    userschema.pre("save",async function(next){
        // if condition works when we update profile and we dont want to change password  
        if(!this.isModified("password")){
            next(); // next means pass 
        }
        // down condition work when we call
        // forgot password to make new bcrypted password
        this.password= await bcrypt.hash(this.password,10);// 10 is strongest hash
    })
 // ________________________________________________________________
    //jwt token
    // we create jwt token and store it into cookie format
    // only user with token can login 
    userschema.methods.getJWTToken=function(){
        // here this._id is user unique (_id) 
        // jwt.sign means it is signin token
        // process.env is (dotenv) method
       return jwt.sign({id:this._id},process.env.JWT_SECRET,{
           expiresIn:process.env.JWT_EXPIRES,
       });
    };
    // these function are made for user so called by user.comparepassword()
    userschema.methods.comparepassword=async function(enteredpassword){
         // at database password is in bcrypted form
         return bcrypt.compare(enteredpassword,this.password);
         // (enteredpasswd,userpassword)
    };
// _____________________________________________________________________
module.exports= mongoose.model("UserData",userschema);