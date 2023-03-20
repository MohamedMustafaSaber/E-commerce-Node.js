const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    title : {type : String , required: [true , "Review name requierd"] , trim : true},
    user : {type: Types.ObjectId , ref:"user"},
    product : {type: Types.ObjectId ,ref:"product"},
    ratingAverage : {
        type: Number , 
        min:[1 , "Rating average must be greater than 1"],
        max:[1 , "Rating average must be less than 5"]}    
},{timestamps: true})

schema.pre(/^find/,function(){
    this.populate('user', 'name')
})

module.exports = model('review' , schema);