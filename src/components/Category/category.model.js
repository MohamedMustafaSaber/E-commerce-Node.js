const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true , unique : true},
    sulg: {type : String, lowercase : true},
    img:{type :String}
    
},{timestamps: true})


module.exports = model('category' , schema);