const categoryModel = require('./category.model')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')




// create new category
const createCategory = catchAsyncErrors(async (req, res , next) => {
    const { name } = req.body;
    let newCategory = new categoryModel({ name, slug: slugify(name) });
    await newCategory.save();
    if(!newCategory){
        return next(new AppError(`can not create New category`, 400));
    }
    res.status(200).json(newCategory);
})




// get all categories
const getCategories = catchAsyncErrors(async (req, res ,next) => {
    let categories = await categoryModel.find();
    if(!categories){
        return next(new AppError(`Categories Not Found`, 400));
    }
    res.status(200).json(categories);
})


// get category By ID 
const getCategoryByID = catchAsyncErrors(async (req, res ,next) => {
    let category = await categoryModel.findById(req.params.id);
    if (!category) {
        return next(new AppError(`Category Not Found`, 404));
    }
    res.status(200).json(category);
})


// update category
const updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

    if (!category) {
        return next(new AppError(`Category Not Found To Update`, 404));
    }
    res.status(200).json(category);
})

//delete category
const deleteCategory = catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new AppError(`Category Not Found To Delete`, 404));
    }
    res.status(200).json({ message: "category has Been Deleted" });
})




module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory
}