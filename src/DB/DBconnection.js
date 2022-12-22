const mongoose = require('mongoose');


const DBconnection = () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = DBconnection;

