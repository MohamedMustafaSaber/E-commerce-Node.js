const { createSubCategory, getSubCategories, getSubCategoryByID, updateSubCategory, deleteSubCategory } = require('./subCategory.service');


const router = require('express').Router({mergeParams:true});



router.route('/').post(createSubCategory).get(getSubCategories);
router.route('/:id').get(getSubCategoryByID).put(updateSubCategory).delete(deleteSubCategory);









module.exports = router;