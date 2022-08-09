const express=require("express");
const Errormiddleware=require("./middleware/error")
const app=express();

app.use(express.json())
// importing routes
const product=require("./Routes/Productroute.js");
const userData=require("./Routes/userroute.js");
app.use("/api/v1",product);//using route app/v1/Products
app.use("/api/v1",userData);
app.use(Errormiddleware);
module.exports=app;