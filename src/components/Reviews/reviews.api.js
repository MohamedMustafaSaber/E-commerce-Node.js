const { ProtectedRoutes, AllowedTo } = require('../User/user.auth.js');
const { createReview, getReviews, getReviewyByID, updateReview, deleteReview } = require('./reviews.service.js');

const router = require('express').Router();



router.route('/').post(ProtectedRoutes,AllowedTo("user"), createReview).get(getReviews);
router.route('/:id').get(getReviewyByID).put(ProtectedRoutes, AllowedTo("user"), updateReview).delete(ProtectedRoutes, AllowedTo("user","admin"), deleteReview);









module.exports = router;