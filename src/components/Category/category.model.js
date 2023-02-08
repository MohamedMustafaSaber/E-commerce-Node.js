const { Schema, model, Types } = require("mongoose");


const schema  = Schema({
    name : {type : String , required: true , trim : true , unique : true},
    slug: {type : String, lowercase : true},
    img:{type :String}
    
},{timestamps: true})
schema.post('init', (doc) => {
    doc.image = `${process.env.BASE_URL}` + "/Category/" + doc.image;
})

module.exports = model('category' , schema);