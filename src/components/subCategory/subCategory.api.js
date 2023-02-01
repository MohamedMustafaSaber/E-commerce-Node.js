const { createSubCategory, getSubCategories, getSubCategoryByID, updateSubCategory, deleteSubCategory } = require('./subCategory.service');


const router = require('express').Router();



router.post('/createSubCategory',createSubCategory) 
router.get('/getSubCategories',getSubCategories)
router.get('/getSubCategoryByID/:id',getSubCategoryByID)
router.put('/updateSubCategory/:id',updateSubCategory)
router.delete('/deleteSubCategory/:id',deleteSubCategory);









module.exports = router;