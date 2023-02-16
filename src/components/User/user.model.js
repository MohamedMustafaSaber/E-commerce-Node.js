const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const schema  = Schema({
    name : {type : String , required: true , trim : true  , minlenght: 2},
    email : {type : String, required: true, trim : true , unique: [true , "email must be UNIQUE"]},
    phone : {type : String, required: true, trim : true},
    password : {type : String, required: true, minlenght:[6 , "password must be at least 6 characters"]},
    passwordChangedAt : Date,
    profileImg : {type : String},
    role:{type: String, enum: ["user", "admin"], default: "user"},
    isActive : {type: Boolean, default: true},

},{timestamps: true});

schema.pre('save' ,async function(){
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND))
})
schema.pre('findOneAndUpdate', async function () {
    this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND))
})

module.exports = model('user' , schema);