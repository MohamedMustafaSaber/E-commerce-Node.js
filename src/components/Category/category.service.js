const categoryModel = require('./category.model')



const createCategory = async (req, res) => {
    const { name } = req.body;
    let newCategory = new categoryModel({ name })
    await newCategory.save();
    res.status(200).json(newCategory);
}



const getCategories = async (req, res) => {

    let categories = await categoryModel.find();
    res.status(200).json(categories);
}

const getCategoryByID = async (req, res) => {

    let category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
}



module.exports = {
    createCategory,
    getCategories,
    getCategoryByID
}