const { createCategory, getCategories, getCategoryByID, updateCategory, deleteCategory } = require('./category.service');

const router = require('express').Router();


// router.route('/categories').post(createCategory).get(getCategories);

router.post('/createCategory',createCategory) 
router.get('/getCategories',getCategories)
router.get('/getCategoryByID/:id',getCategoryByID)
router.put('/updateCategory/:id',updateCategory)
router.delete('/deleteCategory/:id',deleteCategory);









module.exports = router;