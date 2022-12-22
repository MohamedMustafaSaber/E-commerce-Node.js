const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    code : {type : String , required: true , trim : true , unique: true},
    expire:{type :Date},
    discountValue:{type : Number},    
},{timestamps: true})


module.exports = model('coupon' , schema);