const { createCategory, getCategories, getCategoryByID, updateCategory, deleteCategory } = require('./category.service');
const subCategoryRoute = require('../subCategory/subCategory.api');
const router = require('express').Router();

router.use("/:categoryId/subcategory" , subCategoryRoute);
router.route('/').post(createCategory).get(getCategories);
router.route('/:id').get(getCategoryByID).put(updateCategory).delete(deleteCategory);










module.exports = router;