const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true},
    img:{type :String},
    slug: {type : String, lowercase : true},

    
},{timestamps: true})


module.exports = model('brand' , schema);