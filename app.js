const express = require('express'); 
const DBconnection = require('./src/DB/DBconnection');
const app = express()
require('dotenv').config({ path: './Config/.env' })
const morgan = require('morgan');
app.use(express.json());
const port = process.env.PORT
const indexRouter = require('./src/index.router');
const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery',false)
if (process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}


app.use("/api/v1/category",indexRouter.categoryRouter)


//global errorHandler middleware
app.use((err,req,res,next)=>{
    res.status(400).json(err);
})
DBconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))