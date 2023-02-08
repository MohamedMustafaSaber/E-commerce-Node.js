const { uploadingSingleFile } = require('../../Utilities/fileUploading');
const { createBrand, getBrandyByID, updateBrand, deleteBrand, getBrands } = require('./brand.service');


const router = require('express').Router();



router.route('/').post(uploadingSingleFile('image', 'Brand') , createBrand).get(getBrands);
router.route('/:id').get(getBrandyByID).put(uploadingSingleFile('image', 'Brand') , updateBrand).delete(deleteBrand);









module.exports = router;