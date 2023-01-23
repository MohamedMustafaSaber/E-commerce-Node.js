const express = require('express'); 
const DBconnection = require('./src/DB/DBconnection');
const app = express()
require('dotenv').config({ path: './Config/.env' })
const morgan = require('morgan');
app.use(express.json());
const port = process.env.PORT
const indexRouter = require('./src/index.router');
const { default: mongoose } = require('mongoose');
const AppError = require('./src/Utilities/AppError');
mongoose.set('strictQuery',false)
if (process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}


app.use("/api/v1/category",indexRouter.categoryRouter)
app.all('*', (req, res,next) =>{
    next(new AppError(`Route : ${req.originalUrl} not found on Server`, 404));
} )
//global errorHandler middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({status: err.statusCode , message: err.message});
})
DBconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))