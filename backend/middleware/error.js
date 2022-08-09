// if you provide wrong id to found a product 
// so error can be handled by this 
const Errorhandler = require("../utils/errorhandling");

module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode||500
    err.message=err.message||"internalserver error"

    // wrong mongodb id (small id) cast error
    if(err.name === "CastError"){
       const message=`Resources not found : ${err.path}`;
       err= new Errorhandler(message,400);
    }
    res.status(err.statuscode).json({
        success:false,
        error:err.stack
    });

};