const express=require("express");
const { getAllProducts,createproduct, updateproduct, deleteproduct, getProduct} = require("../Controller/Productcontroller.js");

const router=express.Router();

router.route("/product/new").post(createproduct);
router.route("/products").get(getAllProducts);// here we are using get(means call getAllProducts when visit)
router.route("/product/:id").get(getProduct);
router.route("/product/:id").put(updateproduct).delete(deleteproduct);
module.exports=router;