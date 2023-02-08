const { uploadingMultiFile } = require('../../Utilities/fileUploading');
const { createProduct, getProducts, getProductyByID, updateProduct, deleteProduct } = require('./product.service');
const router = require('express').Router();
let fields = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 3 }];



router.route('/').post(uploadingMultiFile(fields , 'Product'), createProduct).get(getProducts);
router.route('/:id').get(getProductyByID).put(updateProduct).delete(deleteProduct);









module.exports = router;