class Errorhandler extends Error{
    // making a constructor taking status code,message as input
    constructor(message,statuscode){
        super(message);// it will show message
        this.statuscode=statuscode;

        Error.captureStackTrace(this,this.constructor);
    }

}
module.exports=Errorhandler