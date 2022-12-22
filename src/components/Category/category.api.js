const { createCategory, getCategories, getCategoryByID } = require('./category.service');

const router = require('express').Router();


// router.route('/categories').post(createCategory).get(getCategories);

router.post('/createCategory',createCategory)
router.get('/getCategories',getCategories)
router.get('/getCategoryByID/:id',getCategoryByID)







module.exports = router;