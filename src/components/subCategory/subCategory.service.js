const subCategoryModel = require('./subCategory.model')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')




// create new category
const createSubCategory = catchAsyncErrors(async (req, res , next) => {
    const { name , category } = req.body;
    let newSubCategory = new subCategoryModel({ name, slug: slugify(name) , category});
    await newSubCategory.save();
    if(!newSubCategory){
        return next(new AppError(`can not create New category`, 400));
    }
    res.status(200).json(newSubCategory);
})




// get All subCategory or get  each subcategories for specific category
const getSubCategories = catchAsyncErrors(async (req, res ,next) => {
    let filter = {};
    if (req.params.categoryId){
        filter = {category:req.params.categoryId};
    }
    let subCategories = await subCategoryModel.find(filter);
    if(!subCategories){
        return next(new AppError(`Categories Not Found`, 400));
    }
    res.status(200).json(subCategories);
})


// get subCategory By ID 
const getSubCategoryByID = catchAsyncErrors(async (req, res ,next) => {
    let subCategory = await subCategoryModel.findById(req.params.id);
    if (!subCategory) {
        return next(new AppError(`SubCategory Not Found`, 404));
    }
    res.status(200).json(subCategory);
})


// update subCategory
const updateSubCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name , category } = req.body;
    let updatedSubcategory = await subCategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) , category }, { new: true });

    if (!updatedSubcategory) {
        return next(new AppError(`Category Not Found To Update`, 404));
    }
    res.status(200).json(updatedSubcategory);
})

//delete subCategory
const deleteSubCategory = catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let deletedSubCategory = await subCategoryModel.findByIdAndDelete(id);
    if (!deletedSubCategory) {
        return next(new AppError(`Category Not Found To Delete`, 404));
    }
    res.status(200).json({ message: "category has Been Deleted" });
})




module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategoryByID,
    updateSubCategory,
    deleteSubCategory
}