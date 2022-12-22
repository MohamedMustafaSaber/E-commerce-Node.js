const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true},
    img:{type :String}

    
},{timestamps: true})


module.exports = model('reviews' , schema);