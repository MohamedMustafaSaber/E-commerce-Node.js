const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true},
    image:{type :String},
    slug: {type : String, lowercase : true},

    
},{timestamps: true})

schema.post('init',(doc)=>{
    doc.image = `${process.env.BASE_URL}` +"/Brand/"+doc.image;
})

module.exports = model('brand' , schema);