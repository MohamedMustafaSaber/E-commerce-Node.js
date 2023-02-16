const { createCategory, getCategories, getCategoryByID, updateCategory, deleteCategory } = require('./category.service');
const subCategoryRoute = require('../subCategory/subCategory.api');
const { uploadingSingleFile } = require('../../Utilities/fileUploading');
const { ProtectedRoutes, AllowedTo } = require('../User/user.auth.js');
const router = require('express').Router();

router.use("/:categoryId/subcategory" , subCategoryRoute);
router.route('/').post(ProtectedRoutes,AllowedTo('admin'),uploadingSingleFile('categoryImage' , 'Category'),createCategory).get(getCategories);
router.route('/:id').get(getCategoryByID).put(uploadingSingleFile('categoryImage', 'Category') , updateCategory).delete(deleteCategory);










module.exports = router;