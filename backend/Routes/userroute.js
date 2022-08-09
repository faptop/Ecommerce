const express=require("express");
const { registeruser, loginuser } = require("../Controller/usercontroller");

const router=express.Router();
router.route("/user/register").post(registeruser);
router.route("/user/login").post(loginuser);
module.exports=router