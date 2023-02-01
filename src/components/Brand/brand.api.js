const { createBrand, getBrandyByID, updateBrand, deleteBrand, getBrands } = require('./brand.service');


const router = require('express').Router();



router.route('/').post(createBrand).get(getBrands);
router.route('/:id').get(getBrandyByID).put(updateBrand).delete(deleteBrand);









module.exports = router;