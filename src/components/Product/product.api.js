const { createProduct, getProducts, getProductyByID, updateProduct, deleteProduct } = require('./product.service');



const router = require('express').Router();



router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getProductyByID).put(updateProduct).delete(deleteProduct);









module.exports = router;