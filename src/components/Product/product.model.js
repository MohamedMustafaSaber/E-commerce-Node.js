const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true,unique: [true, "Product name unique"],minlength: [2, "too short Product name"]},
    slug: {type : String , required: true , lowercase : true},
    description :{type : String, required: true, trim : true , minlength : 10},
    quantity : {type : Number, required: true, default : 0},
    colors:[String],
    price: {type : Number, required: true},
    priceAfterDiscount: {type : Number, required: true},
    sold : {type : Number, required: true , default : 0},
    imges:[String],
    imageCover : String,
    category : {type:Types.ObjectId , ref : "category", required: [true, "Product category required"]},
    subCategory : {type:Types.ObjectId , ref : "subcategory", required: [true, "Product subcategory required"]},
    brand : {type:Types.ObjectId , ref : "brand", required: true},
    averageRating  : {type : Number, required: true , min:[1,"rate Avgerage must be greater than 1"] , max:[5,"rate Avgerage must be less than or equal to 5"]},
    rateNum  : {type : Number, required: true,default:0}  
},{timestamps: true})


module.exports = model('product' , schema);