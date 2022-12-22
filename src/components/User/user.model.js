const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true  , minlenght: 2},
    email : {type : String, required: true, trim : true , unique: [true , "email must be UNIQUE"]},
    phone : {type : String, required: true, trim : true},
    password : {type : String, required: true, minlenght:[6 , "password must be at least 6 characters"]},
    profileImg : {type : String},
    role:{type: String, enum: ["user", "admin"], default: "user"},
    isActive : {type: Boolean, default: true},

},{timestamps: true});



module.exports = model('user' , schema);