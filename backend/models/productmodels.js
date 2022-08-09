const mongoose=require("mongoose");

// only admin can create new object with following schema
const productSchema=new mongoose.Schema({
    // a product created must contain all these things(name,....) 
    name:{
        type:String,
        required:[true,"Please enter product name"]
        // required:[true, when not written anything error/message]
    },
    description:{
        type:String,
        required:[true,"please enter description"]

    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxlength:[8,"price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[ // here we are giving array of objects because we will provide many images of product 
        {
            // we will use cloudnary for hosting so every image will be given an public id
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"cannot exceed 4 character"]
    },
    noofreviews:{
        type:Number,
        default:0
    },
    reviews:[ //reviews is an array many no of peoples have given review
         {
             name:{
                 type:String,
                 required:true
             },
             rating:{
                 type:Number,
                 required:true
             },
             comment:{
                 type:String,
                 required:true
             }
         }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Product",productSchema);