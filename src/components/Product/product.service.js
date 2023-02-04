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
    //1. Panigation
    let page = req.query.page*1 || 1;
    if (page < 0) page = 1;
    let limit = 5;
    let skip = (page-1)*limit ;
    //2. Filter
    let query = {...req.query};
    let excludedParams = ['page' , 'sort' , 'keyword'];
    excludedParams.forEach((ele)=>{
        delete query[ele];
    })
    query  = JSON.stringify(query);
    query = query.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    query = JSON.parse(query);
    let mongooseQuery =  ProductModel.find(query).skip(skip).limit(limit);
    //3. Sorting 
    if(query.query.sort) {
        let sortedBy = query.query.sort.split(',').join(' ');
        mongooseQuery.sort(sortedBy);
    }
    //4. Search
    if(req.query.keyword){
        let keyword = req.query.keyword;
        mongooseQuery.find({ $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" }}
        ]})
    }
    // 5. select Fields
    if (query.query.fields) {
        let fields = query.query.fields.split(',').join(' ');
        mongooseQuery.select(fields);
    }
    let Products = await mongooseQuery;
    if(!Products){
        return next(new AppError(`Products Not Found`, 400));
    }
    res.status(200).json({page,Products});
    
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