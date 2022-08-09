

// importing product model 
const Product= require("../models/productmodels");
const Errorhandler = require("../utils/errorhandling");
const catchAsyncerror=require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");
// const { param } = require("../Routes/Productroute");

//creating product--Admin
exports.createproduct=catchAsyncerror(async(req,res,next)=>{
    const product =await Product.create(req.body) // making variable Product = which store 
    //   a new product created with (req.body) user provide data
    res.status(201).json({
        success:true,
        product // we are displaying that Product
    })
});
// ____________________________________________________________________
// getting all products we have created
exports.getAllProducts = catchAsyncerror(async (req,res,next)=>{
    const productperpage=3;
    const productcount=await Product.countDocuments(); //return no of product made
    const Apifeature=new Apifeatures(Product.find(),req.query)
    .search()
    .filter().Pagination(productperpage)
    const Allproducts=await Apifeature.query
    res.status(200).json({
        success:true,
        Allproducts,
        productcount
    })
});
exports.getProduct= catchAsyncerror(async(req,res,next)=>{
    const oneproduct=await Product.findById(req.params.id);
    if(!oneproduct){
        return next(new Errorhandler("product not found",404));
       // return res.status(404).json({
       //     success:false,
       //     message:"product not found"
       // }) 
   }
    res.status(201).json({
        success:true,
        oneproduct
    })
});
// _____________________________________________________________
// updating products we have created-->Admin

exports.updateproduct= catchAsyncerror(async(req,res,next)=>{
    // let not const bec. we are changing product at last  
    let product =await Product.findById(req.params.id);
      if(!product){
          return next(new Errorhandler("product not found",404));
      }
      product= await Product.findByIdAndUpdate(req.params.id,req.body,
        {
            new:true,
            runValidators:true,
            useFindAndModify:true
        })
        res.status(200).json({
            success:true,
            product
        })
});
exports.deleteproduct=catchAsyncerror(async(req,res,next)=>{
    const product=Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("page not found",404));
    }
    await product.remove();
    res.status(200).json({
          success:true,
          message:"product removed succesfully"
    })
}
);