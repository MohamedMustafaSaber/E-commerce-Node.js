const express = require('express');
const DBconnection = require('./src/DB/DBconnection');
const app = express()
require('dotenv').config({ path: './Config/.env' })
const morgan = require('morgan');
app.use(express.json());
const indexRouter = require('./src/index.router')
if (process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}
app.use("/category",indexRouter.categoryRouter)
const port = process.env.PORT


DBconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))