const sendjwttoken=(res,user,status)=>{
    const token=user.getJWTToken();
    // options for cookie
    const options={
        expires:new Date(
            //Date.now()=in milliseconds
            Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000
        ),
        httpOnly:true
    }
    res.status(status).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}
module.exports=sendjwttoken