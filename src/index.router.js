const categoryRouter = require('./components/Category/category.api');
const subCategoryRouter = require('./components/subCategory/subCategory.api')
const brandRouter = require('./components/Brand/brand.api')
const productRouter = require('./components/Product/product.api')
const userRouter = require('./components/User/user.api')
const reviewRouter = require('./components/Reviews/reviews.api.js')
module.exports = {
    categoryRouter,
    subCategoryRouter,
    brandRouter,
    productRouter,
    userRouter,
    reviewRouter
}



