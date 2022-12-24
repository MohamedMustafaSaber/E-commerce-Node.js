const categoryModel = require('./category.model')
const slugify = require("slugify")


// create new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    let newCategory = new categoryModel({ name  , slug: slugify(name) });
    await newCategory.save();
    res.status(200).json(newCategory);
}


// get all categories
const getCategories = async (req, res) => {
    let categories = await categoryModel.find();
    res.status(200).json(categories);
}


// get category By ID 
const getCategoryByID = async (req, res) => { 
    let category = await categoryModel.findById(req.params.id);
    if(!category) {
        return res.status(404).json({ message: "Category Not Found" });
    }
    res.status(200).json(category);
}


// update category

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await categoryModel.findByIdAndUpdate(id, { name , slug : slugify(name)  },{new: true});

    if(!category) {
        return res.status(404).json({ message: "Category Not Found To Update" });
    }
    res.status(200).json(category);
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    let category = await categoryModel.findByIdAndDelete(id);
    if(!category) {
        return res.status(404).json({ message: "Category Not Found To Delete" });
    }
    res.status(200).json({message:"category has Been Deleted"});
}


module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory
}