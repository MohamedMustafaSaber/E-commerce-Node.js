process.on('uncaughtException',(err) => {
    console.log(('uncaughtException',err));
})

const express = require('express'); 
const DBconnection = require('./src/DB/DBconnection');
const app = express()
require('dotenv').config({ path: './Config/.env' })
const morgan = require('morgan');
app.use(express.json());
app.use(express.static('Uploads'))
const port = process.env.PORT
const indexRouter = require('./src/index.router');
const { default: mongoose } = require('mongoose');
const AppError = require('./src/Utilities/AppError');
const globalMiddleware = require('./src/Utilities/GolbalMiddleware');
const sendEmail = require('./src/Utilities/sendEmail.js');
mongoose.set('strictQuery',false)
if (process.env.MODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}

app.use("/api/v1/category",indexRouter.categoryRouter)
app.use("/api/v1/subCategory",indexRouter.subCategoryRouter)
app.use("/api/v1/brand",indexRouter.brandRouter)
app.use("/api/v1/product",indexRouter.productRouter)
app.use("/api/v1/users",indexRouter.userRouter)
app.use("/api/v1/review",indexRouter.reviewRouter)



app.all('*', (req, res,next) =>{
    next(new AppError(`Route : ${req.originalUrl} not found on Server`, 404));
})
//global errorHandler middleware
app.use(globalMiddleware)
DBconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandeledRejection', (err) =>{
    console.log("unhandeledRejection", err);
})