const BrandModel = require('./brand.model')
const slugify = require("slugify")
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')
const factory = require('../Handlers/handler.factory')
const cloudinary = require('cloudinary');


// Configuration 
cloudinary.config({
    cloud_name: "dpa8mknlt",
    api_key: "623725392122991",
    api_secret: "JaYkgK-mINAr71MaP9oVAciGw3Y"
});





// create new Brand
const createBrand = catchAsyncErrors(async (req, res , next) => {
    // cloudinary.v2.uploader.upload(req.file.path , async(error , result)=>{
        const { name } = req.body;
        req.body.slug = slugify(name);
        // req.body.image = result.secure_url;
        req.body.image = req.file?.filename;
        let newBrand = new BrandModel(req.body);
        await newBrand.save();
        if (!newBrand) {
            return next(new AppError(`can not create New Brand`, 400));
        }
        res.status(200).json(newBrand);
        console.log(result)
    // })
    
})




// get All Brands
const getBrands = catchAsyncErrors(async (req, res ,next) => {
    let Brands = await BrandModel.find({});
    if(!Brands){
        return next(new AppError(`Brands Not Found`, 400));
    }
    res.status(200).json(Brands);
})


// get Brand By ID 
const getBrandyByID = catchAsyncErrors(async (req, res ,next) => {
    let brand = await BrandModel.findById(req.params.id);
    if (!brand) {
        return next(new AppError(`Brand Not Found`, 404));
    }
    res.status(200).json(brand);
})


// update Brand
const updateBrand= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name} = req.body;
    if (req.body.name) {
        req.body.slug = slugify(name);
    }
    req.body.image = req.file?.filename;
    let updatedBrand= await BrandModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBrand) {
        return next(new AppError(`Brand Not Found To Update`, 404));
    }
    res.status(200).json(updatedBrand);
})

//delete subCategory
const deleteBrand = factory.deleteFun(BrandModel);




module.exports = {
    createBrand,
    getBrands,
    getBrandyByID,
    updateBrand,
    deleteBrand
}