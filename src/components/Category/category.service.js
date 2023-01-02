const categoryModel = require('./category.model')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')


function catchAsyncErrors(fn) {
    return (req, res, next) => {
        fn(req, res).catch((error) => {
            res.json({ error: error.message })
        })
    }
}


// create new category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    let newCategory = new categoryModel({ name, slug: slugify(name) });
    await newCategory.save();
    res.status(200).json(newCategory);
})




// get all categories
const getCategories = catchAsyncErrors(async (req, res) => {
    let categories = await categoryModel.find();
    res.status(200).json(categories);
})


// get category By ID 
const getCategoryByID = catchAsyncErrors(async (req, res) => {
    let category = await categoryModel.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: "Category Not Found" });
    }
    res.status(200).json(category);
})


// update category

const updateCategory = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

    if (!category) {
        return res.status(404).json({ message: "Category Not Found To Update" });
    }
    res.status(200).json(category);
})

const deleteCategory = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    let category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return res.status(404).json({ message: "Category Not Found To Delete" });
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