const ProductModel = require('./product.model')
const slugify = require("slugify")
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')
const factory = require('../Handlers/handler.factory')



// create new Product
const createProduct = catchAsyncErrors(async (req, res , next) => {
    req.body.slug = slugify(req.body.name);
    let newProduct = new ProductModel(req.body);
    await newProduct.save();
    if(!newProduct){
        return next(new AppError(`can not create New Product`, 400));
    }
    res.status(200).json(newProduct);
})




// get All Products
const getProducts = catchAsyncErrors(async (req, res ,next) => {
    let Products = await ProductModel.find({});
    if(!Products){
        return next(new AppError(`Products Not Found`, 400));
    }
    res.status(200).json(Products);
})


// get Product By ID 
const getProductyByID = catchAsyncErrors(async (req, res ,next) => {
    let Product = await ProductModel.findById(req.params.id);
    if (!Product) {
        return next(new AppError(`Product Not Found`, 404));
    }
    res.status(200).json(Product);
})


// update Product
const updateProduct= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if(req.body.name){
    req.body.slug = slugify(req.body.name);
    }
    let updatedProduct= await ProductModel.findByIdAndUpdate(id,req.body, { new: true });
    if (!updatedProduct) {
        return next(new AppError(`Product Not Found To Update`, 404));
    }
    res.status(200).json(updatedProduct);
})

//delete subCategory
const deleteProduct = factory.deleteFun(ProductModel);




module.exports = {
    createProduct,
    getProducts,
    getProductyByID,
    updateProduct,
    deleteProduct
}