// Async error= if you make some object required=true 
// and you don't give that object error can be handled by this
module.exports= (thefunc)=>(req,res,next)=>{
      Promise.resolve(thefunc(req,res,next)).catch(next);
}